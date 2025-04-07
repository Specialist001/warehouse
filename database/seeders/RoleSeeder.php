<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $super_admin = Role::create([
            'name' => 'superadmin'
        ]);
        $super_admin->givePermissionTo([
            'delete user', 'update user', 'read user', 'create user',
            'delete role', 'update role', 'read role', 'create role',
            'delete permission', 'update permission', 'read permission', 'create permission',
            "Warehouse List", "Warehouse Create", "Warehouse Update", "Warehouse Delete",
            "Category List", "Category Create", "Category Update", "Category Delete",
            "Product List", "Product Create", "Product Update", "Product Delete",
            "WarehouseProduct List", "WarehouseProduct Create", "WarehouseProduct Update", "WarehouseProduct Delete",
            "Transaction List", "Transaction Update", "Transaction Delete",
        ]);
        $admin = Role::create([
            'name' => 'admin'
        ]);
        $admin->givePermissionTo([
            'read user', 'create user', 'read role', 'read permission',
        ]);

        $moderator = Role::create([
            'name' => 'moderator'
        ]);
        $moderator->givePermissionTo([
            "Warehouse List", "Warehouse Create", "Warehouse Update", "Warehouse Delete",
            "Category List", "Category Create", "Category Update", "Category Delete",
            "Product List", "Product Create", "Product Update", "Product Delete",
            "WarehouseProduct List", "WarehouseProduct Create", "WarehouseProduct Update", "WarehouseProduct Delete",
            "Transaction List", "Transaction Update",
        ]);
    }
}
