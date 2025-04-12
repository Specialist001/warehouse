<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Product\Models\Product;
use Domains\Product\Services\ProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RecoveryController extends \App\Http\Controllers\Controller
{
    public function __construct(protected ProductService $service)
    {
        $this->middleware('permission:Product Update', ['only' => ['__invoke']]);
    }

    public function __invoke(string $product_id): \Illuminate\Http\RedirectResponse
    {
        $product = $this->service->oneWithTrashed($product_id);
        if (!$product) {
            abort(404);
        }

        DB::beginTransaction();
        try {
            $this->service->restore(id: $product_id);
            DB::commit();

            return back()->with('success', __('app.label.restored_successfully', ['param' => $product->name]));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();
            return back()->with(
                'error',
                __('app.label.restored_error', ['param' => $product->name]) . $th->getMessage()
            );
        }
    }
}
