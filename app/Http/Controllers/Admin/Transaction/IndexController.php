<?php

namespace App\Http\Controllers\Admin\Transaction;

use App\Http\Controllers\Controller;

use Domains\Transaction\Filters\TransactionFilter;
use Domains\Transaction\Models\Transaction;
use Domains\Transaction\Requests\TransactionIndexRequest;
use Domains\Transaction\Resources\TransactionResource;
use Domains\Transaction\States\Status\TransactionStatus;
use Domains\Warehouse\Models\Warehouse;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:Transaction List', ['only' => ['__invoke']]);
    }

    public function __invoke(TransactionIndexRequest $request): \Inertia\Response
    {
        $filter = new TransactionFilter($request);

        $transactions = Transaction::filter($filter);

        if ($request->has(['field', 'order'])) {
            $transactions->orderBy($request->field, $request->order);
        } else {
            $transactions->orderBy('created_at', 'desc');
        }

        $perPage = $request->has('perPage') ? $request->perPage : 20;
        $transactions->with([
            'product:id,name,unit',
            'warehouse:id,name,deleted_at'
        ]);

        $statuses = TransactionStatus::toArray();
        $warehouses = Warehouse::pluck('name', 'id');

        return Inertia::render("Admin/Transaction/Index", [
            "title"        => __("app.label.transactions"),
            "lang"         => app()->getLocale(),
            "filters"      => $filter->filters(),
            "perPage"      => (int)$perPage,
            "transactions" => TransactionResource::collection($transactions->paginateFilter($perPage)),
            "status_list"  => $statuses,
            "warehouses"   => $warehouses,
            "breadcrumbs"  => [
                [
                    "label" => __("app.label.transactions"),
                    "href"  => route("admin.transaction.index")
                ]
            ],
        ]);
    }
}
