<?php

namespace Domains\Product\Factory;

use Domains\Product\Dto\ProductDto;
use Domains\Product\Requests\ProductStoreRequest;
use Domains\Product\Requests\ProductUpdateRequest;
use Domains\Product\States\Unit\ProductUnit;

class ProductDtoFactory
{
    public static function fromRequest(
        ProductStoreRequest | ProductUpdateRequest $request
    ): ProductDto
    {
        return new ProductDto(
            name: $request->input('name', []),
            description: $request->input('description', []),
            sku: $request->string('sku'),
            price: $request->integer('price'),
            unit: $request->filled('unit') ? $request->input('unit') : ProductUnit::piece()->value,
            barcode: $request->string('barcode'),
            category_ids: $request->input('category_ids', []),
        );
    }
}
