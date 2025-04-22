<?php

namespace App\Http\Controllers\Admin\Transaction;

use App\Http\Controllers\Controller;
use Domains\Transaction\Resources\TransactionResource;
use Domains\Transaction\Services\TransactionService;
use Domains\Transaction\States\Status\TransactionStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowController extends Controller
{
    public function __construct(protected TransactionService $transactionService)
    {
        $this->middleware('permission:Transaction List', ['only' => ['__invoke']]);
    }

    public function __invoke(string $warehouse_id, Request $request): \Inertia\Response
    {
        $transaction = $this->transactionService->oneWithTrashed($warehouse_id);
        if (!$transaction) {
            abort(404);
        }

        return Inertia::render('Admin/Transaction/Show', [
            'title'       => __('app.label.transactions') . ' - ' . $transaction->id,
            'transaction'   => TransactionResource::make($transaction),
            'status_list' => TransactionStatus::toArray(),
            'breadcrumbs' => [
                ['label' => __('app.label.transactions'), 'href' => route('admin.transaction.index')],
            ],
        ]);
    }
}
