<?php

namespace Domains\Warehouse\Services;

use Domains\Warehouse\Contracts\WarehouseInterface;
use Domains\Warehouse\Dto\WarehouseDto;
use Domains\Warehouse\States\Status\WarehouseStatus;

class WarehouseService
{
    public function __construct(private WarehouseInterface $warehouseRepository)
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

    public function create(WarehouseDto $dto): \Domains\Warehouse\Models\Warehouse
    {
        return $this->warehouseRepository->create($dto);
    }

    public function update(string $id, WarehouseDto $dto): \Domains\Warehouse\Models\Warehouse | bool
    {
        return $this->warehouseRepository->update($id, $dto);
    }

    public function delete(string $id): bool
    {
        return $this->warehouseRepository->delete($id);
    }

    public function addProduct(string $id, array $data): \Domains\Warehouse\Models\Warehouse|bool
    {
        return $this->warehouseRepository->createProduct($id, $data);
    }

    public function getActiveWarehouses()
    {
        return $this->warehouseRepository->getWhereStatus(WarehouseStatus::active()->value);
    }
}
