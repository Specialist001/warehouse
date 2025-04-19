<?php

namespace Domains\Transaction\Factory;

use Domains\Transaction\Dto\TransactionDto;
use Domains\Transaction\States\Status\TransactionStatus;
use Domains\WarehouseProduct\Dto\WarehouseProductDto;

class TransactionDtoFactory
{
    public static function incomeFromWarehouseProduct(WarehouseProductDto $dto): TransactionDto
    {
        return new TransactionDto(
            warehouse_id: $dto->warehouse_id,
            product_id: $dto->product_id,
            executor_id: auth()->id(),
            quantity: $dto->quantity,
            status: $dto->status ?? TransactionStatus::pending()->value,
            source: $dto->source,
            destination: $dto->destination,
        );
    }

}
