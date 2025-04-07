<?php

namespace Domains\Product\Models;

use App\Services\FilterService\Filterable;
use Domains\Category\Models\Category;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $sku
 * @property float $price
 * @property string $barcode
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @method static find(int $id)
 */
class Product extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory;
    use HasTranslations;
    use Filterable;
    use SoftDeletes;
    use HasUuids;

    protected $fillable = [
		'id',
		'name',
		'description',
		'sku',
		'price',
		'barcode',
		'created_at',
		'updated_at',
	];

    protected $casts = [
		'name:array',
		'description:array',
		'created_at:datetime',
		'updated_at:datetime',
        'deleted_at:datetime',
	];

    public $translatable = [
        'name',
        'description'
    ];

    protected static function newFactory(): \Database\Factories\ProductFactory
    {
        return \Database\Factories\ProductFactory::new();
    }

    public function categories(): \Illuminate\Database\Eloquent\Relations\MorphToMany {
        return $this->morphToMany(Category::class, 'categoryable');
    }
}
