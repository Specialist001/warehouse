<?php

namespace Domains\WarehouseProduct\Filters;

use App\Services\FilterService\Filter;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WarehouseProductFilter extends Filter
{
    protected array $available = [
        'id',
        'warehouse_id',
        'product_id',
        'product_name',
        'quantity',
        'warehouse_products.created_at',
//        'sort', 'perPage'
    ];

    protected array $defaults = [
        'sort' => '-warehouse_products.created_at',
    ];

    private string $timezone;

    public function __construct(Request $request)
    {
        $this->input = $this->prepareInput($request->all());
        $this->timezone = config('app.timezone', 'UTC');
    }

    protected function init()
    {
        $this->builder
            ->join('products', 'warehouse_products.product_id', '=', 'products.id')
            ->select('warehouse_products.*', 'products.name as product_name');

        $this->addSortable('id');
        $this->addSortable('warehouse_id');
        $this->addSortable('product_id');
        $this->addSortable('name', 'products');
        $this->addSortable('quantity');
        $this->addSortable('created_at', 'warehouse_products');
    }

    public function id($value)
    {
        $this->builder->where($this->column('id'), '=', $value);
    }

    public function warehouse_id($value)
    {
        $this->builder->where($this->column('warehouse_id'), '=', $value);
    }

    public function product_id($value)
    {
        $this->builder->where($this->column('product_id'), '=', $value);
    }

    public function product_name($value)
    {
        // LEFT JOIN products AND WHERE A.name LIKE '%$value%'
        $this->builder->where('products.name', 'LIKE', "%$value%");
    }

    public function quantity($value)
    {
        $this->builder->where($this->column('quantity'), '=', $value);
    }

    public function created_at(array $value)
    {
        $begin_at = $value[0];
        $end_at = $value[1];

        $begin_at = Carbon::parse($begin_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');
        $end_at = Carbon::parse($end_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');

        $this->builder->whereBetween($this->column('warehouse_products.created_at'), [$begin_at, $end_at]);
    }
}
