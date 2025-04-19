<?php

namespace Domains\WarehouseProduct\Factory;

use Domains\WarehouseProduct\Dto\WarehouseProductDto;
use Domains\WarehouseProduct\Requests\WarehouseProductStoreRequest;

class WarehouseProductDtoFactory
{
    public static function fromRequest(WarehouseProductStoreRequest $request): WarehouseProductDto
    {
        return new WarehouseProductDto(
            warehouse_id: $request->string('warehouse_id'),
            product_id: $request->string('product_id'),
            quantity: $request->integer('quantity'),
            status: $request->input('status'),
            source: $request->string('source'),
            destination: $request->string('destination'),
        );

    }
}
