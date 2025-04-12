<?php

namespace Domains\Category\Repositories;


use Domains\Category\Models\Category;

class EloquentCategoryRepository extends CategoryRepository
{
    public function get(string $id): ?Category
    {
        return Category::find($id);
    }

    public function getWithTrashed(string $id): ?Category
    {
        return Category::withTrashed()->find($id);
    }

    public function getAll($pagination = 15)
    {
        return Category::paginate($pagination);
    }

    public function getLatest($pagination = 15)
    {
        return Category::latest()->paginate($pagination);
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(string $id, array $data): Category|bool
    {
        $restaurant = $this->get($id);
        if ($restaurant) {
            $restaurant->update($data);
            return $restaurant;
        }
        return false;
    }

    public function delete(string $id): bool
    {
        $restaurant = $this->get($id);
        if ($restaurant) {
            $restaurant->save();

            return $restaurant->delete();
        }

        return false;
    }

}
