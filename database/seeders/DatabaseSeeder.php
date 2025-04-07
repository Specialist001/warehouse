<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
//use Database\Factories\RestaurantFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);

//        RestaurantFactory::new()->count(5)->create();
//        $this->call(FillSiteSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(WarehouseSeeder::class);
        $this->call(ProductSeeder::class);

    }
}
