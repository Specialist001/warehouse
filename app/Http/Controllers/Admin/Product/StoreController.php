<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Product\Factory\ProductDtoFactory;
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
            $dto = ProductDtoFactory::fromRequest($request);

            $product = $this->service->create($dto);

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
                __('app.label.created_error', ['name' => __('app.label.products')]));
        }
    }
}
