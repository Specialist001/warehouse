<?php

namespace Domains\Warehouse\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \Domains\Warehouse\Models\Warehouse
 */
class AdminWarehouseResource extends JsonResource
{

    public static $wrap = null;

    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'location'      => $this->location,
            'status'        => $this->status,
            'created_at'    => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at'    => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
