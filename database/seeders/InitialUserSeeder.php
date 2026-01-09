<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitialUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@simantesa.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
        ]);

        // Create Perangkat Desa
        User::create([
            'name' => 'Kepala Desa',
            'email' => 'kepala@simantesa.com',
            'password' => Hash::make('password'),
            'role' => 'perangkat_desa',
        ]);

        User::create([
            'name' => 'Sekretaris Desa',
            'email' => 'sekretaris@simantesa.com',
            'password' => Hash::make('password'),
            'role' => 'perangkat_desa',
        ]);
    }
}
