<?php

namespace Database\Seeders;

use AllowDynamicProperties;
use App\Models\User;
use App\Services\RestaurantFaker;
use Domains\Category\Services\CategoryService;
use Domains\Product\Services\ProductService;
use Domains\Restaurant\Services\WarehouseService;
use Domains\Restaurant\States\Status\WarehouseStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

#[AllowDynamicProperties] class FillSiteSeeder extends Seeder
{
    public function __construct(
        protected WarehouseService $restaurantService,
        protected CategoryService  $categoryService,
        protected ProductService   $dishService
    )
    {
        $this->faker = \Faker\Factory::create();
        $this->faker->addProvider(new RestaurantFaker($this->faker));
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users_count = 1;
        $restaurants_count = 2;
        $categories = [
            ['uz' => 'Salatlar', 'en' => 'Salads', 'ru' => 'Салаты'],
            ['uz' => 'Shirinliklar', 'en' => 'Desserts', 'ru' => 'Десерты'],
            ['uz' => 'Ichimliklar', 'en' => 'Drinks', 'ru' => 'Напитки'],
            ['uz' => 'Fast-Fud', 'en' => 'Fast Food', 'ru' => 'Фастфуд'],
            ['uz' => 'Osh', 'en' => 'Palov', 'ru' => 'Плов'],
            ['uz' => 'Shashlik', 'en' => 'Shashlik', 'ru' => 'Шашлык'],
            ['uz' => 'Pitsa', 'en' => 'Pizza', 'ru' => 'Пицца'],
            ['uz' => 'Kabob', 'en' => 'Kebab', 'ru' => 'Кебаб'],
        ];
        $dishes_count = 3;

        for ($i = 0; $i < $users_count; $i++) {
            $user = User::factory()->create();
            echo "User created: " . $user->email . "\n";

            for ($j = 0; $j < $restaurants_count; $j++) {
                $restaurant = $this->makeRestaurant($user);
                echo "Warehouse created: " . $restaurant->name . "\n";

                foreach ($categories as $category_name) {
                    $category = $this->makeCategory(restaurant: $restaurant, user: $user, names: $category_name);
                    echo "Category created: " . $category->id . "\n";

                    for ($l = 0; $l < $dishes_count; $l++) {
                        $dish = $this->makeDish($restaurant, $category, $category_name['en']);
                        echo "Dish created: " . $dish->id . "\n";
                    }
                }
            }
        }
    }

    private function makeRestaurant($user)
    {
        $name = $this->faker->company();
        $token =
            // generate 10 length numbers
            $this->faker->numerify('##########') . ":" .
            // generate 34 length characters
            $this->faker->regexify('[A-Za-z]{34}');

        $image_service = new \App\Services\AI\PollinationsAIService();
        $logo = $image_service->generateImageUrl(
            prompt: 'Logo of restaurant: ' . $name,
            path: $user->id . '/restaurant_logos',
            width: 300,
            height: 300
        );

        $params = [
            'name'          => $name,
            'phone'         => $this->faker->phoneNumber(),
            'owner_user_id' => $user->id,
            'slug'          => \Illuminate\Support\Str::slug($name),
            'bot_token'     => $token,
            'bot_username'  => $this->faker->word(),
            'webhook_url'   => $this->faker->url(),
            'address'       => $this->faker->address(),
            'logo_url'      => $logo,
            'is_active'     => $this->faker->boolean(),
            'status'        => $this->faker->randomElement([WarehouseStatus::Creating(), WarehouseStatus::Opened(), WarehouseStatus::Closed(), WarehouseStatus::Banned(), WarehouseStatus::Deleted()]),
        ];

        return $this->restaurantService->create($params);
    }

    private function makeCategory($restaurant, $user, array $names)
    {
        $prompt = "A modern and minimalistic logo icon representing {$names['en']}, " .
            "featuring a stylish and clear design. The logo should include a visually recognizable element. " .
            "The color scheme should be warm and appetizing, using shades like deep red, orange, and brown. " .
            "The style should be clean and scalable, suitable for mobile apps and websites. No text, just a symbolic representation.";
        $image_service = new \App\Services\AI\PollinationsAIService();
        $logo = $image_service->generateImageUrl(
            prompt: $prompt,
            path: $user->id . '/category_logos',
            width: 400,
            height: 400
        );

        $params = [
            'restaurant_id' => $restaurant->id,
            // name and short_description are translatable
            'name' => $names,
            'short_description' => [
                'uz' => $this->faker->sentence(30),
                'en' => $this->faker->sentence(30),
                'ru' => $this->faker->sentence(30)
            ],
            'logo' => $logo,
        ];

        return $this->categoryService->create($params);
    }

    private function makeDish($restaurant, $category, string $category_name)
    {
        $food_name = match ($category_name) {
            'Salads' => $this->faker->saladName(),
            'Desserts' => $this->faker->dessertName(),
            'Drinks' => $this->faker->beverageName(),
            'Fast Food' => $this->faker->fastFoodName(),
            'Palov' => $this->faker->palovName(),
            'Shashlik' => $this->faker->shashlikName(),
            'Pizza' => $this->faker->pizzaName(),
            'Kebab' => $this->faker->kebabName(),
            default => $this->faker->foodName(),
        };

        $prompt = 'Hyper-realistic photo of a ' . $food_name;
        $path = $restaurant->owner_user_id . '/dishes';

        $image_service = new \App\Services\AI\PollinationsAIService();
        $image_url = $image_service->generateImageUrl(prompt: $prompt, path: $path);

        $price = rand(1, 300) * 500;

        $params = [
            'restaurant_id' => $restaurant->id, // Создаём ресторан
            'category_id'   => $category->id, // Создаём категорию
            'name'          => [
                'uz' => $food_name,
                'en' => $food_name,
                'ru' => $food_name
            ],
            'price'         => $price,
            'image_url'     => $image_url,
        ];

        return $this->dishService->create($params);
    }
}
