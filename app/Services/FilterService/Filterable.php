<?php

namespace App\Services\FilterService;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Builder;

trait Filterable {

    /**
     * @var Filter|null
     */
    protected ?Filter $filters;

    /**
     * Подготовленный запрос для фильрации
     *
     * @param $query Builder
     * @param Filter|null $filters
     * @return Builder
     */
    public function scopeFilter(Builder $query, ?Filter $filters): Builder
    {
        $this->filters = $filters;

        return $filters->apply($query);
    }

    /**
     * Добавляет к пагинации параметры фильтров
     *
     * @param Builder $query
     * @param int $perPage
     * @param array|string $columns
     * @param string $pageName
     * @param int|null $page
     * @return LengthAwarePaginator
     */
    public function scopePaginateFilter(Builder $query, int $perPage = 20, array|string $columns = ['*'], string $pageName = 'page', int|null $page = null): LengthAwarePaginator
    {
        $paginator = $query->paginate($perPage, $columns, $pageName, $page);

        if ($this->filters !== null) {
            $paginator->appends($this->filters->filters());
        }

        return $paginator;
    }

    /**
     * Добавляет к пагинации параметры фильтров
     *
     * @param Builder $query
     * @param int $perPage
     * @return Paginator
     */
    public function scopeSimplePaginateFilter(Builder $query, int $perPage = 20/*, $columns = ['*'], $pageName = 'page'*/): \Illuminate\Contracts\Pagination\Paginator
    {
        $paginator = $query->simplePaginate($perPage/*, $columns, $pageName*/);

        if ($this->filters !== null) {
            $paginator->appends($this->filters->filters());
        }

        return $paginator;
    }
}
