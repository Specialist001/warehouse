<?php

namespace App\Console\Commands;

use App\Services\AI\PollinationsAIService;
use Illuminate\Console\Command;

class CustomCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ai:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $prompt = "Hyper-realistic photo of a gourmet burger with melted cheese, fresh lettuce, and a sesame seed bun";
        $service = new PollinationsAIService();
        $imageUrl = $service->generateImageUrl($prompt);

        if ($imageUrl) {
            $this->info('Image generated successfully: ' . $imageUrl);
        } else {
            $this->error('Failed to generate image');
        }
    }
}
