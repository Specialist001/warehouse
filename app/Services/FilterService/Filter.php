<?php


namespace App\Services\FilterService;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class Filter
{
    protected Request $request;

    /**
     * @var Builder|\Illuminate\Database\Query\Builder
     */
    protected \Illuminate\Database\Query\Builder | Builder $builder;

    /**
     * @var string Текущая таблица
     */
    protected string $table;

    /**
     * Данные запроса - очищенные от пустых значений
     *
     * @var array
     */
    protected array $input;

    /**
     * Доступные фильтры
     *
     * @var array
     */
    protected array $available = [];

    /**
     * Фильтры по умолчанию
     *
     * @var array
     */
    protected array $defaults = [];

    /**
     * Поля доступные для поиска
     *
     * @var array
     */
    protected array $searchable = [];

    /**
     * Поля доступные для сортировки
     *
     * @var array
     */
    protected array $sortable = [];

    /**
     * Зарегистрированные джойны.
     *
     * @var array
     */
    protected array $joins = [];

    /**
     * Загруженные джойны.
     *
     * @var array
     */
    protected array $loadedJoins = [];

    /**
     * Метод для инициализации фильтра. Тут можно добавить join и т.д
     */
    protected function init()
    {

    }

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Применить фильтры к запросу
     *
     * @param Builder $builder
     * @return Builder|\Illuminate\Database\Query\Builder
     */
    public function apply(Builder $builder): Builder | \Illuminate\Database\Query\Builder
    {
        $this->builder = $builder;

        $this->table = $builder->getModel()->getTable();

        $this->init();

        $filters = $this->filters();

        foreach ($filters as $name => $value) {
            if ($this->isAvailableFilter($name) && method_exists($this, $name)) {
                if ($value !== '') $this->$name($value);
            }
        }

        return $this->builder;
    }

    /**
     * Получить фильтры
     *
     * @return array
     */
    public function filters(): array
    {
        return array_merge($this->defaults, $this->input);
    }

    /**
     * Получить значение фильтра
     *
     * @param $filterName
     * @param null $default
     * @return mixed|null
     */
    public function value($filterName, $default = null): mixed
    {
        if (isset($this->input[$filterName])) {
            return $this->input[$filterName];
        }

        if ($default) {
            return $default;
        }

        return null;
    }

    /**
     * Удаляет пустые и не разрешенные значение из запроса
     *
     * @param array $input
     * @return array
     */
    protected function prepareInput($input): array
    {
        $filterableInput = [];

        $input = $this->trimArray($input);

        foreach ($input as $key => $val) {
            if ($val !== '') {
                $filterableInput[$key] = $val;
            }
        }

        return $filterableInput;
    }


    /**
     * Проверяет доступность фильтра
     *
     * @param string $name
     * @return bool
     */
    protected function isAvailableFilter(string $name): bool
    {
        return in_array($name, $this->available);
    }


    /**
     * Возвращает очищеный от пробелов массив
     *
     * @param array $input
     * @return array
     */
    protected function trimArray(array $input): array
    {
        $result = [];

        foreach ($input as $key => $val) {
            if (is_array($val)) {
                $result[$key] = $this->trimArray($val);
            } else {
                $result[$key] = trim($val);
            }
        }

        return $result;
    }

    /**
     * Зарегистрировать Join
     *
     * @param $table
     * @param \Closure $closure
     */
    protected function addJoin($table, \Closure $closure): void
    {
        $this->joins[$table] = $closure;
    }

    /**
     * Применить Join
     *
     * @param $table
     */
    protected function loadJoin($table): void
    {
        if (!in_array($table, $this->loadedJoins)) {
            call_user_func($this->joins[$table]);
            array_push($this->loadedJoins, $table);
        }
    }

    /**
     * Получить название колонки вместе с таблицой.
     *
     * @param string $name
     * @param null $table
     * @return string
     */
    protected function column(string $name, $table = null): string
    {
        $table = $table ? $table : $this->table;

        if ($table != $this->table) {
            $this->loadJoin($table);
        }

        return $table.'.'.$name;
    }

    /**
     * @param $key
     * @return mixed
     */
    protected function sortableColumn($key): mixed
    {
        $column = $this->sortable[$key];
        $table = explode('.', $column)[0];

        if ($table != $this->table) {
            $this->loadJoin($table);
        }

        return $column;
    }

    /**
     * Добаляет поля доступные для сортировки
     *
     * @param $column
     * @param null $table
     * @param null $key
     */
    public function addSortable($column, $table = null, $key = null): void
    {
        $key = $key ?: $column;

        if ($table) {
            $this->sortable[$key] = $table.'.'.$column;
        } else {
            $this->sortable[$key] = $this->table.'.'.$column;
        }
    }

    /**
     * Получить массив полей доступных для сортировки
     *
     * @return array
     */
    public function getSortable(): array
    {
        return array_keys($this->sortable);
    }

    /**
     * Получить массив полей доступных для поиска
     *
     * @return array
     */
    public function getSearchable(): array
    {
        return $this->searchable;
    }

    /**
     * Проверят доступность поля для поиска
     *
     * @param string $key
     * @return bool
     */
    protected function isSearchable($key): bool
    {
        return array_key_exists($key, $this->searchable);
    }

    /**
     * Проверят доступность поля для сортировки
     *
     * @param $key
     * @return bool
     */
    protected function isSortable($key): bool
    {
        return array_key_exists($key, $this->sortable);
    }

    /**
     * Сортировка по определенному полю.
     *
     * @param $value
     * @param null $concat
     * @return Builder|\Illuminate\Database\Query\Builder
     */
    public function sort($value, $concat = null): Builder | \Illuminate\Database\Query\Builder
    {
        $firstChar = substr($value, 0, 1);
        if ($firstChar === '-') {
            $type = 'desc';
            $value = substr($value, 1);
        } else {
            $type = 'asc';
        }

        if($concat) {
            return $this->builder->orderBy($value, $type);
        } else if ($this->isSortable($value)) {
            return $this->builder->orderBy($this->sortableColumn($value), $type);
        }

        return $this->builder;
    }

    /**
     * Устанавливает количество элементов при пагинации.
     *
     * @param $value
     */
    public function perPage($value): void
    {
        if ($perPage = intval($value)) {
            $this->builder->getModel()->setPerPage($perPage);
        }
    }
}
