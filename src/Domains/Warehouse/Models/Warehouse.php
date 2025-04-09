<?php

namespace Domains\Warehouse\Models;

use App\Models\User;
use App\Services\FilterService\Filter;
use App\Services\FilterService\Filterable;
use Domains\Category\Models\Category;
use Domains\Product\Models\Product;
use Domains\Warehouse\Filters\WarehouseFilter;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string $location
 * @property string $status
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read User $owner
 * @property-read User[] $employees
 *
 * @method static WarehouseFilter filter(Filter $filter)
 * @method static find(int $id)
 */
class Warehouse extends Model
{
    use HasFactory;
    use Filterable;
    use SoftDeletes;
    use HasUuids;

    protected $table = 'warehouses';

    protected $fillable = [
        'name',
        'location',
        'status',
    ];

    protected $casts = [
    ];

    protected static function newFactory(): \Database\Factories\WarehouseFactory
    {
        return \Database\Factories\WarehouseFactory::new();
    }

    public function categories(): \Illuminate\Database\Eloquent\Relations\MorphToMany {
        return $this->morphToMany(Category::class, 'categoryable');
    }

    // products via pivot table `warehouse_product`
    public function products()
    {
        return $this->belongsToMany(Product::class, 'warehouse_products')
            ->withPivot('quantity')
            ->withTimestamps();

    }

    public function scopeActive()
    {
        return $this->where('status', 'active');
    }

    public function scopeInactive()
    {
        return $this->where('status', 'inactive');
    }
}
