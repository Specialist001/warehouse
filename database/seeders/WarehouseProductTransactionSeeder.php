<?php

namespace Database\Seeders;

use App\Models\User;
use Domains\Product\Models\Product;
use Domains\Product\Repositories\ProductRepository;
use Domains\Product\Services\ProductService;
use Domains\Transaction\Services\TransactionService;
use Domains\Warehouse\Repositories\WarehouseRepository;
use Domains\Warehouse\Services\WarehouseService;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseProductTransactionSeeder extends Seeder
{
    private \Faker\Generator $faker;

    public function __construct(
        protected ProductService     $productService,
        protected WarehouseService   $warehouseService,
        protected TransactionService $transactionService,
        protected WarehouseProductService $warehouseProductService,
    )
    {
        $this->faker = \Faker\Factory::create();
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
                    source: $this->faker->company,
                    status: 'completed'
                );
            }
        }


        $warehouse_products = WarehouseProduct::with('product')->get();
        foreach ($warehouse_products as $warehouse_product) {
            $availableDestinations = array_values(array_filter(
                $warehouses_ids,
                fn($id) => $id !== $warehouse_product->warehouse_id
            ));

            if (empty($availableDestinations)) {
                continue;
            }

            // randomly outcome or transfer to another warehouse
            $random_quantity = rand(1, $warehouse_product->quantity);

            $randomExecutorId = $executors_ids[array_rand($executors_ids)];

            $is_internal_transfer = rand(0, 1);

            $random_destination = $availableDestinations[array_rand($availableDestinations)];

            $data = [
                'is_internal_transfer' => $is_internal_transfer,
                'send_quantity' => $random_quantity,
                'destination' => $is_internal_transfer ? $random_destination : $this->faker->company,
                'executor_id' => $randomExecutorId,
            ];

            $this->warehouseProductService->handleOutcome($warehouse_product, $data);
        }
    }
}
