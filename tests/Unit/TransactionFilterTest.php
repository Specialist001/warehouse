<?php

namespace Tests\Unit;

use App\Models\User;
use Domains\Product\Models\Product;
use Domains\Transaction\Filters\TransactionFilter;
use Domains\Transaction\Models\Transaction;
use Domains\Warehouse\Models\Warehouse;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Tests\TestCase;

class TransactionFilterTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic unit test example.
     */
    public function test_applies_created_at_date_range_filter(): void
    {
        $this->assertTrue(true);

        $warehouse = Warehouse::factory()->create();
        $product = Product::factory()->create();

        $executor = User::factory()->create();

        // Создаем тестовые данные
        $warehouseProduct = WarehouseProduct::create([
            'product_id'   => $product->id,
            'warehouse_id' => $warehouse->id,
            'quantity'     => 10,
        ]);

        // Создаем Transaction тестовые данные с другой датой
        Transaction::create([
            'product_id'   => $product->id,
            'warehouse_id' => $warehouse->id,
            'executor_id'  => $executor->id,
            'type'         => 'in',
            'source'       => 'TEST',
            'quantity'     => 5,
            'created_at'   => now()->subDays(2), // Дата вне диапазона
        ]);

        // Создаем Transaction тестовые данные с нужной датой
        Transaction::create([
            'product_id'   => $product->id,
            'warehouse_id' => $warehouse->id,
            'executor_id'  => $executor->id,
            'type'         => 'in',
            'source'       => 'TEST',
            'quantity'     => 2,
            'created_at'   => now()->subDay(), // Дата в диапазоне
        ]);

        // Создаем Transaction тестовые данные с другой датой
        Transaction::create([
            'product_id'   => $product->id,
            'warehouse_id' => $warehouse->id,
            'executor_id'  => $executor->id,
            'type'         => 'in',
            'source'       => 'TEST',
            'quantity'     => 1,
            'created_at'   => now(), // Дата вне диапазона
        ]);

        $request = new Request([
            'created_at' => [
                now()->subDays(1)->startOfDay(),
                now()->addDay()->endOfDay(),
            ],
        ]);


        $filter = new TransactionFilter($request);
        $transactions = Transaction::filter($filter)->get();

        $this->assertCount(2, $transactions);
    }

    public function test_it_filters_by_internal_transfer_flag()
    {
        $warehouse = Warehouse::factory()->create();
        $product = Product::factory()->create();
        $executor = User::factory()->create();

        // Создаем тестовые данные
        $warehouseProduct = WarehouseProduct::create([
            'product_id'   => $product->id,
            'warehouse_id' => $warehouse->id,
            'quantity'     => 10,
        ]);

        // Создаем Transaction тестовые данные с флагом is_internal_transfer = true
        Transaction::create([
            'product_id'           => $product->id,
            'warehouse_id'         => $warehouse->id,
            'executor_id'          => $executor->id,
            'type'                 => 'in',
            'quantity'             => 5,
            'is_internal_transfer' => true,
        ]);

        // Создаем Transaction тестовые данные с флагом is_internal_transfer = false
        Transaction::create([
            'product_id'           => $product->id,
            'warehouse_id'         => $warehouse->id,
            'executor_id'          => $executor->id,
            'type'                 => 'in',
            'quantity'             => 2,
            'is_internal_transfer' => false,
        ]);

        $request = new Request([
            'is_internal_transfer' => '1',
        ]);

        $filter = new TransactionFilter($request);

        $filtered = Transaction::filter($filter)->get();

        $this->assertTrue($filtered->every(fn ($t) => $t->is_internal_transfer));
    }
}
