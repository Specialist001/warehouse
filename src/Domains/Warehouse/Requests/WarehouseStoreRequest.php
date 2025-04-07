<?php

namespace Domains\Warehouse\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WarehouseStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<mixed>
     */
    public function rules()
    {
        return [
            'name'     => ['required', 'string', 'min:3', 'max:255'],
            'location' => ['nullable', 'string', 'min:10', 'max:255'],
            'status'   => ['nullable', 'in:active,inactive'],
        ];
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
