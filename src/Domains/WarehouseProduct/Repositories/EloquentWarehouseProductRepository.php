<?php

namespace Domains\WarehouseProduct\Repositories;


use Domains\WarehouseProduct\Models\WarehouseProduct;

class EloquentWarehouseProductRepository extends WarehouseProductRepository
{
    public function get(string $id): ?WarehouseProduct
    {
        return WarehouseProduct::find($id);
    }

    public function getAll($pagination = 15)
    {
        return WarehouseProduct::paginate($pagination);
    }

    public function getLatest($pagination = 15)
    {
        return WarehouseProduct::latest()->paginate($pagination);
    }

    public function create(array $data): WarehouseProduct
    {
        return WarehouseProduct::create($data);
    }

    public function update(string $id, array $data): WarehouseProduct|bool
    {
        $warehouse_product = $this->get($id);
        if ($warehouse_product) {
            $warehouse_product->update($data);
            return $warehouse_product;
        }
        return false;
    }

    public function delete(string $id): bool
    {
        $warehouse_product = $this->get($id);
        if ($warehouse_product) {
            return $warehouse_product->delete();
        }

        return false;
    }

    public function updateOrCreate(
        string $warehouse_id,
        string $product_id,
        int $quantity
    ): WarehouseProduct
    {
        // if product already exists in warehouse, update quantity, else create new
        $warehouse_product = WarehouseProduct::where('warehouse_id', $warehouse_id)
            ->where('product_id', $product_id)
            ->first();

        if ($warehouse_product) {
            $warehouse_product->increment('quantity', $quantity);

            return $warehouse_product;
        } else {
            return WarehouseProduct::create([
                'warehouse_id' => $warehouse_id,
                'product_id' => $product_id,
                'quantity' => $quantity
            ]);
        }
    }
}
