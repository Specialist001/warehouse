<?php

namespace Domains\Category\Dto;

use Spatie\LaravelData\Data;

class CategoryDto extends Data
{
    public function __construct(
        public readonly array   $name,
        public readonly ?array  $short_description,
        public readonly bool    $is_active,
        public readonly ?string $logo,
        public readonly int     $order_num,
    )
    {
    }
}
