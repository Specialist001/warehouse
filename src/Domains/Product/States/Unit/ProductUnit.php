<?php

namespace Domains\Product\States\Unit;

use Spatie\Enum\Enum;

/**
 * @method static self piece()
 * @method static self kg()
 * @method static self liter()
 * @method static self gram()
 * @method static self ml()
 * @method static self pack()
 * @method static self box()
 * @method static self bottle()
 * @method static self cup()
 * @method static self slice()
 * @method static self meter()
 */
final class ProductUnit extends Enum
{
    protected static function labels(): array
    {
        return [
            'piece' => __('app.product_units.piece'),
            'kg' => __('app.product_units.kg'),
            'liter' => __('app.product_units.liter'),
            'gram' => __('app.product_units.gram'),
            'ml' => __('app.product_units.ml'),
            'pack' => __('app.product_units.pack'),
            'box' => __('app.product_units.box'),
            'bottle' => __('app.product_units.bottle'),
            'cup' => __('app.product_units.cup'),
            'slice' => __('app.product_units.slice'),
            'meter' => __('app.product_units.meter'),
        ];
    }

}
