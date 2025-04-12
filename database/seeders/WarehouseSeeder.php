<?php

namespace Database\Seeders;

use Domains\Warehouse\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Warehouse::factory()->count(4)->create();
    }
}
