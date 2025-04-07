<?php

namespace Domains\Transaction\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property mixed field
 * @property mixed order
 * @property mixed perPage
 */

class TransactionIndexRequest extends FormRequest
{
    public function authorize(): true
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'field'   => [
                'in:id,warehouse_id,product_id,quantity,type,status,is_internal_transfer,executor_id,source,destination,created_at,updated_at',
            ],
            'order'   => ['in:asc,desc'],
            'perPage' => ['numeric'],
        ];
    }
}
