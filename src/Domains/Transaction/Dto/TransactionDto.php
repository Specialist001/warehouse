<?php

namespace Domains\Transaction\Dto;

use Spatie\LaravelData\Data;

class TransactionDto extends Data
{
    public function __construct(
        public readonly string  $warehouse_id,
        public readonly string  $product_id,
        public readonly string  $executor_id,
        public readonly int     $quantity,
        public readonly string  $status,
        public readonly bool    $is_internal_transfer = false,
        public readonly ?string $type = null,
        public readonly ?string $source = null,
        public readonly ?string $destination = null,
    )
    {
    }
}
