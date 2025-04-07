<?php

namespace Domains\WarehouseProduct\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WarehouseProductIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'field'   => [
                'in:id,warehouse_id,product_id,product_name,quantity,created_at,updated_at'
            ],
            'order'   => ['in:asc,desc'],
            'perPage' => ['numeric'],
        ];
    }
}
