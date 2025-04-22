<?php

namespace App\Console\Commands;

use App\Models\User;
use Domains\Warehouse\Models\Warehouse;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Console\Command;

class TransactionFillCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transaction:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill the database with transaction data';

    public function __construct(
        protected WarehouseProductService $warehouseProductService
    )
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $start = microtime(true);
        $this->actionWhile();

        $end = microtime(true);
        $executionTime = $end - $start;
        $this->info('Execution time: ' . round($executionTime, 2) . ' seconds');

        $memoryUsage = memory_get_usage(true) / 1024 / 1024; // Convert to MB
        $this->info('Memory usage: ' . round($memoryUsage, 2) . ' MB');
    }

    private function actionWhile()
    {
        $executors_ids = User::pluck('id')->toArray();
        $warehouses_ids = Warehouse::pluck('id')->toArray();

        while (WarehouseProduct::where('quantity', '>', 0)->exists()) {
            $warehouse_products = WarehouseProduct::with('product')->where('quantity', '>', 0)->get();

            foreach ($warehouse_products as $warehouse_product) {
                // если нет доступных товаров, пропускаем
                if ($warehouse_product->quantity <= 0) {
                    continue;
                }

                $availableDestinations = array_values(array_filter(
                    $warehouses_ids,
                    fn($id) => $id !== $warehouse_product->warehouse_id
                ));

                if (empty($availableDestinations)) {
                    continue;
                }

                $random_quantity = rand(1, min(3, $warehouse_product->quantity));
                $randomExecutorId = $executors_ids[array_rand($executors_ids)];
                $is_internal_transfer = rand(0, 1);
                $random_destination = $availableDestinations[array_rand($availableDestinations)];

                $data = [
                    'is_internal_transfer' => $is_internal_transfer,
                    'send_quantity' => $random_quantity,
                    'destination' => $is_internal_transfer ? $random_destination : fake()->company,
                    'executor_id' => $randomExecutorId,
                ];

                $this->warehouseProductService->handleOutcome($warehouse_product, $data);
            }
        }
    }

    private function actionRemaining()
    {
        $executors_ids = User::pluck('id')->toArray();
        $warehouses_ids = Warehouse::pluck('id')->toArray();

        $hasRemaining = true;

        while ($hasRemaining) {
            $hasRemaining = false;

            $warehouse_products = WarehouseProduct::with('product')
                ->where('quantity', '>', 0)
                ->get();

            foreach ($warehouse_products as $warehouse_product) {
                if ($warehouse_product->quantity <= 0) {
                    continue;
                }

                $hasRemaining = true;

                $availableDestinations = array_values(array_filter(
                    $warehouses_ids,
                    fn($id) => $id !== $warehouse_product->warehouse_id
                ));

                if (empty($availableDestinations)) {
                    continue;
                }

                $random_quantity = rand(1, min(3, $warehouse_product->quantity));
                $randomExecutorId = $executors_ids[array_rand($executors_ids)];
                $is_internal_transfer = rand(0, 1);
                $random_destination = $availableDestinations[array_rand($availableDestinations)];

                $data = [
                    'is_internal_transfer' => $is_internal_transfer,
                    'send_quantity' => $random_quantity,
                    'destination' => $is_internal_transfer ? $random_destination : fake()->company,
                    'executor_id' => $randomExecutorId,
                ];

                $this->warehouseProductService->handleOutcome($warehouse_product, $data);
            }
        }
    }

    private function actionCursor()
    {
        $executors_ids = User::pluck('id')->toArray();
        $warehouses_ids = Warehouse::pluck('id')->toArray();

        do {
            $hasRemaining = false;

            foreach (WarehouseProduct::where('quantity', '>', 0)->cursor() as $warehouse_product) {
                if ($warehouse_product->quantity <= 0) {
                    continue;
                }

                $hasRemaining = true;

                $availableDestinations = array_values(array_filter(
                    $warehouses_ids,
                    fn($id) => $id !== $warehouse_product->warehouse_id
                ));

                if (empty($availableDestinations)) {
                    continue;
                }

                $random_quantity = rand(1, min(3, $warehouse_product->quantity));
                $randomExecutorId = $executors_ids[array_rand($executors_ids)];
                $is_internal_transfer = rand(0, 1);
                $random_destination = $availableDestinations[array_rand($availableDestinations)];

                $data = [
                    'is_internal_transfer' => $is_internal_transfer,
                    'send_quantity' => $random_quantity,
                    'destination' => $is_internal_transfer ? $random_destination : fake()->company,
                    'executor_id' => $randomExecutorId,
                ];

                $this->warehouseProductService->handleOutcome($warehouse_product, $data);
            }

        } while ($hasRemaining);
    }
}
