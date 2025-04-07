<?php

namespace App\Http\Controllers\Admin\Transaction;

use App\Http\Controllers\Controller;
use Domains\Transaction\Models\Transaction;
use Domains\Transaction\Requests\TransactionUpdateRequest;
use Domains\Transaction\Services\TransactionService;
use Domains\Warehouse\Models\Warehouse;
use Domains\Warehouse\Services\WarehouseService;
use Illuminate\Support\Facades\DB;

class UpdateController extends Controller
{
    public function __construct(protected TransactionService $transactionService)
    {
        $this->middleware('permission:Transaction Update', ['only' => ['__invoke']]);
    }

    public function __invoke(Transaction $transaction, TransactionUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $transaction->update($request->validated());
            DB::commit();

            return back()->with('success', __('app.label.updated_successfully', [
                    'param' => $transaction->product->name,
                ])
            );
        } catch (\Throwable $th) {
            DB::rollback();
            return back()->with('error', __('app.label.updated_error', [
                    'param' => $transaction->product->name,
                ]) . $th->getMessage());
        }
    }
}
