<?php

namespace App\Http\Controllers\Admin\Transaction;

use App\Exports\TransactionExport;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Domains\Transaction\Filters\TransactionFilter;
use Domains\Transaction\Requests\TransactionIndexRequest;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:Transaction List', ['only' => ['__invoke']]);
    }

    public function __invoke(TransactionIndexRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        $filter = new TransactionFilter($request);
        $file_type = $request->input('file_type', 'Xlsx');

        $supported_types = [
            \Maatwebsite\Excel\Excel::XLSX,
            \Maatwebsite\Excel\Excel::CSV,
            \Maatwebsite\Excel\Excel::XLS,
            \Maatwebsite\Excel\Excel::HTML,
        ];

        if (!in_array($file_type, $supported_types)) {
            $file_type = \Maatwebsite\Excel\Excel::XLSX;
        }

        $file_name = 'transactions_' . Carbon::now()->format('Y-m-d_H-i-s') . '.' . strtolower($file_type);

        return Excel::download(
            export: new TransactionExport($filter),
            fileName: $file_name,
            writerType: $file_type
        );
    }
}
