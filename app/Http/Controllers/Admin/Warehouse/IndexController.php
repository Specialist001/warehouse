<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;

use Domains\Warehouse\Filters\WarehouseFilter;
use Domains\Warehouse\Models\Warehouse;
use Domains\Warehouse\Requests\WarehouseIndexRequest;
use Domains\Warehouse\Resources\AdminWarehouseResource;
use Domains\Warehouse\States\Status\WarehouseStatus;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:Warehouse List', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseIndexRequest $request)
    {
        $filter = new WarehouseFilter($request);

        $warehouses = Warehouse::filter($filter);

        if ($request->has(['field', 'order'])) {
            $warehouses->orderBy($request->field, $request->order);
        } else {
            $warehouses->orderBy('created_at', 'desc');
        }

        $perPage = $request->has('perPage') ? $request->perPage : 20;

        $statuses = WarehouseStatus::toArray();

        return Inertia::render("Admin/Warehouse/Index", [
            "title"       => __("app.label.warehouses"),
            "lang"        => app()->getLocale(),
            "filters"     => $filter->filters(),
            "perPage"     => (int)$perPage,
            "warehouses" => AdminWarehouseResource::collection($warehouses->paginateFilter($perPage)),
            "status_list" => $statuses,
            "breadcrumbs" => [
                [
                    "label" => __("app.label.warehouses"),
                    "href"  => route("admin.warehouse.index")
                ]
            ],
        ]);
    }
}
