<?php

namespace Domains\Warehouse\Filters;

use App\Services\FilterService\Filter;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WarehouseFilter extends Filter
{
    protected array $available = [
        'id',
        'name',
        'location',
        'status',
        'created_at',
        'sort', 'perPage'
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
        $this->addSortable('location');
        $this->addSortable('status');
        $this->addSortable('created_at');
    }

    public function id($value)
    {
        $this->builder->where($this->column('id'), '=', $value);
    }

    public function name($value)
    {
        $this->builder->where($this->column('name'), $this->like_condition, "%$value%");
    }

    public function location($value)
    {
        $this->builder->where($this->column('location'), $this->like_condition, "%$value%");
    }

    public function status($value)
    {
        if ($value !== "-1") {
            $this->builder->where($this->column('status'), '=', $value);
        }
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
