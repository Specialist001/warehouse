<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\Transaction\Services\TransactionService;
use Domains\Transaction\States\Status\TransactionStatus;
use Domains\WarehouseProduct\Requests\WarehouseProductStoreRequest;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    public function __construct(
        protected WarehouseProductService $warehouseProductService,
        protected TransactionService $transactionService
    )
    {
        $this->middleware('permission:WarehouseProduct Create', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseProductStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            $warehouse_product = $this->warehouseProductService->create($data);

            $this->transactionService->income(
                warehouse_id: $warehouse_product->warehouse_id,
                product_id: $warehouse_product->product_id,
                executor_id: auth()->user()->id,
                quantity: $warehouse_product->quantity,
                source: $data['source'],
                status: TransactionStatus::completed()->value,
            );
            DB::commit();

            return back()->with('success', __('app.label.created_successfully', [
                    'param' => $warehouse_product->product->name
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
