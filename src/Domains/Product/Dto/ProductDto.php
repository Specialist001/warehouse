<?php

namespace Domains\Product\Dto;

use Spatie\LaravelData\Data;

class ProductDto extends Data
{
    public function __construct(
        public readonly array   $name,
        public readonly ?array  $description,
        public readonly string  $sku,
        public readonly float   $price,
        public readonly ?string $unit,
        public readonly ?string $barcode,
        public readonly ?array  $category_ids,
    )
    {
    }
}
