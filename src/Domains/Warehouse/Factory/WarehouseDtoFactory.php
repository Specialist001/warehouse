<?php

namespace Domains\Warehouse\Factory;

use Domains\Warehouse\Dto\WarehouseDto;
use Domains\Warehouse\Requests\WarehouseStoreRequest;

class WarehouseDtoFactory
{
    public static function formRequest(WarehouseStoreRequest $request): WarehouseDto
    {
        return new WarehouseDto(
            name: $request->string('name'),
            location: $request->filled('location') ? $request->string('location') : null,
            status: $request->filled('status') ? $request->string('status') : 'active',
        );
    }
}
