<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where('name', 'Admin')->where('email','test.admin@gmail.com' )->get();
        if(count($user) == 0){
            \App\User::create([
                'name' => encrypt('Admin'),
                'email' => 'test.admin@gmail.com',
                'password' => bcrypt('secret'),
                'role' => 'admin',
                'remember_token' => str_random(10),
                'company_id' =>0,
                'status' => 'active'
            ]);
        }

    }
}
