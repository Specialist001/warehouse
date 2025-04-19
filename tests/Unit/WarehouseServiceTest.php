<?php

namespace Tests\Unit;

use Domains\Warehouse\Contracts\WarehouseInterface;
use Domains\Warehouse\Models\Warehouse;
use Domains\Warehouse\Services\WarehouseService;
use Domains\Warehouse\States\Status\WarehouseStatus;
use Illuminate\Support\Collection;
use Mockery;
use Tests\TestCase;

class WarehouseServiceTest extends TestCase
{
//    use DatabaseTransactions;

    public function tearDown(): void
    {
        Mockery::close(); // ВАЖНО очищать мок после каждого теста

        parent::tearDown();
    }

    public function test_get_active_warehouses_returns_expected_collection()
    {
        // Данные, которые должен вернуть мок
        $warehouses = collect([
            (object)['id' => 1, 'name' => 'Main', 'status' => 'active'],
            (object)['id' => 2, 'name' => 'Backup', 'status' => 'active'],
        ]);

        // Создаем мок интерфейса
        $mockRepository = Mockery::mock(WarehouseInterface::class);

        // Устанавливаем ожидания
        $mockRepository
            ->shouldReceive('getWhereStatus')
            ->once()
            ->with('active')
            ->andReturn($warehouses);

        // Передаем мок в сервис
        $service = new WarehouseService($mockRepository);

        // Вызываем метод
        $result = $service->getActiveWarehouses();

        // Проверяем
        $this->assertEquals($warehouses, $result);
        $this->assertInstanceOf(Collection::class, $result);
        $this->assertCount(2, $result);
        $this->assertEquals('Main', $result[0]->name);
    }

    public function test_get_active_warehouses_returns_expected_data()
    {
        // 1. Подготавливаем фейковые данные
        $fakeWarehouses = collect([
            (object)['id' => 1, 'name' => 'Main Warehouse'],
            (object)['id' => 2, 'name' => 'Backup Warehouse'],
        ]);

        // 2. Создаем мок репозитория
        $mockRepo = Mockery::mock(WarehouseInterface::class);
        $mockRepo->shouldReceive('getWhereStatus')
            ->once()
            ->with('active')
            ->andReturn($fakeWarehouses);

        // 3. Передаём мок в сервис
        $service = new WarehouseService($mockRepo);

        // 4. Запускаем и проверяем результат
        $result = $service->getActiveWarehouses();

        $this->assertEquals($fakeWarehouses, $result);
    }

    public function test_create_returns_created_warehouse()
    {
        $data = [
            'name' => 'New Warehouse',
            'location' => 'Tashkent',
            'status' => WarehouseStatus::active()->value,
        ];

        $warehouse = new Warehouse();
        $warehouse->id = 1;
        $warehouse->name = $data['name'];
        $warehouse->location = $data['location'];
        $warehouse->status = $data['status'];

        // Мокаем репозиторий
        $mockRepository = Mockery::mock(WarehouseInterface::class);
        $mockRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($warehouse);

        // Создаем сервис
        $service = new WarehouseService($mockRepository);

        // Проверяем
        $result = $service->create($data);

        $this->assertEquals($warehouse->name, $result->name);
        $this->assertEquals('Tashkent', $result->location);
        $this->assertEquals('active', $result->status);
    }

    public function test_update_returns_true_when_successful()
    {
        $id = 1;
        $data = [
            'name' => 'Updated Warehouse',
            'location' => 'Tashkent',
            'status' => WarehouseStatus::active()->value,
        ];

        $mockRepository = Mockery::mock(WarehouseInterface::class);
        $mockRepository
            ->shouldReceive('update')
            ->once()
            ->with($id, $data)
            ->andReturn(true);

        $service = new WarehouseService($mockRepository);

        $result = $service->update($id, $data);
        $this->assertTrue($result);
    }

    public function test_delete_returns_true_when_successful()
    {
        $id = 1;

        $mockRepository = Mockery::mock(WarehouseInterface::class);
        $mockRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $service = new WarehouseService($mockRepository);

        $this->assertTrue($service->delete($id));
    }

    public function test_delete_throws_exception_on_failure()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Failed to delete warehouse');

        $id = 1;

        $mockRepository = Mockery::mock(WarehouseInterface::class);
        $mockRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andThrow(new \Exception('Failed to delete warehouse'));

        $service = new WarehouseService($mockRepository);

        $service->delete($id);
    }
}
