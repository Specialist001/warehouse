<?php

namespace Domains\WarehouseProduct\Requests;


/**
 * @property string name
 * @property string description
 * @property string sku
 * @property mixed price
 * @property string barcode
 * @property mixed created_at
 * @property mixed updated_at
 * @property array category_ids
 */

class WarehouseProductStoreRequest extends \Illuminate\Foundation\Http\FormRequest
{
    public function rules(): array
    {
        return [
            'warehouse_id' => 'required|exists:warehouses,id',
            'product_id'  => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
            'created_at'    => 'nullable|date',
            'updated_at'    => 'nullable|date',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function messages()
    {
        $parent_messages = parent::messages(); // TODO: Change the autogenerated stub

        $locales = config('app.locales');
        $messages = [];
        foreach ($locales as $locale) {
            $messages["name.$locale.required"] = __('validation.required', ['attribute' => __('app.label.names') . " ($locale)"]);
            $messages["name.$locale.string"] = __('validation.string', ['attribute' => __('app.label.names') . " ($locale)"]);
            $messages["name.$locale.min"] = __('validation.min.string', ['attribute' => __('app.label.names') . " ($locale)", 'min' => 3]);
            $messages["name.$locale.max"] = __('validation.max.string', ['attribute' => __('app.label.names') . " ($locale)", 'max' => 255]);
        }

        return array_merge($parent_messages, $messages);
    }
}
