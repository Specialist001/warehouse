<?php

namespace Domains\Category\Resources;

use Domains\Restaurant\Resources\AdminWarehouseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [

			'id' => $this->id,
			'name' => $this->name,
			'short_description' => $this->short_description,
			'is_active' => (bool) $this->is_active,
			'logo' => $this->logo,
			'order_num' => $this->order_num,
			'created_at' => $this->created_at->format('Y-m-d H:i:s'),
			'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
			'deleted_at' => $this->deleted_at ? $this->deleted_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
