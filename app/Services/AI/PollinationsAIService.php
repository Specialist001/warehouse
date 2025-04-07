<?php

namespace App\Services\AI;

use AllowDynamicProperties;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Random\RandomException;

#[AllowDynamicProperties] class PollinationsAIService
{
    public function __construct()
    {
        $this->baseUrl = env("POLLINATION_URL", "http://localhost:8000");
    }

    /**
     */
    public function generateImageUrl(string $prompt, $path = null, int $width = 1384, int $height = 1384): ?string
    {
        $image = $this->generateImage($prompt, $width, $height);

        if (!$image) {
            return null;
        }
        $disk = Storage::disk('s3');
        $save_path = $path ?? 'fake_images';

        $fileName = $save_path . '/' . uniqid() . '.jpg';

        $disk->put($fileName, $image, 'public');

        return $disk->url($fileName);

    }

    /**
     * Generate an image from a prompt using Pollinations API.
     */
    public function generateImage(string $prompt, int $width = 1384, int $height = 1384): ?string
    {
        $encoded_prompt = rawurlencode($prompt);
        // seed random int between 23000 and 24000
        try {
            $seed = random_int(23000, 24000);
        } catch (RandomException $e) {
            return null;
        }

        $query_params = [
            'model'   => 'flux',
            'seed'    => $seed,
            'width'   => $width,
            'height'  => $height,
            'enhance' => 'false',
            'refine'  => 'false',
            'nologo'  => 'true',
            'private' => 'false',
            'safe'    => 'true',
        ];

        $fullUrl = $this->baseUrl . $encoded_prompt . '?' . http_build_query($query_params);

        $response = Http::get($fullUrl);

        if ($response->successful()) {
            return $response->body();
        }

        return null;
    }
}
