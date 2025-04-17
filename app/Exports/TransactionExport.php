<?php

namespace App\Exports;

use AllowDynamicProperties;
use App\Services\FilterService\Filter;
use Domains\Transaction\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

#[AllowDynamicProperties] class TransactionExport implements
    FromCollection,
    WithHeadings,
    WithMapping,
    ShouldAutoSize,
    WithColumnWidths
{
    public function __construct(protected Filter $filter)
    {
    }

    public function collection()
    {
        $transactions = Transaction::filter($this->filter);
        $filters = $this->filter->filters();

        // if $filters has 'sort' key and prefix with '-' then order by desc, otherwise order by asc
        if (isset($filters['sort'])) {
            $direction = str_starts_with($filters['sort'], '-') ? 'desc' : 'asc';
            $transactions->orderBy(ltrim($filters['sort'], '-'), $direction);
        } else {
            $transactions->orderBy('created_at', 'desc');
        }

        $transactions->with([
            'product:id,name',
            'warehouse:id,name,deleted_at'
        ]);

        return $transactions->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            __('app.label.warehouse_id'),
            __('app.label.warehouse'),
            __('app.label.product_id'),
            __('app.label.product'),
            __('app.label.type'),
            __('app.label.quantity'),
            __('app.label.status'),
            __('app.transaction.is_internal_transfer'),
            __('app.transaction.source'),
            __('app.transaction.destination'),
            __('app.transaction.executor_id'),
            __('app.label.created_at'),
            __('app.label.updated_at'),
        ];
    }

    public function map($row): array
    {
        $transaction = $row;

        return [
            $transaction->id,
            $transaction->warehouse_id,
            optional($transaction->warehouse)->name ?? '—',
            $transaction->product_id,
            optional($transaction->product)->name ?? '—',
            __('app.transaction.type_' . $transaction->type . 'come'),
            $transaction->quantity,
            __('app.transaction.status_' . $transaction->status),
            $transaction->is_internal_transfer ? __('app.button.yes') : __('app.button.no'),
            $transaction->source,
            $transaction->destination,
            $transaction->executor_id,
            $transaction->created_at,
            $transaction->updated_at,
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 36,
            'B' => 36,
            'C' => 20,
            'D' => 36,
            'E' => 36,
            'G' => 11,
            'H' => 11,
            'I' => 10,
            'J' => 20,
            'K' => 20,
            'L' => 13,
            'M' => 18,
            'N' => 18,
        ];
    }
}
