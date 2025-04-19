<?php

namespace Domains\Product\Repositories;

use Domains\Product\Dto\ProductDto;
use Domains\Product\Models\Product;

class EloquentProductRepository extends ProductRepository
{
    public function get(string $id): ?Product
    {
        return Product::find($id);
    }

    public function getWithTrashed(string $id): ?Product
    {
        return Product::withTrashed()->find($id);
    }

    public function getAll($pagination = 15)
    {
        return Product::paginate($pagination);
    }

    public function getLatest($pagination = 15)
    {
        return Product::latest()->paginate($pagination);
    }

    public function create(ProductDto $dto): Product
    {
        return Product::create($dto->toArray());
    }

    public function update(string $id, ProductDto $dto): Product|bool
    {
        $product = $this->get($id);
        if ($product) {
            $product->update($dto->toArray());
            return $product;
        }
        return false;
    }

    public function delete(string $id): bool
    {
        $product = $this->get($id);
        if ($product) {
            return $product->delete();
        }

        return false;
    }

    public function restore(string $id): bool
    {
        $product = $this->getWithTrashed($id);
        if ($product) {
            return $product->restore();
        }

        return false;
    }

    public function searchByProductName(string $product_name)
    {
        return Product::where('name', 'like', "%$product_name%")->get();
    }
}
