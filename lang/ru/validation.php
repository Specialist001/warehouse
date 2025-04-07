<?php

return [
    'phone' => [
        "required" => "Телфон обязателен",
        "numeric" => "Телефон должен быть целым числом",
        "digits" => "Телефон должен состоять из 12 цифр",
        'wrong_phone_number' => 'Неправильный номер телефона',
        'access_denied' => 'Доступ запрещен',
    ],
    'sms_code' => [
        "required" => "Код входа обязателен",
        "numeric" => "Код входа должен быть целым числом",
        "between" => "Код входа должен быть между 111111 и 999999",
    ],
    'prize_id' => [
        'required' => 'prize_id обязателен',
        'integer' => 'prize_id должен быть целым числом',
        'exists' => 'Приз не существует',
    ],
    'required' => 'Поле :attribute обязательно для заполнения',
    'unique' => 'Поле :attribute должно быть уникальным',
    'wrong_phone_number' => 'Неправильный номер телефона',
    'max' => [
        'string' => 'Поле :attribute не должно превышать :max символов',
        'array' => 'Поле :attribute не должно содержать более :max элементов',
        'file' => 'Поле :attribute не должно превышать :max килобайт',
        'numeric' => 'поле :attribute не должно превышать :max',
    ],
    'min' => [
        'string' => 'Поле :attribute должно быть не менее :min символов',
    ],
    'integer' => 'Поле :attribute должно быть целым числом',
    'uuid' => 'Поле :attribute должно быть UUID',
    'required_if' => 'Поле :attribute обязательно для заполнения, когда :other равно :value',
    'lte' => [
        'array' => 'Поле :attribute должно содержать не более :value элементов.',
        'file' => 'Поле :attribute должно быть меньше или равно :value килобайт.',
        'numeric' => 'Поле :attribute должно быть меньше или равно :value.',
        'string' => 'Поле :attribute должно содержать не более :value символов.',
    ],
];
