<?php

namespace Database\Seeders;

use App\Models\User;
use Domains\Product\Models\Product;
use Domains\Product\Repositories\ProductRepository;
use Domains\Product\Services\ProductService;
use Domains\Transaction\Services\TransactionService;
use Domains\Warehouse\Repositories\WarehouseRepository;
use Domains\Warehouse\Services\WarehouseService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseProductTransactionSeeder extends Seeder
{
    public function __construct(
        protected ProductService     $productService,
        protected WarehouseService   $warehouseService,
        protected TransactionService $transactionService,
    )
    {
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $warehouses_ids = $this->warehouseService->all()->pluck('id')->toArray();
        $executors_ids = User::pluck('id')->toArray();

        foreach ($products as $product) {
            $randomWarehouseId = $warehouses_ids[array_rand($warehouses_ids)];

            $warehouse = $this->warehouseService->addProduct($randomWarehouseId, [
                'product_id' => $product->id,
                'quantity'   => rand(1, 100),
            ]);

            if ($warehouse) {
                $this->transactionService->income(
                    warehouse_id: $randomWarehouseId,
                    product_id: $product->id,
                    executor_id: $executors_ids[array_rand($executors_ids)],
                    quantity: rand(1, 100),
                    source: 'Seeder',
                    status: 'completed'
                );
            }
        }
    }
}
