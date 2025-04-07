<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\WarehouseProduct\Resources\WarehouseProductResource;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowController extends Controller
{
    public function __construct(protected WarehouseProductService $warehouseProductService)
    {
        $this->middleware('permission:WarehouseProduct List', ['only' => ['__invoke']]);
    }

    public function __invoke(string $warehouse_id, Request $request): \Inertia\Response
    {
        $warehouse_product = $this->warehouseProductService->one($warehouse_id);
        if (!$warehouse_product) {
            abort(404);
        }
        $warehouse_product->load([
            'product:id,name,sku',
            'warehouse:id,name,code',
        ]);

        return Inertia::render('Admin/WarehouseProduct/Show', [
            'title'             => __('app.label.warehouse_products') . ' - ' . $warehouse_product->product->name,
            'warehouse_product' => WarehouseProductResource::make($warehouse_product),
            'breadcrumbs'       => [
                ['label' => __('app.label.warehouse_products'), 'href' => route('admin.warehouse_product.index')],
            ],
        ]);
    }
}
