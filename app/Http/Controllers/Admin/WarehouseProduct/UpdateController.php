<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Requests\WarehouseProductUpdateRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateController extends Controller
{
    public function __construct(
        protected WarehouseProductService $warehouseProductService,
    )
    {
        $this->middleware('permission:WarehouseProduct Update', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseProduct $warehouse_product, WarehouseProductUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        $product_name = $warehouse_product->product->name;

        try {
            $this->warehouseProductService->processUpdate($warehouse_product, $request);

            DB::commit();

            $message = __('app.label.updated_successfully', [
                'param' => $product_name,
            ]);

            if ($request->type === 'in') {
                $message = __('app.warehouse.income_successfully', [
                    'product'   => $product_name,
                    'warehouse' => $warehouse_product->warehouse->name,
                ]);
            } elseif ($request->type === 'out') {
                $message = __('app.warehouse.outcome_successfully', [
                    'product'   => $product_name,
                    'warehouse' => $warehouse_product->warehouse->name,
                ]);
            }

            return back()->with('success', $message);
        } catch (\Throwable $th) {
            DB::rollback();

            Log::error('WarehouseProduct Update Error', [
                'product_id' => $warehouse_product->id,
                'error'      => $th->getMessage(),
            ]);

            return back()->with('error', __('app.label.updated_error', [
                'param' => $product_name,
            ]));
        }


    }
}
