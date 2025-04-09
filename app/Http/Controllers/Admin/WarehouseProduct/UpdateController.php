<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\Transaction\Services\TransactionService;
use Domains\Warehouse\Services\WarehouseService;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Requests\WarehouseProductUpdateRequest;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Support\Facades\DB;

class UpdateController extends Controller
{
    public function __construct(
        protected WarehouseProductService $warehouseProductService,
        protected TransactionService      $transactionService,
        protected WarehouseService        $warehouseService
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

            return back()->with('success', __('app.label.updated_successfully', [
                    'param' => $product_name,
                ])
            );
        } catch (\Throwable $th) {
            DB::rollback();
            return back()->with('error', __('app.label.updated_error', [
                    'param' => $product_name,
                ]) . $th->getMessage());
        }
    }
}
