<?php

namespace Domains\Warehouse\Repositories;

use Domains\Warehouse\Dto\WarehouseDto;
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

    public function create(WarehouseDto $dto): Warehouse
    {
        return Warehouse::create($dto->toArray());
    }

    public function update(string $id, WarehouseDto $dto): Warehouse|bool
    {
        $warehouse = $this->get($id);
        if ($warehouse) {
            $warehouse->update($dto->toArray());
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
