<?php

return [
    'phone' => [
        "required" => "Telefon raqami kiritilishi shart",
        "numeric" => "Telefon raqami raqam bo'lishi kerak",
        "digits" => "Telefon raqami 12 raqamdan iborat bo'lishi kerak",
        'wrong_phone_number' => "Noto'g'ri telefon raqami",
        'access_denied' => "Kirishga ruxsat yo'q",
    ],
    'sms_code' => [
        "required" => "Kod kiritilishi shart",
        "numeric" => "Kod raqam bo'lishi kerak",
        "between" => "Kod 111111 va 999999 oralig'ida bo'lishi kerak",
    ],
    'prize_id' => [
        'required' => 'prize_id kiritilishi shart',
        'integer' => "prize_id raqam bo'lishi kerak",
        'exists' => "Sovrin mavjud emas",
    ],
    'required' => 'Maydon :attribute to\'ldirilishi shart',
    'unique' => 'Maydon :attribute unikal bo\'lishi kerak',
    'wrong_phone_number' => "Noto'g'ri telefon raqami",
    'max' => [
        'string' => "Maydon :attribute :max belgidan oshmasligi kerak",
        'array' => "Maydon :attribute :max elementdan oshmasligi kerak",
        'file' => "Maydon :attribute :max kilobaytdan oshmasligi kerak",
        'numeric' => "Maydon :attribute :max belgidan oshmasligi kerak"
    ],
    'min' => [
        'string' => "Maydon :attribute :min belgidan kam bo'lishi kerak",
        'numeric' => "Maydon :attribute :min dan kam bo'lmasligi kerak",
    ],
    'integer' => "Maydon :attribute raqam bo'lishi kerak",
    'exists' => "Maydon :attribute mavjud emas",
    'uuid' => "Maydon :attribute UUID bo'lishi kerak",
    'required_if' => ":attribute maydoni to'ldirilishi shart",
    'lte' => [
        'array' => "Maydon :attribute :value elementdan oshmasligi kerak.",
        'file' => "Maydon :attribute :value kilobaytdan oshmasligi kerak.",
        'numeric' => "Maydon :attribute :value dan kam bo'lishi kerak.",
        'string' => "Maydon :attribute :value belgidan oshmasligi kerak.",
        'quantity' => "Maydon :attribute :value dan kam bo'lishi kerak.",
    ],
];
