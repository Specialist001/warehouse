<?php

namespace Database\Factories;

use Domains\Category\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // name and short_description are translatable
            'name' => [
                'uz' => $this->faker->word(),
                'en' => $this->faker->word(),
                'ru' => $this->faker->word()
            ],
            'short_description' => [
                'uz' => $this->faker->sentence(30),
                'en' => $this->faker->sentence(30),
                'ru' => $this->faker->sentence(30)
            ],
        ];
    }
}
