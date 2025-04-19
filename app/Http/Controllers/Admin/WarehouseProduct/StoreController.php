<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\Transaction\Factory\TransactionDtoFactory;
use Domains\Transaction\Services\TransactionService;
use Domains\Transaction\States\Status\TransactionStatus;
use Domains\WarehouseProduct\Factory\WarehouseProductDtoFactory;
use Domains\WarehouseProduct\Requests\WarehouseProductStoreRequest;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    public function __construct(
        protected WarehouseProductService $warehouseProductService,
        protected TransactionService      $transactionService
    )
    {
        $this->middleware('permission:WarehouseProduct Create', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseProductStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $dto = WarehouseProductDtoFactory::fromRequest($request);

            $warehouse_product = $this->warehouseProductService->create($dto);

            $transactionDto = TransactionDtoFactory::incomeFromWarehouseProduct($dto);
            $this->transactionService->incomeProcess($transactionDto);

            DB::commit();

            return back()->with('success', __('app.label.created_successfully', [
                    'param' => $warehouse_product->product->name
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();

            return back()->with('error', __('app.label.created_error', [
                'param' => __('app.label.warehouse_products')
            ]));
        }
    }
}
