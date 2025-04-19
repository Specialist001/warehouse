<?php

namespace Domains\Product\Filters;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Services\FilterService\Filter;

class ProductFilter extends Filter
{
    protected array $available = [
        'id',
        'name',
        'description',
        'sku',
        'price',
        'unit',
        'barcode',
        'created_at',
        'updated_at',
        'deleted_at',
        'sort', 'perPage',
    ];

    protected array $defaults = [
        'sort' => '-created_at',
    ];

    private string $timezone;
    private string $like_condition;

    public function __construct(Request $request)
    {
        $this->input = $this->prepareInput($request->all());
        $this->timezone = config('app.timezone', 'UTC');
        $this->like_condition = config('database.default') === 'pgsql' ? 'ilike' : 'like';
    }

    protected function init()
    {
        $this->addSortable('id');
        $this->addSortable('name');
        $this->addSortable('description');
        $this->addSortable('sku');
        $this->addSortable('price');
        $this->addSortable('unit');
        $this->addSortable('barcode');
        $this->addSortable('created_at');
        $this->addSortable('updated_at');
        $this->addSortable('deleted_at');
    }

    public function id($value)
    {
        $this->builder->where($this->column('id'), '=', $value);
    }

    public function name($value)
    {
        $this->builder->where($this->column('name'), $this->like_condition, "%$value%");
    }

    public function description($value)
    {
        $this->builder->where($this->column('description'), $this->like_condition, "%$value%");
    }

    public function sku($value)
    {
        $this->builder->where($this->column('sku'), '=', $value);
    }

    public function price($value)
    {
        $this->builder->where($this->column('price'), '=', $value);
    }

    public function unit($value)
    {
        $this->builder->where($this->column('unit'), '=', $value);
    }

    public function created_at($value)
    {
        $begin_at = $value[0];
        $end_at = $value[1];

        $begin_at = Carbon::parse($begin_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');
        $end_at = Carbon::parse($end_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');

        $this->builder->whereBetween($this->column('created_at'), [$begin_at, $end_at]);
    }

    public function updated_at($value)
    {
        $begin_at = $value[0];
        $end_at = $value[1];

        $begin_at = Carbon::parse($begin_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');
        $end_at = Carbon::parse($end_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');

        $this->builder->whereBetween($this->column('updated_at'), [$begin_at, $end_at]);
    }

    public function deleted_at($value)
    {
        $begin_at = $value[0];
        $end_at = $value[1];

        $begin_at = Carbon::parse($begin_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');
        $end_at = Carbon::parse($end_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');

        $this->builder->whereBetween($this->column('deleted_at'), [$begin_at, $end_at]);
    }

}
