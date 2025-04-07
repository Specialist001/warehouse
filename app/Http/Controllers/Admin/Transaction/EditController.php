<?php

namespace App\Http\Controllers\Admin\Transaction;

use App\Http\Controllers\Controller;
use Domains\Transaction\Resources\TransactionResource;
use Domains\Transaction\Services\TransactionService;
use Illuminate\Http\Request;

class EditController extends Controller
{
    public function __construct(protected TransactionService $transactionService)
    {
        $this->middleware('permission:Transaction Update', ['only' => ['__invoke']]);
    }

    public function __invoke(string $transaction_id, Request $request): \Illuminate\Http\JsonResponse
    {
        $transaction = $this->transactionService->oneWithTrashed(id: $transaction_id);
        if (!$transaction) {
            abort(404);
        }

        $resource = TransactionResource::make($transaction);

        return response()->json([
            'transaction' => $resource,
            'success' => true,
        ]);
    }
}
