<?php

namespace Domains\Product\Services;

use Domains\Product\Contracts\ProductInterface;
use Domains\Product\Dto\ProductDto;
use Domains\Product\Models\Product;
use Illuminate\Support\Facades\Log;

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

    public function create(ProductDto $dto): Product
    {
        $product = $this->productRepository->create($dto);
        if ($dto->category_ids) {
            $product->categories()->attach($dto->category_ids);
        }

        return $product;
    }

    public function update(string $id, ProductDto $dto): Product | bool
    {
        $product = $this->productRepository->update($id, $dto);
        if ($product) {
            if ($dto->category_ids) {
                $product->categories()->sync($dto->category_ids);
            } else {
                $product->categories()->detach();
            }
        }

        return $product;
    }

    public function delete(string $id): bool
    {
        return $this->productRepository->delete($id);
    }

    public function restore(string $id): bool
    {
        return $this->productRepository->restore($id);
    }

    public function searchByProductName(string $product_name)
    {
        $products = $this->productRepository->searchByProductName(product_name: $product_name);

        $__find = [];
        if ($products) {
            foreach ($products as $product) {
                $__find[$product->id] = $product->name;
            }
        }

        return $__find;
    }
}
