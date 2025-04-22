<?php

namespace Domains\Transaction\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \Domains\Transaction\Models\Transaction
 */
class TransactionResource extends JsonResource
{

    public static $wrap = null;

    public function toArray($request): array
    {
        return [
            'id'                   => $this->id,
            'warehouse_id'         => $this->warehouse_id,
            'warehouse_name'       => $this->whenLoaded('warehouse', function () {
                return $this->warehouse->name;
            }),
            'warehouse_isset'      => $this->whenLoaded('warehouse', function () {
                return !$this->warehouse->deleted_at;
            }),
            'product_id'           => $this->product_id,
            'executor_id'          => $this->executor_id,
            'product_name'         => $this->whenLoaded('product', function () {
                return $this->product->name;
            }),
            'product_unit'         => $this->whenLoaded('product', function () {
                return __('app.product_units.' . $this->product->unit);
            }),
            'type'                 => $this->type,
            'quantity'             => $this->quantity,
            'status'               => $this->status,
            'is_internal_transfer' => $this->is_internal_transfer,
            'source'               => $this->source,
            'destination'          => $this->destination,
            'created_at'           => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at'           => $this->updated_at->format('Y-m-d H:i:s'),
            'deleted_at'           => $this->deleted_at ? $this->deleted_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
