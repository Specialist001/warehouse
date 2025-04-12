<?php

return [
    'groups' => [
        'admin'   => ['admin.*','setLang.*'],
        'site'    => ['setLang.*'],
        'auth'    => ['admin.auth.*', 'cabinet.auth.*', 'setLang.*'],
        'dash'    => [
            'admin.dashboard',
            'setLang.*',
            'admin.user.index',
            'admin.role.index',
            'admin.permission.index',
            'admin.category.index',
            'admin.product.index',
            'admin.transaction.index',
            'admin.warehouse.index',
            'admin.warehouse_product.index',
            'admin.profile.edit',
            'admin.logout'
        ],
        'storage' => ['storage.*']
    ],
];
