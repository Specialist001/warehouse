<?php

namespace App\Observers;

use Illuminate\Support\Str;

class UserObserver
{
    public function creating($model)
    {
        if ($model->phone !== null) {
            $model->phone = Str::of($model->phone)->replace('+', '');
        }
    }
}
