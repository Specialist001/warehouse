<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_permissions = [
            "delete user", "update user", "read user", "create user"
        ];

        $role_permissions = [
            "delete role", "update role", "read role", "create role"
        ];

        $permission_permissions = [
            "delete permission", "update permission", "read permission", "create permission"
        ];

        $warehouse_permissions = [
            "Warehouse List", "Warehouse Create", "Warehouse Update", "Warehouse Delete"
        ];

        $category_permissions = [
            "Category List", "Category Create", "Category Update", "Category Delete"
        ];

        $product_permissions = [
            "Product List", "Product Create", "Product Update", "Product Delete"
        ];

        $warehouse_products_permissions = [
            "WarehouseProduct List", "WarehouseProduct Create", "WarehouseProduct Update", "WarehouseProduct Delete"
        ];

        $transaction_permissions = [
            "Transaction List", "Transaction Update", "Transaction Delete"
        ];

        $all_permissions = array_merge(
            $user_permissions,
            $role_permissions,
            $permission_permissions,
            $warehouse_permissions,
            $category_permissions,
            $product_permissions,
            $warehouse_products_permissions,
            $transaction_permissions
        );

        foreach ($all_permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
}
