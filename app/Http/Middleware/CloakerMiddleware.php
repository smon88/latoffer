<?php

namespace App\Http\Middleware;

use App\Services\CloakerService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CloakerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   public function handle(Request $request, Closure $next): Response
    {
        $cloaker = app(CloakerService::class);

        if ($cloaker->isBot()) {
            // Es un bot. Devolvemos la vista para bots y detenemos la ejecución.
            // Laravel buscará la vista en resources/views/cloaker/content_b.blade.php
            return response()->view('cloaker.content_b')->header('Cache-Control', 'no-cache, no-store, must-revalidate');
        }

        // No es un bot. Permite que la petición continúe.
        return $next($request);
    }
}
