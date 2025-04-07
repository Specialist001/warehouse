<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superadmin = User::create([
            'name'              => 'Super Admin',
            'username'          => 'superadmin',
            'email'             => 'superadmin@warehouse.loc',
            'password'          => bcrypt('super__admin'),
            'email_verified_at' => date('Y-m-d H:i')
        ]);
        $superadmin->assignRole('superadmin');

        $moderator = User::create([
            'name'              => 'Moderator',
            'username'          => 'moderator',
            'email'             => 'moder@warehouse.loc',
            'password'          => bcrypt('client1212'),
            'email_verified_at' => date('Y-m-d H:i')
        ]);
        $moderator->assignRole('moderator');
    }
}
