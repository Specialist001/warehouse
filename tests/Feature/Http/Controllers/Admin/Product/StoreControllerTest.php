<?php

namespace Tests\Feature\Http\Controllers\Admin\Product;

use App\Models\User;
use Domains\Category\Models\Category;
use Domains\Product\Models\Product;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class StoreControllerTest extends TestCase
{
    use DatabaseTransactions;

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

    public function test_product_is_stored_successfully()
    {
        $user = User::factory()->create();
        $user->assignRole('moderator');
        $this->actingAs($user);

        $category = Category::factory()->create();

        // Создаем тестовые данные
        $data = [
            'name' => [
                'uz' => 'Test Mahsulot',
                'en' => 'Test Product',
                'ru' => 'Тестовый продукт',
            ],
            'description' => [
                'uz' => 'Mahsulot tavsifi',
                'en' => 'Product Description',
                'ru' => 'Описание продукта',
            ],
            'sku'  => 'TEST--123',
            'price' => 2457,
            'barcode' => '12345678901234',
            'category_ids' => [$category->id],
        ];

        $response = $this->post(route('admin.product.store'), $data);
        Log::info('Response: ' . json_encode($response->content()));

        $response->assertRedirect(); // вернёт на back()

        $this->assertDatabaseHas('products', [
            'price' => 2457,
            'sku' => 'TEST--123',
        ]);

        $product = Product::where('price', 2457)->first();

        $this->assertEquals('Test Product', $product->getTranslation('name', 'en'));
        $this->assertEquals('Test Mahsulot', $product->getTranslation('name', 'uz'));
        $this->assertEquals('Тестовый продукт', $product->getTranslation('name', 'ru'));

        // Проверка связи с категорией
        $this->assertTrue($product->categories->contains($category));

        // Проверка сессии на success
        $response->assertSessionHas('success');
    }
}
