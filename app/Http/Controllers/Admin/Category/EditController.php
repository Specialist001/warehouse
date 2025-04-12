<?php

namespace App\Http\Controllers\Admin\Category;

use Domains\Category\Models\Category;
use Domains\Category\Services\CategoryService;
use Domains\Category\Resources\CategoryResource;
use Illuminate\Http\Request;

class EditController extends \App\Http\Controllers\Controller
{
    public function __construct(protected CategoryService $service)
    {
        $this->middleware('permission:Category Update', ['only' => ['__invoke']]);
    }

    public function __invoke(string $category_id, Request $request): \Illuminate\Http\JsonResponse
    {
        $category = $this->service->one($category_id);
        if (!$category) {
            abort(404);
        }

        $resource = CategoryResource::make($category);

        return response()->json([
            'category' => $category,
            'success' => true
        ]);
    }
}
