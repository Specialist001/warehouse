<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Category\Models\Category;
use Domains\Product\Models\Product;
use Domains\Product\Services\ProductService;
use Domains\Product\Resources\ProductResource;
use Domains\Warehouse\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowController extends \App\Http\Controllers\Controller
{
    public function __construct(protected ProductService $productService)
    {
        $this->middleware('permission:Product List', ['only' => ['__invoke']]);
    }

    public function __invoke(string $product_id, Request $request)
    {
        $product = $this->productService->oneWithTrashed($product_id);
        if (!$product) {
            abort(404);
        }

        $product->load(['categories', 'warehouse']);

        $warehouses = Warehouse::pluck('name', 'id');
        $categories = Category::pluck('name', 'id');

        return Inertia::render('Admin/Product/Show', [
            'title'       => __('app.label.product') . ' - ' . $product->id,
            'product'     => ProductResource::make($product),
            'warehouses'  => $warehouses,
            'categories'  => $categories,
            'breadcrumbs' => [
                ['label' => __('app.label.products'), 'href' => route('admin.product.index')],
            ],
        ]);
    }
}
