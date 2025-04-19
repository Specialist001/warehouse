<?php

namespace Domains\WarehouseProduct\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \Domains\WarehouseProduct\Models\WarehouseProduct
 */
class WarehouseProductResource extends JsonResource
{

    public static $wrap = null;

    public function toArray($request): array
    {
        return [
            'id'           => $this->id,
            'warehouse_id' => $this->warehouse_id,
            'product_id'   => $this->product_id,
//            'product'      => $this->product,
            'product_name' => $this->whenLoaded('product', function () {
                return $this->product->name;
            }),
            'warehouse_name' => $this->whenLoaded('warehouse', function () {
                return $this->warehouse->name;
            }),
            'warehouse_isset' => $this->whenLoaded('warehouse', function () {
                return !$this->warehouse->deleted_at;
            }),
            'quantity'     => $this->quantity,
            'product_unit' => $this->whenLoaded('product', function () {
                return __('app.product_units.' . $this->product->unit);
            }),
            'created_at'   => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at'   => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
