<?php

namespace Domains\Category\Repositories;


use Domains\Category\Dto\CategoryDto;
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

    public function create(CategoryDto $dto): Category
    {
        return Category::create($dto->toArray());
    }

    public function update(string $id, CategoryDto $dto): Category|bool
    {
        $category = $this->get($id);
        if ($category) {
            $category->update($dto->toArray());
            return $category;
        }
        return false;
    }

    public function delete(string $id): bool
    {
        $category = $this->get($id);
        if ($category) {
            $category->save();

            return $category->delete();
        }

        return false;
    }

}
