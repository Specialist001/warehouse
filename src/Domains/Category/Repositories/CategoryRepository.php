<?php

namespace Domains\Category\Repositories;


use Domains\Category\Models\Category;

class CategoryRepository
{
    public function get(int $id)
    {
        return Category::find($id);
    }

    public function getWithTrashed(int $id)
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

    public function create(array $data)
    {
        return Category::create($data);
    }

    public function update(int $id, array $data): Category|bool
    {
        $restaurant = $this->get($id);
        if ($restaurant) {
            $restaurant->update($data);
            return $restaurant;
        }
        return false;
    }

    public function delete(int $id): bool
    {
        $restaurant = $this->get($id);
        if ($restaurant) {
            $restaurant->save();

            return $restaurant->delete();
        }

        return false;
    }

}
