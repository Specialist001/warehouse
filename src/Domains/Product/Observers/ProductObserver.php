<?php

namespace Domains\Product\Observers;

class ProductObserver
{
    // beforeFind
    public function retrieved($model)
    {
        if ($model->description === null) {
            $locales = config('app.locales', ['uz', 'ru', 'en']); // Берём локали из конфига или ставим дефолтные
            $translations = array_fill_keys($locales, ''); // Создаём массив с ключами локалей и пустыми значениями
            $model->setTranslations('description', $translations); // Устанавливаем переводы
        }
    }
}
