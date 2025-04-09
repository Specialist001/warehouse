<?php

namespace Domains\Product\Contracts;

interface ProductInterface
{
    public function get(string $id): \Domains\Product\Models\Product | null;

    public function getAll($pagination = 15);

    public function getLatest($pagination = 15);

    public function create(array $data): \Domains\Product\Models\Product;

    public function update(string $id, array $data): \Domains\Product\Models\Product | bool;

    public function delete(string $id): bool;

}
