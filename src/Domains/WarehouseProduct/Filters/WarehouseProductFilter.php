<?php

namespace Domains\WarehouseProduct\Filters;

use App\Services\FilterService\Filter;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class WarehouseProductFilter extends Filter
{
    protected array $available = [
        'id',
        'warehouse_id',
        'product_id',
        'product_name',
        'quantity',
        'created_at',
//        'sort', 'perPage'
    ];

    protected array $defaults = [
        'sort' => '-created_at',
    ];

    private string $timezone;

    public function __construct(Request $request)
    {
        $this->input = $this->prepareInput($request->all());
        $this->timezone = config('app.timezone', 'UTC');
    }

    /**
     * Применить фильтры к запросу
     *
     * @param Builder $builder
     * @return Builder|\Illuminate\Database\Query\Builder
     */
//    public function apply(Builder $builder): Builder | \Illuminate\Database\Query\Builder
//    {
//        // Присоединяем products, чтобы можно было сортировать и фильтровать по products.name
//        $builder->leftJoin('products', 'warehouse_products.product_id', '=', 'products.id')
//            ->select('warehouse_products.*'); // Не забудь указать SELECT, чтобы не было конфликтов
//
//        if ($this->request->filled('field') && $this->request->filled('order')) {
//            $field = $this->request->get('field');
//            $order = $this->request->get('order');
//
//            if (isset($this->sortable[$field])) {
//                $builder->orderBy($this->sortable[$field], $order);
//            }
//        }
//
//        return parent::apply($builder);
//    }


    protected function init()
    {
        $this->addSortable('id');
        $this->addSortable('warehouse_id');
        $this->addSortable('product_id');
        $this->addSortable('name', 'products', 'product_name');
        $this->addSortable('quantity');
        $this->addSortable('created_at');
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

        $this->builder->whereBetween($this->column('created_at'), [$begin_at, $end_at]);
    }
}
