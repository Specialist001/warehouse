<?php

namespace Domains\Transaction\Filters;

use App\Services\FilterService\Filter;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TransactionFilter extends Filter
{
    protected array $available = [
        'id',
        'warehouse_id',
        'product_id',
        'product_name',
        'executor_id',
        'type',
        'quantity',
        'status',
        'is_internal_transfer',
        'source',
        'destination',
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

        parent::__construct($request);
    }

    protected function init()
    {
        $this->addSortable('id');
        $this->addSortable('warehouse_id');
        $this->addSortable('product_id');
        $this->addSortable('product_name');
        $this->addSortable('executor_id');
        $this->addSortable('type');
        $this->addSortable('quantity');
        $this->addSortable('status');
        $this->addSortable('is_internal_transfer');
        $this->addSortable('source');
        $this->addSortable('destination');
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
        $this->builder->whereHas('product', function ($query) use ($value) {
            $query->where('name', 'LIKE', "%$value%");
        });
    }

    public function executor_id($value)
    {
        $this->builder->where($this->column('executor_id'), '=', $value);
    }

    public function type($value)
    {
        $this->builder->where($this->column('type'), '=', $value);
    }

    public function quantity($value)
    {
        $this->builder->where($this->column('quantity'), '=', $value);
    }

    public function source($value)
    {
        $this->builder->where($this->column('source'), 'LIKE', "%$value%");
    }

    public function destination($value)
    {
        $this->builder->where($this->column('destination'), 'LIKE', "%$value%");
    }

    public function status($value)
    {
        if ($value !== "-1") {
            $this->builder->where($this->column('status'), '=', $value);
        }
    }

    public function is_internal_transfer($value)
    {
        $is_true = $value === '1';
        if ($value !== "-1") {
            $this->builder->where($this->column('is_internal_transfer'), '=', $is_true);
        }
    }

    public function created_at(array|string $value)
    {
        if (is_string($value)) {
            $value = explode(',', $value);
        }
        $begin_at = $value[0];
        $end_at = $value[1];

        $begin_at = Carbon::parse($begin_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');
        $end_at = Carbon::parse($end_at)->setTimezone($this->timezone)->format('Y-m-d H:i:s');

        $this->builder->whereBetween($this->column('created_at'), [$begin_at, $end_at]);
    }
}
