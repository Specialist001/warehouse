<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Support\Facades\DB;

class DeleteController extends Controller
{
    public function __construct(protected WarehouseProductService $warehouseProductService)
    {
        $this->middleware('permission:WarehouseProduct Delete', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseProduct $warehouse_product): \Illuminate\Http\RedirectResponse
    {
        $name = $warehouse_product->product->name;
        DB::beginTransaction();
        try {
            $this->warehouseProductService->delete(id: $warehouse_product->id);
            DB::commit();

            return back()->with('success', __('app.label.deleted_successfully', ['name' => $name]));
        } catch (\Throwable $th) {
            DB::rollback();
            return back()->with(
                'error',
                __('app.label.deleted_error',
                    [
                        'name' => $name,
                    ]
                ) . $th->getMessage()
            );
        }
    }
}
