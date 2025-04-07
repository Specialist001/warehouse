<?php

namespace Database\Factories;

use App\Models\User;
use Domains\Restaurant\Models\Warehouse;
use Domains\Restaurant\States\Status\WarehouseStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RestaurantFactory extends Factory
{

    protected $model = Warehouse::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->company();
        $token =
            // generate 10 length numbers
            $this->faker->numerify('##########') . ":" .
            // generate 34 length characters
            $this->faker->regexify('[A-Za-z]{34}');

        return [
            'name'          => $name,
            'phone'         => $this->faker->phoneNumber(),
            'owner_user_id' => User::factory(),
            'slug'          => \Illuminate\Support\Str::slug($name),
            'bot_token'     => $token,
            'bot_username'  => $this->faker->word(),
            'webhook_url'   => $this->faker->url(),
            'address'       => $this->faker->address(),
            'logo_url'      => null,
            'is_active'     => $this->faker->boolean(),
            'status'        => $this->faker->randomElement([WarehouseStatus::Creating(), WarehouseStatus::Opened(), WarehouseStatus::Closed(), WarehouseStatus::Banned(), WarehouseStatus::Deleted()]),
        ];
    }

    /**
     * After creating hook.
     */
    public function configure(): self
    {
        return $this->afterCreating(function (Warehouse $restaurant) {
            // and assign client role to the owner
            $restaurant->owner->assignRole('client');

            // Создаём 5 пользователей и связываем их с рестораном
//            $users = User::factory(2)->create();
//            foreach ($users as $user) {
//                $restaurant->employees()->attach($user->id); // Используйте метод attach для связи
//            }
        });
    }
}
