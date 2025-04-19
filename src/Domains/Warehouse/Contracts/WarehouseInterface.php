<?php

namespace Domains\Warehouse\Contracts;

use Domains\Warehouse\Dto\WarehouseDto;

interface WarehouseInterface
{
    public function get(string $id): \Domains\Warehouse\Models\Warehouse | null;

    public function getWithTrashed(string $id): \Domains\Warehouse\Models\Warehouse | null;

    public function getAll($pagination = 15);

    public function getLatest($pagination = 15);

    public function create(WarehouseDto $dto): \Domains\Warehouse\Models\Warehouse;

    public function update(string $id, WarehouseDto $dto): \Domains\Warehouse\Models\Warehouse | bool;

    public function delete(string $id): bool;

    public function createProduct(string $id, array $data): \Domains\Warehouse\Models\Warehouse | bool;

    public function getWhereStatus(string $string);
}
