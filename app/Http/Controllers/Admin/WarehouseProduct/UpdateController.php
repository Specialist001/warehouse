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
            if ($request->type == 'in') {
                $request->only(['receive_quantity', 'source']);

                $warehouse_product->increment('quantity', $request->receive_quantity);

                $this->transactionService->income(
                    warehouse_id: $warehouse_product->warehouse_id,
                    product_id: $warehouse_product->product_id,
                    executor_id: auth()->user()->id,
                    quantity: $request->receive_quantity,
                    source: $request->source
                );

            } elseif ($request->type == 'out') {
                if ($request->is_internal_transfer) {
                    $source_warehouse = $this->warehouseService->one(id: $warehouse_product->warehouse_id);
                    $destination_warehouse = $this->warehouseService->one(id: $request->destination);

                    // create or update the warehouse product in the destination warehouse
                    $this->warehouseProductService->updateOrCreateProduct(
                        warehouse_id: $request->destination,
                        product_id: $warehouse_product->product_id,
                        quantity: $request->send_quantity,
                    );

                    $this->transactionService->transferBetweenWarehouses(
                        source: $source_warehouse,
                        destination: $destination_warehouse,
                        product: $warehouse_product->product,
                        quantity: $request->send_quantity,
                        executor_id: auth()->user()->id,
                    );
                } else {
                    $this->transactionService->outcome(
                        warehouse_id: $warehouse_product->warehouse_id,
                        product_id: $warehouse_product->product_id,
                        executor_id: auth()->user()->id,
                        quantity: $request->send_quantity,
                        destination: $request->destination
                    );
                }

                // if warehouse product quantity is 0, remove it, else update it
                if ($warehouse_product->quantity - $request->send_quantity <= 0) {
                    $this->warehouseProductService->delete(id: $warehouse_product->id);
                } else {
                    // update the warehouse product quantity
                    $warehouse_product->decrement('quantity', $request->send_quantity);
//                    $this->warehouseProductService->update(
//                        id: $warehouse_product->id,
//                        data: [
//                            'quantity' => $warehouse_product->quantity - $request->send_quantity,
//                        ]
//                    );
                }
            }

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
