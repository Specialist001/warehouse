<?php

namespace Domains\Product\Contracts;

use Domains\Product\Dto\ProductDto;

interface ProductInterface
{
    public function get(string $id): \Domains\Product\Models\Product | null;

    public function getAll($pagination = 15);

    public function getLatest($pagination = 15);

    public function create(ProductDto $dto): \Domains\Product\Models\Product;

    public function update(string $id, ProductDto $dto): \Domains\Product\Models\Product | bool;

    public function delete(string $id): bool;

    public function getWithTrashed(string $id);

    public function restore(string $id);

    public function searchByProductName(string $product_name);

}
