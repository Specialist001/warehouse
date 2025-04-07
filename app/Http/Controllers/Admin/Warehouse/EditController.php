<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;
use Domains\Warehouse\Resources\AdminWarehouseResource;
use Domains\Warehouse\Services\WarehouseService;
use Illuminate\Http\Request;

class EditController extends Controller
{
    public function __construct(protected WarehouseService $warehouseService)
    {
        $this->middleware('permission:Warehouse Update', ['only' => ['__invoke']]);
    }

    public function __invoke(string $warehouse_id, Request $request): \Illuminate\Http\JsonResponse
    {
        $warehouse = $this->warehouseService->oneWithTrashed(id: $warehouse_id);
        if (!$warehouse) {
            abort(404);
        }

        $resource = AdminWarehouseResource::make($warehouse);

        return response()->json([
            'warehouse' => $resource,
            'success' => true,
        ]);
    }
}
