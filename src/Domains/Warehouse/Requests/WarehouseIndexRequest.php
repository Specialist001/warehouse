<?php

namespace Domains\Warehouse\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property mixed field
 * @property mixed order
 * @property mixed perPage
 */

class WarehouseIndexRequest extends FormRequest
{
    public function authorize(): true
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'field'   => [
                'in:id,name,location,,status,created_at,updated_at'
            ],
            'order'   => ['in:asc,desc'],
            'perPage' => ['numeric'],
        ];
    }
}
