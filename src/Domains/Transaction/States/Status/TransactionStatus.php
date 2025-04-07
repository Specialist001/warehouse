<?php

namespace Domains\Transaction\States\Status;

use Spatie\Enum\Enum;

/**
 * @method static self pending()
 * @method static self completed()
 * @method static self cancelled()
 */
final class TransactionStatus extends Enum
{
    protected static function labels(): array
    {
        return [
            'pending' => __('app.transaction.status_pending'),
            'completed' => __('app.transaction.status_completed'),
            'cancelled' => __('app.transaction.status_cancelled'),
        ];
    }
}
