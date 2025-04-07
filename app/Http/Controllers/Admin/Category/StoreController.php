<?php

namespace App\Http\Controllers\Admin\Category;

use Domains\Category\Requests\CategoryStoreRequest;
use Domains\Category\Services\CategoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreController extends \App\Http\Controllers\Controller
{
    public function __construct(protected CategoryService $service)
    {
        $this->middleware('permission:Category Create', ['only' => ['__invoke']]);
    }

    public function __invoke(CategoryStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            $category = $this->service->create($data);
            DB::commit();

            return back()->with('success', __('app.label.created_successfully', [
                    'id' => $category->id,
                ])
            );
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();

            return back()->with(
                'error',
                __('app.label.created_error', ['name' => __('app.label.categorys')]) . $th->getMessage()
            );
        }
    }
}
