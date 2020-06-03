<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Manel Mena',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'admin' => true
        ],[
            'name' => 'Adalid Villanueva',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'admin' => false
        ]);
    }
}
