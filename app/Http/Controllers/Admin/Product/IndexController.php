<?php

namespace App\Http\Controllers\Admin\Product;

use Domains\Category\Models\Category;
use Domains\Product\Models\Product;
use Domains\Product\Requests\ProductIndexRequest;
use Domains\Product\Filters\ProductFilter;
use Domains\Product\Resources\ProductResource;
use Domains\Product\States\Unit\ProductUnit;
use Domains\Warehouse\Models\Warehouse;
use Inertia\Inertia;

class IndexController extends \App\Http\Controllers\Controller
{
    public function __construct()
    {
        $this->middleware('permission:Product List', ['only' => ['__invoke']]);
    }

    public function __invoke(ProductIndexRequest $request)
    {
        $filter = new ProductFilter($request);

        $products = Product::filter($filter);

        if ($request->has(['field', 'order'])) {
            $products->orderBy($request->field, $request->order);
        } else {
            $products->orderBy('created_at', 'desc');
        }

        // with categories
        $products->with('categories')->withTrashed();

        $perPage = $request->has('perPage') ? $request->perPage : 20;

        $warehouses = Warehouse::pluck('name', 'id');
        $categories = Category::pluck('name', 'id');

        $units = ProductUnit::toArray();

        return Inertia::render('Admin/Product/Index', [
            "title"       => __("app.label.products"),
            'lang'        => app()->getLocale(),
            "filters"     => $filter->filters(),
            "perPage"     => (int)$perPage,
            "products"    => ProductResource::collection($products->paginateFilter($perPage)),
            "units"       => $units,
            "warehouses"  => $warehouses,
            "categories"  => $categories,
            "breadcrumbs" => [
                [
                    "label" => __("app.label.products"),
                    "href"  => route('admin.product.index')
                ]
            ],
        ]);
    }
}
