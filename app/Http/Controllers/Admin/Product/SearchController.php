<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Product\Services\ProductService;
use Illuminate\Http\Request;

class SearchController extends \App\Http\Controllers\Controller
{
    public function __construct(protected ProductService $productService)
    {
        $this->middleware('permission:Product List', ['only' => ['__invoke']]);
        $this->middleware('permission:Product Update', ['only' => ['__invoke']]);
    }

    public function __invoke(Request $request)
    {
        $products = $this->productService->searchByProductName($request->search);

        return response()->json([
            'search_result' => $products,
            'success' => true
        ]);
    }
}
