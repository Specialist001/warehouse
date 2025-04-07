<?php

namespace App\Http\Controllers\Admin\Category;

use Domains\Category\Models\Category;
use Domains\Category\Services\CategoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeleteController extends \App\Http\Controllers\Controller
{
    public function __construct(protected CategoryService $service)
    {
        $this->middleware('permission:Category Delete', ['only' => ['__invoke']]);
    }

    public function __invoke(Category $category): \Illuminate\Http\RedirectResponse
    {
        $id = $category->id;

        DB::beginTransaction();
        try {
            $this->service->delete($id);
            DB::commit();

            return back()->with('success', __('app.label.deleted_successfully', ['name' => $id]));
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            DB::rollback();
            return back()->with(
                'error',
                __('app.label.deleted_error', ['name' => $id]) . $th->getMessage()
            );
        }
    }
}
