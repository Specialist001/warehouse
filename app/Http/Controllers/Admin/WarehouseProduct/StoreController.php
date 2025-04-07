<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\WarehouseProduct\Requests\WarehouseProductStoreRequest;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    public function __construct(protected WarehouseProductService $warehouseProductService)
    {
        $this->middleware('permission:WarehouseProduct Create', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseProductStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            $warehouse = $this->warehouseProductService->create($data);
            DB::commit();

            return back()->with('success', __('app.label.created_successfully', [
                    'name' => $warehouse->product->name
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
