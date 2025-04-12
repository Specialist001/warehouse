<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Product\Models\Product;
use Domains\Product\Services\ProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeleteController extends \App\Http\Controllers\Controller
{
    public function __construct(protected ProductService $service)
    {
        $this->middleware('permission:Product Delete', ['only' => ['__invoke']]);
    }

    public function __invoke(Product $product): \Illuminate\Http\RedirectResponse
    {
        $id = $product->id;
        $name = $product->name;

        DB::beginTransaction();
        try {
            $this->service->delete($id);
            DB::commit();

            return back()->with('success', __('app.label.deleted_successfully', ['param' => $name]));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();
            return back()->with(
                'error',
                __('app.label.deleted_error', ['param' => $name]) . $th->getMessage()
            );
        }
    }
}
