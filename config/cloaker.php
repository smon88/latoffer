<?php
// config/cloaker.php

return [
    /*
    |--------------------------------------------------------------------------
    | Tiempo de vida de la caché de IPs (en segundos)
    |--------------------------------------------------------------------------
    | 86400 = 24 horas. Aumenta este valor para no leer los ficheros tan a menudo.
    */
    'ip_cache_ttl' => 86400,

    /*
    |--------------------------------------------------------------------------
    | Nombre de la cookie de verificación
    |--------------------------------------------------------------------------
    | Esta cookie se establece vía JavaScript para verificar que es un navegador real.
    */
    'cookie_name' => 'real_user_verification',

    /*
    |--------------------------------------------------------------------------
    | Ruta a los ficheros de lista de IPs
    |--------------------------------------------------------------------------
    | Usa storage_path() para apuntar al directorio storage/app.
    | Debes crear este directorio y poner ahí tus ficheros (ej. facebook.txt).
    */
    'ip_lists_path' => storage_path('app/ip-lists/'),

    /*
    |--------------------------------------------------------------------------
    | Lista de User-Agents a bloquear
    |--------------------------------------------------------------------------
    */
    'blocked_user_agents' => [
        'adsbot-google',
        'googlebot',
        'mediapartners-google',
        'bingbot',
        'slurp',
        'duckduckbot',
        'baiduspider',
        'yandexbot',
        'facebookexternalhit',
        'facebookcatalog',
        'twitterbot',
        'rogerbot',
        'semrushbot',
    ],
];