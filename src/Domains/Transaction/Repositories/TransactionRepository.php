<?php

namespace Domains\Transaction\Repositories;

use Domains\Transaction\Models\Transaction;
use Illuminate\Support\Facades\DB;

class TransactionRepository
{
    public function get(string $id)
    {
        return Transaction::find($id);
    }

    public function getWithTrashed(string $id)
    {
        return Transaction::withTrashed()->find($id);
    }

    public function getAll($pagination = 15)
    {
        return Transaction::paginate($pagination);
    }

    public function createTransaction(array $data): Transaction|bool
    {
        return DB::transaction(function () use ($data) {
            return Transaction::create($data);
        });
    }

}
