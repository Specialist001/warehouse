<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\WarehouseProduct\Resources\WarehouseProductResource;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Http\Request;

class EditController extends Controller
{
    public function __construct(protected WarehouseProductService $warehouseProductService)
    {
        $this->middleware('permission:WarehouseProduct Update', ['only' => ['__invoke']]);
    }

    public function __invoke(string $warehouse_product_id, Request $request): \Illuminate\Http\JsonResponse
    {
        $warehouse_product = $this->warehouseProductService->one(id: $warehouse_product_id);
        if (!$warehouse_product) {
            abort(404);
        }
        $warehouse_product->load(['product', 'warehouse']);

        $resource = WarehouseProductResource::make($warehouse_product);

        return response()->json([
            'warehouse_product' => $resource,
            'success' => true,
        ]);
    }
}
