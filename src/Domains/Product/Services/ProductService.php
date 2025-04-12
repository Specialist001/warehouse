<?php

namespace Domains\Product\Services;

use Domains\Product\Contracts\ProductInterface;
use Domains\Product\Models\Product;

class ProductService
{
    public function __construct(private ProductInterface $productRepository)
    {
    }

    public function one(string $id): Product | null
    {
        return $this->productRepository->get(id: $id);
    }

    public function oneWithTrashed(string $id): Product | null
    {
        return $this->productRepository->getWithTrashed(id: $id);
    }

    public function all($pagination = 15)
    {
        return $this->productRepository->getAll($pagination);
    }

    public function latest($pagination = 15)
    {
        return $this->productRepository->getLatest($pagination);
    }

    public function create(array $data): Product
    {
        return $this->productRepository->create($data);
    }

    public function update(string $id, array $data): Product | bool
    {
        return $this->productRepository->update($id, $data);
    }

    public function delete(string $id): bool
    {
        return $this->productRepository->delete($id);
    }

    public function restore(string $id): bool
    {
        return $this->productRepository->restore($id);
    }
}
