<?php
namespace App\Services;

class CloakerService
{
    private array $config;
    private string $ipListCacheFile;

    public function __construct()
    {
        // La configuración la cargaremos desde config/cloaker.php
        $this->config = config('cloaker');
        $this->ipListCacheFile = storage_path('app/cloaker_ip_cache.json');
    }

    /**
     * Comprueba si el visitante debe ser tratado como un bot.
     * Devuelve true si es un bot, false si es un usuario real.
     */
   public function isBot(): bool
{
    // --- INICIO DEL MODO DEBUG ---
    // Desactiva temporalmente las comprobaciones para aislar el problema.
    // Comenta y descomenta las líneas para probar cada una.

    // 1. Comprobación de User-Agent (la más rápida de probar)
    if ($this->isBlockedByUserAgent()) {
        // Si ves este mensaje, el problema es tu User-Agent.
        // Descomenta la línea de abajo para ver tu User-Agent en el log de Laravel.
        // \Log::info('DEBUG: Bloqueado por User-Agent: ' . request()->userAgent());
        return true;
    }

    // 2. Comprobación de IP
    if ($this->isKnownBotByIp()) {
        // Si ves este mensaje, el problema es tu IP.
        \Log::info('DEBUG: Bloqueado por IP: ' . $this->getVisitorIp());
        return true;
    }

    // 3. Comprobación de Comportamiento (Cookie) - LA MÁS PROBABLE
    // --- FIN DEL MODO DEBUG ---

    // Si pasa todas las comprobaciones, es un usuario real.
    return false;
}
    
    // --- MÉTODOS PRIVADOS DE DETECCIÓN ---

    private function isBlockedByUserAgent(): bool
    {
        $userAgent = request()->userAgent();
        foreach ($this->config['blocked_user_agents'] as $bot) {
            if (stripos($userAgent, $bot) !== false) {
                return true;
            }
        }
        return false;
    }

    private function isKnownBotByIp(): bool
    {
        $ip = $this->getVisitorIp();
        if (!$ip) {
            return false;
        }

        $ipLists = $this->getIpLists();

        foreach ($ipLists as $ipData) {
            if ($this->ipInRange($ip, $ipData['ranges'])) {
                return true;
            }
        }
        return false;
    }

    private function hasBehavioralProof(): bool
    {
        return request()->cookie($this->config['cookie_name']) !== null;
    }

    // --- MÉTODOS AUXILIARES Y DE CACHÉ ---

    private function getVisitorIp(): ?string
    {
        // Laravel ya gestiona los proxys correctamente si está configurado en 'trustedproxy'
        return request()->ip();
    }

    private function getIpLists(): array
    {
        if (file_exists($this->ipListCacheFile) && (time() - filemtime($this->ipListCacheFile)) < $this->config['ip_cache_ttl']) {
            return json_decode(file_get_contents($this->ipListCacheFile), true);
        }

        $ipLists = [];
        $listFiles = glob($this->config['ip_lists_path'] . '*.txt');

        foreach ($listFiles as $file) {
            $ipData = file_get_contents($file);
            $ipRanges = array_filter(explode("\n", $ipData), function($line) {
                $line = trim($line);
                return !empty($line) && strpos($line, '#') !== 0;
            });

            if (!empty($ipRanges)) {
                $ipLists[] = ['ranges' => array_values($ipRanges)];
            }
        }

        file_put_contents($this->ipListCacheFile, json_encode($ipLists));
        return $ipLists;
    }

    private function ipInRange(string $ip, array $ranges): bool
    {
        foreach ($ranges as $range) {
            if (strpos($range, '/') === false) {
                if ($ip === trim($range)) {
                    return true;
                }
            } else {
                list($subnet, $mask) = explode('/', trim($range));
                if ((ip2long($ip) & ~((1 << (32 - $mask)) - 1)) == ip2long($subnet)) {
                    return true;
                }
            }
        }
        return false;
    }
}