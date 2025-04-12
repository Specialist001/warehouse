<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Category\Models\Category;
use Domains\Product\Services\ProductService;
use Domains\Product\Resources\ProductResource;
use Illuminate\Http\Request;

class EditController extends \App\Http\Controllers\Controller
{
    public function __construct(protected ProductService $service)
    {
        $this->middleware('permission:Product Update', ['only' => ['__invoke']]);
    }

    public function __invoke(string $product_id, Request $request): \Illuminate\Http\JsonResponse
    {
        $product = $this->service->oneWithTrashed($product_id);
        if (!$product) {
            abort(404);
        }

        $product->category_ids = $product->categories->map(function ($category) {
            return [
                'label' => $category->name,
                'value' => $category->id,
            ];
        });

        $resource = ProductResource::make($product);
        $categories = Category::pluck('name', 'id');

        return response()->json([
            'product' => $product,
            'categories' => $categories,
            'success' => true
        ]);
    }
}
