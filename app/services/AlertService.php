<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AlertService
{
    public function sendMessage(string $payload): ?string
    {
        $url = config('services.alert.base_url') . '/api/alert/ltm-send-message';

        $response = Http::timeout(8)
            ->acceptJson()
            ->asJson()
            ->post($url, [
                'data' => $payload,
            ]);

        if (!$response->successful()) {
            logger()->error('Alert sendMessage failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;
        }

        $json = $response->json();

        if (!is_array($json) || empty($json['success'])) {
            logger()->error('Alert sendMessage invalid response', ['json' => $json]);
            return null;
        }

        return $json['messageId'] ?? null;
    }

    public function editMessage(string $messageId, string $newData): ?string
    {
        $url = config('services.alert.base_url') . '/api/alert/ltm-edit-message';

        $response = Http::timeout(8)
            ->acceptJson()
            ->asJson()
            ->post($url, [
                'messageId' => $messageId,
                'data' => $newData,
            ]);

        if (!$response->successful()) {
            logger()->error('Alert editMessage failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return false;
        }

        $json = $response->json();

        if (!is_array($json) || empty($json['success'])) {
            logger()->error('Alert sendMessage invalid response', ['json' => $json]);
            return null;
        }

        return $json['messageId'] ?? null;
    }
}
