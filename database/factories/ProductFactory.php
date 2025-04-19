<?php

namespace Database\Factories;

use App\Services\RestaurantFaker;
use Domains\Category\Models\Category;
use Domains\Product\States\Unit\ProductUnit;
use Domains\Warehouse\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    protected $model = \Domains\Product\Models\Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker->addProvider(new RestaurantFaker($this->faker));

        $food_name = $this->faker->randomNumber(2) % 2 === 0 ? $this->faker->foodName() : $this->faker->beverageName();
        $product_name = $this->faker->words(2, true) . ' ' . $food_name;
        $product_name = $this->faker->unique()->word() . ' ' . $product_name;

        $price = rand(2, 2000) * 500;
        $units = ProductUnit::cases();

        return [
            'id'      => Str::uuid(),
            'name'    => [
                'uz' => $product_name,
                'en' => $product_name,
                'ru' => $product_name
            ],
            'price'   => $price,
            'unit'    => $this->faker->randomElement($units),
            'sku'     => $this->faker->unique()->ean13,
            'barcode' => $this->faker->unique()->ean13,
            'qr_code' => $this->faker->unique()->uuid,
        ];
    }
}
