<?php

namespace Domains\Transaction\Services;

use Domains\Product\Models\Product;
use Domains\Product\Repositories\ProductRepository;
use Domains\Transaction\Repositories\TransactionRepository;
use Domains\Warehouse\Models\Warehouse;
use Domains\Warehouse\Repositories\WarehouseRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;

readonly class TransactionService
{
    public function __construct(
        private TransactionRepository $transactionRepository,
        private WarehouseRepository $warehouseRepository,
        private ProductRepository $productRepository
    )
    {
    }

    public function one(string $id): \Domains\Transaction\Models\Transaction | null
    {
        return $this->transactionRepository->get(id: $id);
    }

    // one with trashed
    public function oneWithTrashed(string $id): \Domains\Transaction\Models\Transaction | null
    {
        return $this->transactionRepository->getWithTrashed(id: $id);
    }

    public function income(
        string $warehouse_id,
        string $product_id,
        int $executor_id,
        int $quantity,
        string $source = 'Source',
        string $status = 'pending'
    ): bool | \Domains\Transaction\Models\Transaction
    {
        return $this->processTransaction(
            type: 'in',
            warehouse_id: $warehouse_id,
            product_id: $product_id,
            executor_id: $executor_id,
            quantity: $quantity,
            status: $status,
            extraData: ['source' => $source]
        );
    }

    public function outcome(
        string $warehouse_id,
        string $product_id,
        int $executor_id,
        int $quantity,
        string $destination = 'Destination',
        string $status = 'pending'
    ): bool | \Domains\Transaction\Models\Transaction
    {
        return $this->processTransaction(
            type: 'out',
            warehouse_id: $warehouse_id,
            product_id: $product_id,
            executor_id: $executor_id,
            quantity: $quantity,
            status: $status,
            extraData: ['destination' => $destination]
        );
    }

    /**
     * Обрабатывает транзакцию (приход или расход).
     */
    private function processTransaction(
        string $type,
        string $warehouse_id,
        string $product_id,
        int $executor_id,
        int $quantity,
        string $status,
        array $extraData = []
    ): bool | \Domains\Transaction\Models\Transaction
    {
        $warehouse = $this->warehouseRepository->get($warehouse_id);
        $product = $this->productRepository->get($product_id);

        if (!$warehouse) {
            throw new ModelNotFoundException("Склад с ID {$warehouse_id} не найден.");
        }

        if (!$product) {
            throw new ModelNotFoundException("Продукт с ID {$product_id} не найден.");
        }

        if ($quantity <= 0) {
            throw new InvalidArgumentException("Количество товара должно быть больше 0.");
        }

        $data = array_merge([
            'type' => $type,
            'quantity' => $quantity,
            'product_id' => $product->id,
            'warehouse_id' => $warehouse->id,
            'status' => $status,
            'executor_id' => $executor_id,
            'is_internal_transfer' => false
        ], $extraData);

        return $this->transactionRepository->createTransaction($data);
    }

    public function transferBetweenWarehouses(
        Warehouse $source,
        Warehouse $destination,
        Product $product,
        int $quantity,
        int $executor_id
    )
    {
        if ($source->id === $destination->id) {
            throw new InvalidArgumentException("Склады назначения и источника не могут совпадать.");
        }

        if ($quantity <= 0) {
            throw new InvalidArgumentException("Количество товара должно быть больше 0.");
        }

        $this->transactionRepository->createTransaction([
            'type' => 'out',
            'quantity' => $quantity,
            'product_id' => $product->id,
            'warehouse_id' => $source->id,
            'status' => 'completed',
            'destination' => $destination->name,
            'source' => $source->name,
            'executor_id' => $executor_id,
            'is_internal_transfer' => true
        ]);

        $this->transactionRepository->createTransaction([
            'type' => 'in',
            'quantity' => $quantity,
            'product_id' => $product->id,
            'warehouse_id' => $destination->id,
            'status' => 'completed',
            'source' => $source->name,
            'executor_id' => $executor_id,
            'is_internal_transfer' => true
        ]);
    }

}
