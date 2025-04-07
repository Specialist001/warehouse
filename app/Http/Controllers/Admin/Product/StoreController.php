<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Product\Requests\ProductStoreRequest;
use Domains\Product\Services\ProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreController extends \App\Http\Controllers\Controller
{
    public function __construct(protected ProductService $service)
    {
        $this->middleware('permission:Product Create', ['only' => ['__invoke']]);
    }

    public function __invoke(ProductStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            $product = $this->service->create($data);

            if ($request->has('category_ids')) {
                $product->categories()->attach($request->category_ids);
            }

            DB::commit();

            return back()->with('success', __('app.label.created_successfully', [
                    'param' => $product->name,
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();

            return back()->with(
                'error',
                __('app.label.created_error', ['name' => __('app.label.products')]) . $th->getMessage()
            );
        }
    }
}
