<?php

namespace Domains\WarehouseProduct\Dto;

use Spatie\LaravelData\Data;

class WarehouseProductDto extends Data
{
    public function __construct(
        public readonly string  $warehouse_id,
        public readonly string  $product_id,
        public readonly int     $quantity,
        public readonly ?string $status = null,
        public readonly ?string $source = null,
        public readonly ?string $destination = null,
    )
    {
    }
}
