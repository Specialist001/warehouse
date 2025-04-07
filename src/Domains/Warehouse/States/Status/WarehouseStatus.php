<?php

namespace Domains\Warehouse\States\Status;

use Spatie\Enum\Enum;

/**
 * @method static self active()
 * @method static self inactive()
 */
final class WarehouseStatus extends Enum
{
    public static function getCustomerStatuses(): array
    {
        return [
            'active' => __('app.warehouse.status_active'),
            'inactive' => __('app.warehouse.status_inactive'),
        ];
    }

    protected static function labels(): array
    {
        return [
            'active' => __('app.warehouse.status_active'),
            'inactive' => __('app.warehouse.status_inactive'),
        ];
    }
}
