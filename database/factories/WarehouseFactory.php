<?php

namespace Database\Factories;

use Domains\Warehouse\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

use Faker\Factory as Faker;

class WarehouseFactory extends Factory
{
    protected $model = Warehouse::class;

    public function definition()
    {
        $faker = Faker::create('en_US');

        return [
            'name' => $faker->name,
            'location' => $faker->address,
            'status' => $faker->randomElement(['active', 'inactive']),
        ];
    }
}
