<?php

namespace Domains\Transaction\Models;

use App\Models\User;
use App\Services\FilterService\Filterable;
use Domains\Product\Models\Product;
use Domains\Warehouse\Models\Warehouse;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Transaction extends Model
{
    use HasFactory;
    use Filterable;
    use HasUuids;
    use SoftDeletes;

    protected $table = 'transactions';

    protected $fillable = [
        'type', 'product_id',
        'warehouse_id', 'destination',
        'status', 'source', 'quantity',
        'executor_id', 'is_internal_transfer',
        'created_at', 'updated_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class)->withTrashed();
    }

    public function executor()
    {
        return $this->belongsTo(User::class, 'executor_id');
    }
}
