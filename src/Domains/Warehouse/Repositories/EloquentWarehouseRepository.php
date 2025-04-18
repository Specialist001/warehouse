<?php

namespace Domains\Warehouse\Repositories;

use Domains\Warehouse\Models\Warehouse;

class EloquentWarehouseRepository extends WarehouseRepository
{
    public function get(string $id): ?Warehouse
    {
        return Warehouse::find($id);
    }

    public function getWithTrashed(string $id): ?Warehouse
    {
        return Warehouse::withTrashed()->find($id);
    }

    public function getAll($pagination = 15)
    {
        return Warehouse::paginate($pagination);
    }

    public function getLatest($pagination = 15)
    {
        return Warehouse::latest()->paginate($pagination);
    }

    public function create(array $data): Warehouse
    {
        return Warehouse::create($data);
    }

    public function update(string $id, array $data): Warehouse|bool
    {
        $warehouse = $this->get($id);
        if ($warehouse) {
            $warehouse->update($data);
            return $warehouse;
        }
        return false;
    }

    public function delete(string $id): bool
    {
        $warehouse = $this->get($id);
        if ($warehouse) {
            $warehouse->save();

            return $warehouse->delete();
        }

        return false;
    }

    public function createProduct(string $id, array $data): Warehouse|bool
    {
        $warehouse = $this->get($id);
        if ($warehouse) {
            $warehouse->products()->attach($data['product_id'], [
                'quantity' => $data['quantity'],
            ]);

            return $warehouse;
        }

        return false;
    }

    public function getWhereStatus(string $string)
    {
        return Warehouse::where('status', $string)->get();
    }
}
