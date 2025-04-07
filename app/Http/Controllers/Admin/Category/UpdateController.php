<?php

namespace App\Http\Controllers\Admin\Category;

use Domains\Category\Models\Category;use Domains\Category\Requests\CategoryStoreRequest;
use Domains\Category\Services\CategoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateController extends \App\Http\Controllers\Controller
{
    public function __construct(protected CategoryService $service)
    {
        $this->middleware('permission:Category Update', ['only' => ['__invoke']]);
    }

    public function __invoke(Category $category, CategoryStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            $category = $this->service->update($category->id, $data);
            DB::commit();

            return back()->with('success', __('app.label.updated_successfully', [
                    'id' => $category->id,
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();

            return back()->with(
                'error',
                __('app.label.updated_error', ['name' => __('app.label.category')]) . $th->getMessage()
            );
        }
    }
}
