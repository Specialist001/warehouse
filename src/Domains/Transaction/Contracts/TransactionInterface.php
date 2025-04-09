<?php

namespace Domains\Transaction\Contracts;


interface TransactionInterface
{
    public function get(string $id): \Domains\Transaction\Models\Transaction | null;

    public function getWithTrashed(string $id): \Domains\Transaction\Models\Transaction | null;

    public function getAll($pagination = 15);

    public function createTransaction(array $data): \Domains\Transaction\Models\Transaction | bool;
}
