<?php

namespace App\Http\Controllers\Admin\Product;


use App\Services\EAN\OpenFoodFactsService;
use Illuminate\Http\Request;

class SearchInfoByEanController extends \App\Http\Controllers\Controller
{
    public function __construct()
    {
        $this->middleware('permission:Product List', ['only' => ['__invoke']]);
    }

    public function __invoke(string $barcode, Request $request)
    {
        $open_food_fact_service = new OpenFoodFactsService();

        $product_data = $open_food_fact_service->getProductMainData(barcode: $barcode);

        if ($product_data === null) {
            return response()->json([
                'message' => 'Product not found',
                'success' => false
            ]);
        }

        if ($product_data['status'] === 'failure') {
            return response()->json([
                'message' => 'Product not found',
                'product_data' => $product_data,
                'success' => false
            ]);
        }

        return response()->json([
            'product_data' => $product_data,
            'success' => true
        ]);

    }

}
