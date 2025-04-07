<?php

namespace App\Http\Controllers\Admin\Category;

use Domains\Category\Models\Category;
use Domains\Category\Services\CategoryService;
use Domains\Category\Resources\CategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowController extends \App\Http\Controllers\Controller
{
    public function __construct(protected CategoryService $categoryService)
    {
        $this->middleware('permission:Category List', ['only' => ['__invoke']]);
    }

    public function __invoke(Category $category, Request $request): \Inertia\Response
    {
        return Inertia::render('Admin/Category/Show', [
            'title'       => __('app.label.category') . ' - ' . $category->id,
            'category'  => CategoryResource::make($category),
            'breadcrumbs' => [
                ['label' => __('app.label.categories'), 'href' => route('admin.category.index')],
            ],
        ]);
    }
}
