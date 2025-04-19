<?php

namespace Domains\Product\Requests;

class ProductIndexRequest extends \Illuminate\Foundation\Http\FormRequest
{
    public function rules(): array
    {
        return [
            'field'   => [
				'in:id,name,description,sku,price,unit,barcode,created_at,updated_at,deleted_at',
            ],
            'order'   => ['in:asc,desc'],
            'perPage' => ['numeric'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
