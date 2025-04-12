<?php

namespace App\Http\Controllers\Admin\Warehouse;

use App\Http\Controllers\Controller;
use Domains\Warehouse\Models\Warehouse;
use Domains\Warehouse\Services\WarehouseService;
use Illuminate\Support\Facades\DB;

class DeleteController extends Controller
{
    public function __construct(protected WarehouseService $warehouseService)
    {
        $this->middleware('permission:Warehouse Delete', ['only' => ['__invoke']]);
    }

    public function __invoke(Warehouse $warehouse): \Illuminate\Http\RedirectResponse
    {
        $name = $warehouse->name;
        DB::beginTransaction();
        try {
            $this->warehouseService->delete(id: $warehouse->id);
            DB::commit();

            return back()->with('success', __('app.label.deleted_successfully', ['param' => $name]));
        } catch (\Throwable $th) {
            DB::rollback();
            return back()->with(
                'error',
                __('app.label.deleted_error',
                    [
                        'name' => $name,
                    ]
                ) . $th->getMessage()
            );
        }
    }
}
