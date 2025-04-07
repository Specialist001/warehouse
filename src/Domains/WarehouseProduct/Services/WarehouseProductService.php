<?php

namespace Domains\WarehouseProduct\Services;

use Domains\WarehouseProduct\Repositories\WarehouseProductRepository;

readonly class WarehouseProductService
{
    public function __construct(private WarehouseProductRepository $warehouseProductRepository)
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

    public function create(array $data): \Domains\WarehouseProduct\Models\WarehouseProduct
    {
        return $this->warehouseProductRepository->create($data);
    }

    public function update(string $id, array $data): \Domains\WarehouseProduct\Models\WarehouseProduct | bool
    {
        return $this->warehouseProductRepository->update($id, $data);
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
}
