<?php

namespace Domains\WarehouseProduct\Contracts;

use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Requests\WarehouseProductUpdateRequest;

interface WarehouseProductInterface
{
    public function get(string $id): WarehouseProduct | null;

    public function getAll($pagination = 15);

    public function getLatest($pagination = 15);

    public function create(array $data): WarehouseProduct;

    public function update(string $id, array $data): WarehouseProduct | bool;

    public function delete(string $id): bool;

    public function updateOrCreate(
        string $warehouse_id,
        string $product_id,
        int $quantity
    ): WarehouseProduct;
}
