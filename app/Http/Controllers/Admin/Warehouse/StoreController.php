<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;
use Domains\Warehouse\Factory\WarehouseDtoFactory;
use Domains\Warehouse\Services\WarehouseService;
use Domains\Warehouse\Requests\WarehouseStoreRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    public function __construct(protected WarehouseService $warehouseService)
    {
        $this->middleware('permission:Warehouse Create', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $dto = WarehouseDtoFactory::formRequest($request);

            $warehouse = $this->warehouseService->create($dto);
            DB::commit();

            return back()->with('success', __('app.label.created_successfully', [
                    'param' => $warehouse->name
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();

            return back()->with('error', __('app.label.created_error', [
                'param' => __('app.label.warehouses')
            ]));
        }
    }
}
