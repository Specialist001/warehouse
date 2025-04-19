<?php

namespace Domains\Category\Factory;

use Domains\Category\Dto\CategoryDto;
use Domains\Category\Requests\CategoryStoreRequest;

class CategoryDtoFactory
{
    public static function fromRequest(
        CategoryStoreRequest $request
    ): CategoryDto
    {
        return new CategoryDto(
            name: $request->input('name', []),
            short_description: $request->input('short_description', []),
            is_active: $request->boolean('is_active'),
            logo: $request->filled('logo') ? $request->input('logo') : null,
            order_num: $request->integer('order_num'),
        );
    }

    public static function fromArray(array $data): CategoryDto
    {
        return new CategoryDto(
            name: $data['name'] ?? [],
            short_description: $data['short_description'] ?? [],
            is_active: $data['is_active'] ?? true,
            logo: $data['logo'] ?? null,
            order_num: $data['order_num'] ?? 0,
        );
    }
}
