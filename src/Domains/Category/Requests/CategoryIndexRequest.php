<?php

namespace Domains\Category\Requests;

class CategoryIndexRequest extends \Illuminate\Foundation\Http\FormRequest
{
    public function rules(): array
    {
        return [
			'field' => [
				'in:id,name,short_description,is_active,logo,order_num,created_at,updated_at,deleted_at',
			],
			'order' => ['in:asc,desc'],
			'perPage' => ['numeric'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
