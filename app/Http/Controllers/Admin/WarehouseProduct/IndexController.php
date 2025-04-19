<?php

namespace App\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Controller;
use Domains\Product\Models\Product;
use Domains\Warehouse\Models\Warehouse;
use Domains\WarehouseProduct\Filters\WarehouseProductFilter;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Requests\WarehouseProductIndexRequest;
use Domains\WarehouseProduct\Resources\WarehouseProductResource;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:WarehouseProduct List', ['only' => ['__invoke']]);
    }

    public function __invoke(WarehouseProductIndexRequest $request)
    {
        $filter = new WarehouseProductFilter($request);

        $warehouse_product = WarehouseProduct::filter($filter)->with([
            'product:id,name,unit',
            'warehouse:id,name,deleted_at',
        ]);

        if ($request->has(['field', 'order'])) {
            $warehouse_product->orderBy($request->field, $request->order);
        } else {
            $warehouse_product->orderBy('created_at', 'desc');
        }

        $perPage = $request->has('perPage') ? $request->perPage : 20;

        $warehouses = Warehouse::pluck('name', 'id');
        $products = Product::pluck('name', 'id');

        return Inertia::render("Admin/WarehouseProduct/Index", [
            "title"              => __("app.label.warehouse_products"),
            "lang"               => app()->getLocale(),
            "filters"            => $filter->filters(),
            "perPage"            => (int)$perPage,
            "warehouse_products" => WarehouseProductResource::collection($warehouse_product->paginateFilter($perPage)),
            "warehouses"         => $warehouses,
            "products"           => $products,
            "breadcrumbs"        => [
                [
                    "label" => __("app.label.warehouse_products"),
                    "href"  => route("admin.warehouse_product.index")
                ]
            ],
        ]);
    }
}
