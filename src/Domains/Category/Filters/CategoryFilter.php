<?php

namespace Domains\Category\Filters;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Services\FilterService\Filter;

class CategoryFilter extends Filter
{
    protected array $available = [
        'id',
        'name',
        'short_description',
        'is_active',
        'logo',
        'order_num',
        'created_at',
        'updated_at',
        'deleted_at',
        'sort', 'perPage',
    ];

    protected array $defaults = [
        'sort' => 'created_at',
    ];

    private string $timezone;

    public function __construct(Request $request)
    {
        $this->input = $this->prepareInput($request->all());
        $this->timezone = config('app.timezone', 'UTC');
    }

    protected function init()
    {
        $this->addSortable('id');
        $this->addSortable('name');
        $this->addSortable('short_description');
        $this->addSortable('is_active');
        $this->addSortable('logo');
        $this->addSortable('order_num');
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
        $this->builder->where($this->column('name'), 'ilike', "%$value%");
    }

    public function short_description($value)
    {
        $this->builder->where($this->column('short_description'), 'ilike', "%$value%");
    }

    public function is_active($value)
    {
        $is_true = $value === '1';
        if ($value !== "-1") {
            $this->builder->where($this->column('is_active'), '=', $is_true);
        }
    }

    public function logo($value)
    {
        $this->builder->where($this->column('logo'), 'ilike', "%$value%");
    }

    public function order_num($value)
    {
        $this->builder->where($this->column('order_num'), '=', $value);
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
