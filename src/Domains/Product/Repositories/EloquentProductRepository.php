<?php

namespace Domains\Product\Repositories;

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

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(string $id, array $data): Product|bool
    {
        $Product = $this->get($id);
        if ($Product) {
            $Product->update($data);
            return $Product;
        }
        return false;
    }

    public function delete(string $id): bool
    {
        $Product = $this->get($id);
        if ($Product) {
            return $Product->delete();
        }

        return false;
    }

    public function restore(string $id): bool
    {
        $Product = $this->getWithTrashed($id);
        if ($Product) {
            return $Product->restore();
        }

        return false;
    }
}
