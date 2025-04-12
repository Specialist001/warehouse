<?php

namespace Domains\Category\Contracts;

interface CategoryInterface
{
    public function get(string $id): \Domains\Category\Models\Category | null;

    public function getWithTrashed(string $id): \Domains\Category\Models\Category | null;

    public function getAll($pagination = 15);

    public function getLatest($pagination = 15);

    public function create(array $data): \Domains\Category\Models\Category;

    public function update(string $id, array $data): \Domains\Category\Models\Category | bool;

    public function delete(string $id): bool;

}
