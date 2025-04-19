<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Product\Factory\ProductDtoFactory;
use Domains\Product\Models\Product;
use Domains\Product\Requests\ProductUpdateRequest;
use Domains\Product\Services\ProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateController extends \App\Http\Controllers\Controller
{
    public function __construct(protected ProductService $service)
    {
        $this->middleware('permission:Product Update', ['only' => ['__invoke']]);
    }

    public function __invoke(Product $product, ProductUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $dto = ProductDtoFactory::fromRequest($request);

            $product = $this->service->update($product->id, $dto);
            DB::commit();

            return back()->with('success', __('app.label.updated_successfully', [
                    'param' => $product->name,
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();

            return back()->with(
                'error',
                __('app.label.updated_error', ['name' => __('app.label.products')]));
        }
    }
}
