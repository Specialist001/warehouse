<?php

namespace Domains\WarehouseProduct\Services;

use Domains\Transaction\Services\TransactionService;
use Domains\Warehouse\Services\WarehouseService;
use Domains\WarehouseProduct\Contracts\WarehouseProductInterface;
use Domains\WarehouseProduct\Dto\WarehouseProductDto;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Requests\WarehouseProductUpdateRequest;

class WarehouseProductService
{
    public function __construct(
        private WarehouseProductInterface $warehouseProductRepository,
        private WarehouseService $warehouseService,
        private TransactionService $transactionService,
    )
    {
    }

    public function one(string $id): \Domains\WarehouseProduct\Models\WarehouseProduct | null
    {
        return $this->warehouseProductRepository->get(id: $id);
    }

    public function all($pagination = 15)
    {
        return $this->warehouseProductRepository->getAll($pagination);
    }

    public function latest($pagination = 15)
    {
        return $this->warehouseProductRepository->getLatest($pagination);
    }

    public function create(WarehouseProductDto $dto): \Domains\WarehouseProduct\Models\WarehouseProduct
    {
        return $this->warehouseProductRepository->create($dto);
    }

    public function update(string $id, WarehouseProductDto $dto): \Domains\WarehouseProduct\Models\WarehouseProduct | bool
    {
        return $this->warehouseProductRepository->update($id, $dto);
    }

    public function delete(string $id): bool
    {
        return $this->warehouseProductRepository->delete($id);
    }

    public function updateOrCreateProduct(string $warehouse_id, string $product_id, int $quantity): \Domains\WarehouseProduct\Models\WarehouseProduct
    {
        return $this->warehouseProductRepository->updateOrCreate(
            warehouse_id: $warehouse_id,
            product_id: $product_id,
            quantity: $quantity
        );
    }

    public function processUpdate(
        WarehouseProduct $warehouseProduct,
        WarehouseProductUpdateRequest $request
    ): void
    {
        if ($request->type === 'in') {
            $request->only(['receive_quantity', 'source']);

            $this->handleIncome($warehouseProduct, $request->validated());
        } elseif ($request->type == 'out') {
            $request->only([
                'is_internal_transfer',
                'executor_id',
                'send_quantity',
                'destination',
            ]);

            $this->handleOutcome($warehouseProduct, $request->validated());
        }
    }

    public function handleIncome(WarehouseProduct $warehouseProduct, array $data): void
    {
        $warehouseProduct->increment('quantity', $data['receive_quantity']);

        $this->transactionService->income(
            warehouse_id: $warehouseProduct->warehouse_id,
            product_id: $warehouseProduct->product_id,
            executor_id: auth()->user()->id,
            quantity: $data['receive_quantity'],
            source: $data['source']
        );
    }

    public function handleOutcome(
        WarehouseProduct $warehouseProduct,
        array $data
    ): void
    {
        if ($data['is_internal_transfer']) {
            $this->handleInternalTransfer($warehouseProduct, $data);
        } else {
            $this->transactionService->outcome(
                warehouse_id: $warehouseProduct->warehouse_id,
                product_id: $warehouseProduct->product_id,
                executor_id: auth()->user()->id ?? $data['executor_id'],
                quantity: $data['send_quantity'],
                destination: $data['destination']
            );
        }

        $newQuantity = $warehouseProduct->quantity - $data['send_quantity'];
        if ($newQuantity <= 0) {
            $this->warehouseProductRepository->delete(id: $warehouseProduct->id);
        } else {
            $warehouseProduct->decrement('quantity', $data['send_quantity']);
        }
    }

    protected function handleInternalTransfer(
        WarehouseProduct $warehouseProduct,
        array $data
    ): void
    {
        $sourceWarehouse = $this->warehouseService->one(id: $warehouseProduct->warehouse_id);
        $destinationWarehouse = $this->warehouseService->one(id: $data['destination']);

        $this->warehouseProductRepository->updateOrCreate(
            warehouse_id: $data['destination'],
            product_id: $warehouseProduct->product_id,
            quantity: $data['send_quantity']
        );

        $this->transactionService->transferBetweenWarehouses(
            source: $sourceWarehouse,
            destination: $destinationWarehouse,
            product: $warehouseProduct->product,
            quantity: $data['send_quantity'],
            executor_id: auth()->user()->id ?? $data['executor_id'],
        );
    }
}
