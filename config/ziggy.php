<?php

return [
    'groups' => [
        'admin'   => ['admin.*',],
        'site'    => ['setLang.*'],
        'auth'    => ['admin.auth.*', 'cabinet.auth.*'],
        'dash'    => ['admin.dashboard.*' . 'cabinet.dashboard.*'],
        'storage' => ['storage.*']
    ],
];
