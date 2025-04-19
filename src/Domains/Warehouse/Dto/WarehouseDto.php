<?php

namespace Domains\Warehouse\Dto;

use Spatie\LaravelData\Data;

class WarehouseDto extends Data
{
    public function __construct(
        public readonly string  $name,
        public readonly ?string $location,
        public readonly string  $status,
    )
    {
    }
}
