<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;
use Domains\Warehouse\Resources\AdminWarehouseResource;
use Domains\Warehouse\Services\WarehouseService;
use Domains\Warehouse\States\Status\WarehouseStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowController extends Controller
{
    public function __construct(protected WarehouseService $warehouseService)
    {
        $this->middleware('permission:Warehouse List', ['only' => ['__invoke']]);
    }

    public function __invoke(string $warehouse_id, Request $request): \Inertia\Response
    {
        $warehouse = $this->warehouseService->oneWithTrashed($warehouse_id);
        if (!$warehouse) {
            abort(404);
        }

        return Inertia::render('Admin/Warehouse/Show', [
            'title'       => __('app.label.warehouses') . ' - ' . $warehouse->name,
            'warehouse'   => AdminWarehouseResource::make($warehouse),
            'status_list' => WarehouseStatus::toArray(),
            'breadcrumbs' => [
                ['label' => __('app.label.warehouses'), 'href' => route('admin.warehouse.index')],
            ],
        ]);
    }
}
