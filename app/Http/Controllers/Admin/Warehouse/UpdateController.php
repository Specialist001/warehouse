<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;
use Domains\Warehouse\Models\Warehouse;
use Domains\Warehouse\Services\WarehouseService;
use Domains\Warehouse\Requests\WarehouseStoreRequest;
use Illuminate\Support\Facades\DB;

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
            $warehouse->update($request->validated());
            DB::commit();

            return back()->with('success', __('app.label.updated_successfully', [
                    'param' => $warehouse->name,
                ])
            );
        } catch (\Throwable $th) {
            DB::rollback();
            return back()->with('error', __('app.label.updated_error', [
                    'param' => $warehouse->name,
                ]) . $th->getMessage());
        }
    }
}
