<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;
use Domains\Warehouse\Services\WarehouseService;
use Domains\Warehouse\Requests\TransactionUpdateRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    public function __construct(protected WarehouseService $warehouseService)
    {
        $this->middleware('permission:Warehouse Create', ['only' => ['__invoke']]);
    }

    public function __invoke(TransactionUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            $warehouse = $this->warehouseService->create($data);
            DB::commit();

            return back()->with('success', __('app.label.created_successfully', [
                    'name' => $warehouse->name
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();
            return back()->with(
                'error',
                __('app.label.created_error', ['name' => __('app.label.warehouses')]) . $th->getMessage()
            );
        }
    }
}
