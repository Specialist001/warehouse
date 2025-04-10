<?php

namespace Domains\Warehouse\Contracts;

interface WarehouseInterface
{
    public function get(string $id): \Domains\Warehouse\Models\Warehouse | null;

    public function getWithTrashed(string $id): \Domains\Warehouse\Models\Warehouse | null;

    public function getAll($pagination = 15);

    public function getLatest($pagination = 15);

    public function create(array $data): \Domains\Warehouse\Models\Warehouse;

    public function update(string $id, array $data): \Domains\Warehouse\Models\Warehouse | bool;

    public function delete(string $id): bool;

    public function createProduct(string $id, array $data): \Domains\Warehouse\Models\Warehouse | bool;
}
