<?php

namespace Domains\Category\Services;

use Domains\Category\Contracts\CategoryInterface;

class CategoryService
{
    public function __construct(private CategoryInterface $categoryRepository)
    {
    }

    public function one(string $id): \Domains\Category\Models\Category | null
    {
        return $this->categoryRepository->get(id: $id);
    }

    public function oneWithTrashed(string $id): \Domains\Category\Models\Category | null
    {
        return $this->categoryRepository->getWithTrashed($id);
    }

    public function all($pagination = 15)
    {
        return $this->categoryRepository->getAll($pagination);
    }

    public function latest($pagination = 15)
    {
        return $this->categoryRepository->getLatest($pagination);
    }

    public function create(array $data): \Domains\Category\Models\Category
    {
        return $this->categoryRepository->create($data);
    }

    public function update(string $id, array $data): \Domains\Category\Models\Category | bool
    {
        return $this->categoryRepository->update($id, $data);
    }

    public function delete(string $id): bool
    {
        return $this->categoryRepository->delete($id);
    }
}
