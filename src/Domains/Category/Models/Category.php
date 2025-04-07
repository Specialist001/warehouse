<?php

namespace Domains\Category\Models;

use App\Services\FilterService\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Translatable\HasTranslations;

class Category extends Model
{
    use HasFactory;
    use HasTranslations;
    use Filterable;
    use HasUuids;

    protected $table = 'categories';

    public array $translatable = ['name', 'short_description'];

    protected $fillable = [
        'restaurant_id',
        'name',
        'short_description',
        'is_active',
        'logo',
        'order_num'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order_num' => 'integer'
    ];

    protected static function newFactory(): \Database\Factories\CategoryFactory
    {
        return \Database\Factories\CategoryFactory::new();
    }

    public function categoryable(): MorphTo {
        return $this->morphTo();
    }
}
