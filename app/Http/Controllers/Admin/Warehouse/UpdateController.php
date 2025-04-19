<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;
use Domains\Warehouse\Factory\WarehouseDtoFactory;
use Domains\Warehouse\Models\Warehouse;
use Domains\Warehouse\Services\WarehouseService;
use Domains\Warehouse\Requests\WarehouseStoreRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateController extends Controller
{
    public function __construct(protected WarehouseService $warehouseService)
    {
        $this->middleware('permission:Warehouse Update', ['only' => ['__invoke']]);
    }

    public function __invoke(Warehouse $warehouse, WarehouseStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $dto = WarehouseDtoFactory::formRequest($request);
            $this->warehouseService->update($warehouse->id, $dto);
            DB::commit();

            return back()->with('success', __('app.label.updated_successfully', [
                    'param' => $warehouse->name,
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();

            return back()->with('error', __('app.label.updated_error', [
                    'param' => $warehouse->name,
                ]));
        }
    }
}
