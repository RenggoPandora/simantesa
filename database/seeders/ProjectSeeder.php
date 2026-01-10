<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil user yang ada
        $superAdmin = User::where('role', 'super_admin')->first();
        $perangkatDesa = User::where('role', 'perangkat_desa')->get();

        $projectsData = [
            // Project Berlangsung
            [
                'nama_project' => 'Pembangunan Jalan Desa RT 03',
                'owner_id' => $perangkatDesa->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2026-01-05',
                'status' => 'berlangsung',
            ],
            [
                'nama_project' => 'Renovasi Balai Desa',
                'owner_id' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2026-01-10',
                'status' => 'berlangsung',
            ],
            [
                'nama_project' => 'Pengadaan Alat Pertanian',
                'owner_id' => $superAdmin->id,
                'tanggal_mulai' => '2025-12-20',
                'status' => 'berlangsung',
            ],
            [
                'nama_project' => 'Pembangunan Posyandu RT 05',
                'owner_id' => $perangkatDesa->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2025-12-15',
                'status' => 'berlangsung',
            ],
            [
                'nama_project' => 'Program Bantuan Sosial COVID-19',
                'owner_id' => $superAdmin->id,
                'tanggal_mulai' => '2025-12-01',
                'status' => 'berlangsung',
            ],

            // Project Selesai
            [
                'nama_project' => 'Pembangunan Pagar Masjid',
                'owner_id' => $perangkatDesa->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2025-10-01',
                'status' => 'selesai',
            ],
            [
                'nama_project' => 'Pengaspalan Jalan RT 02',
                'owner_id' => $superAdmin->id,
                'tanggal_mulai' => '2025-09-15',
                'status' => 'selesai',
            ],
            [
                'nama_project' => 'Pemasangan Lampu Jalan',
                'owner_id' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2025-08-01',
                'status' => 'selesai',
            ],
            [
                'nama_project' => 'Pembangunan Saluran Air RT 01',
                'owner_id' => $perangkatDesa->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2025-07-20',
                'status' => 'selesai',
            ],
            [
                'nama_project' => 'Renovasi Gedung PAUD',
                'owner_id' => $superAdmin->id,
                'tanggal_mulai' => '2025-06-10',
                'status' => 'selesai',
            ],
            [
                'nama_project' => 'Program Komposter Desa',
                'owner_id' => $perangkatDesa->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2025-05-01',
                'status' => 'selesai',
            ],
            [
                'nama_project' => 'Pelatihan UMKM Warga',
                'owner_id' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2025-04-15',
                'status' => 'selesai',
            ],

            // Project Dibatalkan
            [
                'nama_project' => 'Pembangunan Taman RT 04',
                'owner_id' => $perangkatDesa->first()->id ?? $superAdmin->id,
                'tanggal_mulai' => '2025-11-01',
                'status' => 'dibatalkan',
            ],
            [
                'nama_project' => 'Renovasi Pos Kamling',
                'owner_id' => $superAdmin->id,
                'tanggal_mulai' => '2025-10-10',
                'status' => 'dibatalkan',
            ],
        ];

        foreach ($projectsData as $project) {
            Project::create($project);
        }
    }
}
