<?php

namespace App\Http\Controllers\Admin\Category;

use Domains\Category\Models\Category;
use Domains\Category\Requests\CategoryIndexRequest;
use Domains\Category\Filters\CategoryFilter;
use Domains\Category\Resources\CategoryResource;
use Domains\Category\Services\CategoryService;
use Domains\Warehouse\Models\Warehouse;
use Inertia\Inertia;

class IndexController extends \App\Http\Controllers\Controller
{
    public function __construct(protected CategoryService $service)
    {
        $this->middleware('permission:Category List', ['only' => ['__invoke']]);
    }

    public function __invoke(CategoryIndexRequest $request)
    {
        $filter = new CategoryFilter($request);

        $categories = Category::filter($filter);

        if ($request->has(['field', 'order'])) {
            $categories->orderBy($request->field, $request->order);
        }

        $perPage = $request->has('perPage') ? $request->perPage : 20;

        $warehouses = Warehouse::pluck('name', 'id');

        return Inertia::render('Admin/Category/Index', [
            "title"       => __("app.label.categories"),
            'lang'        => app()->getLocale(),
            "filters"     => $filter->filters(),
            "perPage"     => (int)$perPage,
            'warehouses' => $warehouses,
            "categories"  => CategoryResource::collection($categories->paginateFilter($perPage)),
            "breadcrumbs" => [
                [
                    "label" => __("app.label.categories"),
                    "href"  => route('admin.category.index')
                ]
            ],
        ]);
    }
}
