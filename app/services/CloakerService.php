<?php

namespace App\Services;

class CloakerService
{
    private array $config;
    private string $ipListCacheFile;

    public function __construct()
    {
        // defaults para evitar null config
        $this->config = array_merge([
            'blocked_user_agents' => [],
            'cookie_name' => 'bp',
            'ip_lists_path' => storage_path('app/ip-lists/') . '/', // ajusta si aplica
            'ip_cache_ttl' => 3600,
        ], (array) config('cloaker'));

        $this->ipListCacheFile = storage_path('app/cloaker_ip_cache.json');
    }

    public function isBot(): bool
    {
        // 1) User-Agent
        if ($this->isBlockedByUserAgent()) {
            // \Log::info('DEBUG: Bloqueado por User-Agent: ' . (request()->userAgent() ?? 'NULL'));
            return true;
        }

        // 2) IP
        if ($this->isKnownBotByIp()) {
            \Log::info('DEBUG: Bloqueado por IP: ' . ($this->getVisitorIp() ?? 'NULL'));
            return true;
        }

        // 3) Cookie (si quieres activarlo)
        // if (!$this->hasBehavioralProof()) return true;

        return false;
    }

    private function isBlockedByUserAgent(): bool
    {
        $userAgent = request()->userAgent() ?? '';
        if ($userAgent === '') return false;

        foreach ((array) $this->config['blocked_user_agents'] as $bot) {
            $bot = (string) $bot;
            if ($bot !== '' && stripos($userAgent, $bot) !== false) {
                return true;
            }
        }
        return false;
    }

    private function isKnownBotByIp(): bool
    {
        $ip = $this->getVisitorIp();

        // si no hay IP, no bloquees (evita crash)
        if (!$ip) return false;

        // si es IPv6 y tu lista es IPv4, no intentes ip2long
        // (puedes ampliar luego a IPv6 con inet_pton)
        $isV4 = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
        if (!$isV4) return false;

        $ipLists = $this->getIpLists();

        foreach ($ipLists as $ipData) {
            $ranges = $ipData['ranges'] ?? [];
            if ($this->ipInRangeV4($ip, $ranges)) {
                return true;
            }
        }

        return false;
    }

    private function hasBehavioralProof(): bool
    {
        return request()->cookie($this->config['cookie_name']) !== null;
    }

    private function getVisitorIp(): ?string
    {
        // request()->ip() puede ser null en algunos casos; lo normalizamos
        $ip = request()->ip();

        if (!is_string($ip) || $ip === '') {
            return null;
        }

        return $ip;
    }

    private function getIpLists(): array
    {
        // cache
        if (file_exists($this->ipListCacheFile)) {
            $age = time() - filemtime($this->ipListCacheFile);
            if ($age < (int) $this->config['ip_cache_ttl']) {
                $decoded = json_decode(file_get_contents($this->ipListCacheFile), true);
                return is_array($decoded) ? $decoded : [];
            }
        }

        $ipLists = [];
        $path = rtrim((string) $this->config['ip_lists_path'], '/') . '/';
        $listFiles = glob($path . '*.txt') ?: [];

        foreach ($listFiles as $file) {
            $ipData = @file_get_contents($file);
            if ($ipData === false) continue;

            $ipRanges = array_values(array_filter(array_map('trim', explode("\n", $ipData)), function ($line) {
                return $line !== '' && strpos($line, '#') !== 0;
            }));

            if ($ipRanges) {
                $ipLists[] = ['ranges' => $ipRanges];
            }
        }

        @file_put_contents($this->ipListCacheFile, json_encode($ipLists));
        return $ipLists;
    }

    private function ipInRangeV4(string $ip, array $ranges): bool
    {
        $ipLong = ip2long($ip);
        if ($ipLong === false) return false;

        foreach ($ranges as $range) {
            $range = trim((string) $range);
            if ($range === '') continue;

            // IP exacta
            if (strpos($range, '/') === false) {
                if ($ip === $range) return true;
                continue;
            }

            // CIDR
            [$subnet, $mask] = array_pad(explode('/', $range, 2), 2, null);
            $mask = (int) $mask;

            if (!filter_var($subnet, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) continue;
            if ($mask < 0 || $mask > 32) continue;

            $subnetLong = ip2long($subnet);
            if ($subnetLong === false) continue;

            $maskLong = $mask === 0 ? 0 : (-1 << (32 - $mask));

            if ( ($ipLong & $maskLong) === ($subnetLong & $maskLong) ) {
                return true;
            }
        }

        return false;
    }
}
