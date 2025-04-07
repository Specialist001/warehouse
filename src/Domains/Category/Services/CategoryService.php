<?php

namespace Domains\Category\Services;

use Domains\Category\Repositories\CategoryRepository;

readonly class CategoryService
{
    public function __construct(private CategoryRepository $categoryRepository)
    {
    }

    public function one(int $id): \Domains\Category\Models\Category | null
    {
        return $this->categoryRepository->get(id: $id);
    }

    public function oneWithTrashed(int $id): \Domains\Category\Models\Category | null
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

    public function update(int $id, array $data): \Domains\Category\Models\Category | bool
    {
        return $this->categoryRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->categoryRepository->delete($id);
    }
}
