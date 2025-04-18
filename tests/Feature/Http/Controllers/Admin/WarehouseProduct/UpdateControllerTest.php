<?php

namespace Tests\Feature\Http\Controllers\Admin\WarehouseProduct;

use App\Http\Controllers\Admin\WarehouseProduct\UpdateController;
use App\Models\User;
use Domains\Product\Models\Product;
use Domains\Warehouse\Models\Warehouse;
use Domains\WarehouseProduct\Models\WarehouseProduct;
use Domains\WarehouseProduct\Requests\WarehouseProductUpdateRequest;
use Domains\WarehouseProduct\Services\WarehouseProductService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Mockery;
use Tests\TestCase;

class UpdateControllerTest extends TestCase
{
//    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        DB::beginTransaction();
    }

    public function tearDown(): void
    {
        DB::rollBack();

        parent::tearDown();
    }

    public function test_update_controller_successfully_updates_product(): void
    {
        $this->assertTrue(true);

        $warehouse = Warehouse::factory()->create();
        $product = Product::factory()->create();
        $user = User::factory()->create();
        $user->assignRole('moderator');
        $this->actingAs($user);

        // Создаем тестовые данные
        $warehouseProduct = WarehouseProduct::create([
            'product_id'   => $product->id,
            'warehouse_id' => $warehouse->id,
            'quantity'     => 10,
        ]);

        $request = new WarehouseProductUpdateRequest([
            'type'             => 'in',
            'receive_quantity' => 5,
            'source'           => 'Test Source',
            'warehouse_id'     => $warehouse->id,
            'product_id'       => $product->id,
        ]);

        // Чтобы validator прошёл (иначе данные не будут доступны)
        $request->setContainer(app())->validateResolved();

        // Мокаем сервис
        $mockService = $this->createMock(WarehouseProductService::class);
        $mockService->expects($this->once())
            ->method('processUpdate')
            ->with($warehouseProduct, $this->isInstanceOf(WarehouseProductUpdateRequest::class));

        // Создаем контроллер с внедрённым сервисом
        $controller = new UpdateController($mockService);

        // Симулируем авторизацию и флеш-сессию
        $this->actingAs(User::factory()->create());

        // Вызываем __invoke напрямую (без HTTP-запроса)
        $response = $controller($warehouseProduct, $request);

        // Проверяем, что произошёл редирект назад и добавлено сообщение
        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $response);
        $this->assertEquals(url()->previous(), $response->getTargetUrl());
        $this->assertEquals(session('success'), __('app.warehouse.income_successfully', [
            'product' => $product->name,
            'warehouse' => $warehouse->name,
        ]));
    }

    public function test_update_controller_handles_exception(): void
    {
        $this->assertTrue(true);

        $warehouse = Warehouse::factory()->create();
        $product = Product::factory()->create();

        $user = User::factory()->create();
        $user->assignRole('moderator');
        $this->actingAs($user);

        $warehouseProduct = WarehouseProduct::create([
            'product_id'   => $product->id,
            'warehouse_id' => $warehouse->id,
            'quantity'     => 10,
        ]);

        // Предположим, если передать слишком большое количество — сервис выбросит исключение
        $requestData = [
            'quantity'     => 99999999,
            'product_id'   => null, // Это может вызвать ошибку валидации
            'warehouse_id' => null,
            'type'         => null, // Это также может вызвать ошибку валидации
        ];

        $response = $this->from(route('admin.warehouse_product.edit', $warehouseProduct))
            ->put(route('admin.warehouse_product.update', $warehouseProduct), $requestData);

        // Проверяем редирект обратно на форму
        $response->assertRedirect(route('admin.warehouse_product.edit', $warehouseProduct));

        // Проверяем, что в сессии есть ошибка
        $response->assertSessionHasErrors();

        // Проверяем, что в сессии есть ошибки для обязательных полей
        $this->assertArrayHasKey('product_id', session('errors')->toArray());
        $this->assertArrayHasKey('warehouse_id', session('errors')->toArray());
        $this->assertArrayHasKey('type', session('errors')->toArray());

        // Проверка, что ошибки, связанные с полями, возвращаются правильно
        $errors = session('errors')->get('product_id');
        $this->assertEquals(["Maydon product id to'ldirilishi shart"], $errors);

        $errors = session('errors')->get('warehouse_id');
        $this->assertEquals(["Maydon Ombor to'ldirilishi shart"], $errors);

        $errors = session('errors')->get('type');
        $this->assertEquals(["Maydon type to'ldirilishi shart"], $errors);
    }
}
