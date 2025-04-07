<?php

namespace Domains\Warehouse\Services;

use Domains\Warehouse\Repositories\WarehouseRepository;

readonly class WarehouseService
{
    public function __construct(private WarehouseRepository $warehouseRepository)
    {
    }

    public function one(string $id): \Domains\Warehouse\Models\Warehouse | null
    {
        return $this->warehouseRepository->get(id: $id);
    }

    public function oneWithTrashed(string $id): \Domains\Warehouse\Models\Warehouse | null
    {
        return $this->warehouseRepository->getWithTrashed($id);
    }

    public function all($pagination = 15)
    {
        return $this->warehouseRepository->getAll($pagination);
    }

    public function latest($pagination = 15)
    {
        return $this->warehouseRepository->getLatest($pagination);
    }

    public function create(array $data): \Domains\Warehouse\Models\Warehouse
    {
        return $this->warehouseRepository->create($data);
    }

    public function update(string $id, array $data): \Domains\Warehouse\Models\Warehouse | bool
    {
        return $this->warehouseRepository->update($id, $data);
    }

    public function delete(string $id): bool
    {
        return $this->warehouseRepository->delete($id);
    }

    public function addProduct(string $id, array $data): \Domains\Warehouse\Models\Warehouse|bool
    {
        return $this->warehouseRepository->createProduct($id, $data);
    }
}
