<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\TransaksiKeuangan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class TransaksiKeuanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan folder untuk bukti file ada
        Storage::disk('public')->makeDirectory('bukti-transaksi');
        
        // Buat file dummy untuk bukti transaksi
        $dummyPdfContent = '%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Bukti Transaksi) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000317 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
410
%%EOF';

        // Simpan file dummy
        for ($i = 1; $i <= 50; $i++) {
            Storage::disk('public')->put("bukti-transaksi/bukti-{$i}.pdf", $dummyPdfContent);
        }

        $superAdmin = User::where('role', 'super_admin')->first();
        $perangkatDesa = User::where('role', 'perangkat_desa')->get();
        $projects = Project::all();

        $transaksiData = [
            // Project 1: Pembangunan Jalan Desa RT 03
            [
                'project_id' => 1,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana APBD untuk pembangunan jalan',
                'nominal' => 150000000,
                'tanggal' => '2026-01-05',
                'penanggung_jawab' => 'Budi Santoso',
                'bukti_file' => 'bukti-transaksi/bukti-1.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 1,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian material bangunan (semen, pasir, kerikil)',
                'nominal' => 45000000,
                'tanggal' => '2026-01-06',
                'penanggung_jawab' => 'Tukiman',
                'bukti_file' => 'bukti-transaksi/bukti-2.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 1,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Upah pekerja minggu pertama',
                'nominal' => 15000000,
                'tanggal' => '2026-01-08',
                'penanggung_jawab' => 'Tukiman',
                'bukti_file' => 'bukti-transaksi/bukti-3.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],

            // Project 2: Renovasi Balai Desa
            [
                'project_id' => 2,
                'tipe' => 'pemasukan',
                'keterangan' => 'Anggaran dari kas desa',
                'nominal' => 80000000,
                'tanggal' => '2026-01-10',
                'penanggung_jawab' => 'Sekretaris Desa',
                'bukti_file' => 'bukti-transaksi/bukti-4.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 2,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian cat dan bahan renovasi',
                'nominal' => 12000000,
                'tanggal' => '2026-01-11',
                'penanggung_jawab' => 'Ahmad Fauzi',
                'bukti_file' => 'bukti-transaksi/bukti-5.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 2,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Biaya tukang dan pekerja',
                'nominal' => 25000000,
                'tanggal' => '2026-01-12',
                'penanggung_jawab' => 'Ahmad Fauzi',
                'bukti_file' => 'bukti-transaksi/bukti-6.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],

            // Project 3: Pengadaan Alat Pertanian
            [
                'project_id' => 3,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana hibah dari pemerintah provinsi',
                'nominal' => 200000000,
                'tanggal' => '2025-12-20',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-7.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 3,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian traktor tangan 2 unit',
                'nominal' => 36000000,
                'tanggal' => '2025-12-22',
                'penanggung_jawab' => 'Slamet Riyadi',
                'bukti_file' => 'bukti-transaksi/bukti-8.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 3,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian mesin pompa air 4 unit',
                'nominal' => 28000000,
                'tanggal' => '2025-12-25',
                'penanggung_jawab' => 'Slamet Riyadi',
                'bukti_file' => 'bukti-transaksi/bukti-9.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 3,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian mesin perontok padi',
                'nominal' => 55000000,
                'tanggal' => '2025-12-28',
                'penanggung_jawab' => 'Slamet Riyadi',
                'bukti_file' => 'bukti-transaksi/bukti-10.pdf',
                'created_by' => $superAdmin->id,
            ],

            // Project 4: Pembangunan Posyandu RT 05
            [
                'project_id' => 4,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana APBD kesehatan',
                'nominal' => 75000000,
                'tanggal' => '2025-12-15',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-11.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 4,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembangunan gedung posyandu',
                'nominal' => 60000000,
                'tanggal' => '2025-12-20',
                'penanggung_jawab' => 'Mandor Bangunan',
                'bukti_file' => 'bukti-transaksi/bukti-12.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 4,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pengadaan peralatan kesehatan',
                'nominal' => 8000000,
                'tanggal' => '2025-12-28',
                'penanggung_jawab' => 'Bidan Desa',
                'bukti_file' => 'bukti-transaksi/bukti-13.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],

            // Project 5: Program Bantuan Sosial COVID-19
            [
                'project_id' => 5,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana bansos dari pemerintah pusat',
                'nominal' => 300000000,
                'tanggal' => '2025-12-01',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-14.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 5,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Distribusi sembako untuk 200 KK',
                'nominal' => 100000000,
                'tanggal' => '2025-12-05',
                'penanggung_jawab' => 'Tim Bansos',
                'bukti_file' => 'bukti-transaksi/bukti-15.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 5,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Distribusi uang tunai untuk 150 KK',
                'nominal' => 75000000,
                'tanggal' => '2025-12-10',
                'penanggung_jawab' => 'Tim Bansos',
                'bukti_file' => 'bukti-transaksi/bukti-16.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 5,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian masker dan hand sanitizer',
                'nominal' => 15000000,
                'tanggal' => '2025-12-15',
                'penanggung_jawab' => 'Satgas COVID',
                'bukti_file' => 'bukti-transaksi/bukti-17.pdf',
                'created_by' => $superAdmin->id,
            ],

            // Project 6: Pembangunan Pagar Masjid (Selesai)
            [
                'project_id' => 6,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana swadaya masyarakat',
                'nominal' => 50000000,
                'tanggal' => '2025-10-01',
                'penanggung_jawab' => 'Takmir Masjid',
                'bukti_file' => 'bukti-transaksi/bukti-18.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 6,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian bahan pagar (besi, semen)',
                'nominal' => 30000000,
                'tanggal' => '2025-10-05',
                'penanggung_jawab' => 'Pak Usman',
                'bukti_file' => 'bukti-transaksi/bukti-19.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 6,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Upah tukang dan pekerja',
                'nominal' => 18000000,
                'tanggal' => '2025-10-20',
                'penanggung_jawab' => 'Pak Usman',
                'bukti_file' => 'bukti-transaksi/bukti-20.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],

            // Project 7: Pengaspalan Jalan RT 02 (Selesai)
            [
                'project_id' => 7,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana APBD infrastruktur',
                'nominal' => 250000000,
                'tanggal' => '2025-09-15',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-21.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 7,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pengaspalan jalan sepanjang 1 km',
                'nominal' => 180000000,
                'tanggal' => '2025-09-20',
                'penanggung_jawab' => 'Kontraktor Jalan',
                'bukti_file' => 'bukti-transaksi/bukti-22.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 7,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembuatan saluran air di pinggir jalan',
                'nominal' => 45000000,
                'tanggal' => '2025-10-01',
                'penanggung_jawab' => 'Kontraktor Jalan',
                'bukti_file' => 'bukti-transaksi/bukti-23.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 7,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pemasangan rambu-rambu jalan',
                'nominal' => 8000000,
                'tanggal' => '2025-10-10',
                'penanggung_jawab' => 'Tim Teknis',
                'bukti_file' => 'bukti-transaksi/bukti-24.pdf',
                'created_by' => $superAdmin->id,
            ],

            // Project 8: Pemasangan Lampu Jalan (Selesai)
            [
                'project_id' => 8,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana APBD penerangan',
                'nominal' => 120000000,
                'tanggal' => '2025-08-01',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-25.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 8,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian lampu LED 50 unit',
                'nominal' => 45000000,
                'tanggal' => '2025-08-05',
                'penanggung_jawab' => 'Teknisi Listrik',
                'bukti_file' => 'bukti-transaksi/bukti-26.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 8,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pemasangan tiang dan instalasi listrik',
                'nominal' => 60000000,
                'tanggal' => '2025-08-15',
                'penanggung_jawab' => 'Teknisi Listrik',
                'bukti_file' => 'bukti-transaksi/bukti-27.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],

            // Project 9: Pembangunan Saluran Air RT 01 (Selesai)
            [
                'project_id' => 9,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana APBD sanitasi',
                'nominal' => 90000000,
                'tanggal' => '2025-07-20',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-28.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 9,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian buis beton dan material',
                'nominal' => 40000000,
                'tanggal' => '2025-07-25',
                'penanggung_jawab' => 'Mandor',
                'bukti_file' => 'bukti-transaksi/bukti-29.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 9,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Upah pekerja penggalian dan pemasangan',
                'nominal' => 45000000,
                'tanggal' => '2025-08-10',
                'penanggung_jawab' => 'Mandor',
                'bukti_file' => 'bukti-transaksi/bukti-30.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],

            // Project 10: Renovasi Gedung PAUD (Selesai)
            [
                'project_id' => 10,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana APBD pendidikan',
                'nominal' => 60000000,
                'tanggal' => '2025-06-10',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-31.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 10,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Perbaikan atap dan lantai',
                'nominal' => 35000000,
                'tanggal' => '2025-06-15',
                'penanggung_jawab' => 'Tukang Bangunan',
                'bukti_file' => 'bukti-transaksi/bukti-32.pdf',
                'created_by' => $superAdmin->id,
            ],
            [
                'project_id' => 10,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pengecatan dan perbaikan mebel',
                'nominal' => 18000000,
                'tanggal' => '2025-06-25',
                'penanggung_jawab' => 'Tim Renovasi',
                'bukti_file' => 'bukti-transaksi/bukti-33.pdf',
                'created_by' => $superAdmin->id,
            ],

            // Project 11: Program Komposter Desa (Selesai)
            [
                'project_id' => 11,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana CSR perusahaan',
                'nominal' => 40000000,
                'tanggal' => '2025-05-01',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-34.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 11,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian komposter 100 unit',
                'nominal' => 25000000,
                'tanggal' => '2025-05-05',
                'penanggung_jawab' => 'Ketua Bank Sampah',
                'bukti_file' => 'bukti-transaksi/bukti-35.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 11,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Sosialisasi dan pelatihan warga',
                'nominal' => 8000000,
                'tanggal' => '2025-05-15',
                'penanggung_jawab' => 'Tim Penyuluh',
                'bukti_file' => 'bukti-transaksi/bukti-36.pdf',
                'created_by' => $perangkatDesa->first()->id ?? $superAdmin->id,
            ],

            // Project 12: Pelatihan UMKM Warga (Selesai)
            [
                'project_id' => 12,
                'tipe' => 'pemasukan',
                'keterangan' => 'Dana pemberdayaan masyarakat',
                'nominal' => 35000000,
                'tanggal' => '2025-04-15',
                'penanggung_jawab' => 'Kepala Desa',
                'bukti_file' => 'bukti-transaksi/bukti-37.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 12,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Honor narasumber dan instruktur',
                'nominal' => 12000000,
                'tanggal' => '2025-04-20',
                'penanggung_jawab' => 'Koordinator Pelatihan',
                'bukti_file' => 'bukti-transaksi/bukti-38.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 12,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Pembelian peralatan dan bahan pelatihan',
                'nominal' => 15000000,
                'tanggal' => '2025-04-25',
                'penanggung_jawab' => 'Koordinator Pelatihan',
                'bukti_file' => 'bukti-transaksi/bukti-39.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],
            [
                'project_id' => 12,
                'tipe' => 'pengeluaran',
                'keterangan' => 'Konsumsi peserta selama 5 hari',
                'nominal' => 5000000,
                'tanggal' => '2025-05-01',
                'penanggung_jawab' => 'Tim Konsumsi',
                'bukti_file' => 'bukti-transaksi/bukti-40.pdf',
                'created_by' => $perangkatDesa->skip(1)->first()->id ?? $superAdmin->id,
            ],
        ];

        foreach ($transaksiData as $transaksi) {
            TransaksiKeuangan::create($transaksi);
        }
    }
}
