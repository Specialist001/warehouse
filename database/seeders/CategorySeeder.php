<?php

namespace Database\Seeders;

use Domains\Category\Contracts\CategoryInterface;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function __construct(protected CategoryInterface $categoryRepository)
    {
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Elektronika', 'Oziq-ovqat', 'Kiyim-kechak', 'Mebel', 'Ofis maxsulotlari'];

        foreach ($categories as $key => $category) {
            $this->categoryRepository->create([
                'id' => Str::uuid(),
                'name' => [
                    'uz' => $category,
                    'en' => $category,
                    'ru' => $category
                ],
                'short_description' => [
                    'uz' => 'Bu bo\'limda ' . $category . ' maxsulotlari mavjud',
                    'en' => 'This section contains ' . $category . ' products',
                    'ru' => 'В этом разделе представлены товары ' . $category
                ],
                'is_active' => true,
                'order_num' => $key + 1
            ]);
        }
    }
}
