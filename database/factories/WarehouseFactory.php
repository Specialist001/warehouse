<?php

namespace Database\Factories;

use Domains\Warehouse\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

class WarehouseFactory extends Factory
{
    protected $model = Warehouse::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'location' => $this->faker->address,
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
