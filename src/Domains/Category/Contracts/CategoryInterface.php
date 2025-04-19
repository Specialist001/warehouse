<?php

namespace Domains\Category\Contracts;

use Domains\Category\Dto\CategoryDto;

interface CategoryInterface
{
    public function get(string $id): \Domains\Category\Models\Category | null;

    public function getWithTrashed(string $id): \Domains\Category\Models\Category | null;

    public function getAll($pagination = 15);

    public function getLatest($pagination = 15);

    public function create(CategoryDto $dto): \Domains\Category\Models\Category;

    public function update(string $id, CategoryDto $dto): \Domains\Category\Models\Category | bool;

    public function delete(string $id): bool;

}
