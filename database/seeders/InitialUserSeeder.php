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
            'name' => 'Budi Santoso',
            'email' => 'budi@simantesa.com',
            'password' => Hash::make('password'),
            'role' => 'perangkat_desa',
        ]);

        User::create([
            'name' => 'Siti Aminah',
            'email' => 'siti@simantesa.com',
            'password' => Hash::make('password'),
            'role' => 'perangkat_desa',
        ]);

        User::create([
            'name' => 'Ahmad Fauzi',
            'email' => 'ahmad@simantesa.com',
            'password' => Hash::make('password'),
            'role' => 'perangkat_desa',
        ]);

        User::create([
            'name' => 'Rina Wijayanti',
            'email' => 'rina@simantesa.com',
            'password' => Hash::make('password'),
            'role' => 'perangkat_desa',
        ]);
    }
}
