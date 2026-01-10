<?php

namespace Database\Seeders;

use App\Models\Aset;
use Illuminate\Database\Seeder;

class AsetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $asetData = [
            // Kendaraan
            [
                'nama_aset' => 'Mobil Operasional Desa',
                'jumlah' => 1,
                'kondisi' => 'baik',
                'keterangan' => 'Toyota Avanza 2020, digunakan untuk kegiatan operasional pemerintah desa'
            ],
            [
                'nama_aset' => 'Motor Dinas',
                'jumlah' => 3,
                'kondisi' => 'baik',
                'keterangan' => 'Honda Beat untuk perangkat desa'
            ],
            [
                'nama_aset' => 'Sepeda Patroli',
                'jumlah' => 5,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Sepeda untuk hansip desa, perlu perbaikan ban dan rem'
            ],

            // Elektronik & Komputer
            [
                'nama_aset' => 'Komputer Desktop',
                'jumlah' => 4,
                'kondisi' => 'baik',
                'keterangan' => 'Dell OptiPlex untuk administrasi kantor desa'
            ],
            [
                'nama_aset' => 'Laptop Dell',
                'jumlah' => 2,
                'kondisi' => 'baik',
                'keterangan' => 'Dell Latitude untuk kepala desa dan sekretaris'
            ],
            [
                'nama_aset' => 'Printer HP LaserJet',
                'jumlah' => 2,
                'kondisi' => 'baik',
                'keterangan' => 'Printer untuk pencetakan dokumen administrasi'
            ],
            [
                'nama_aset' => 'Proyektor',
                'jumlah' => 1,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Epson EB-X41, lampu proyektor perlu diganti'
            ],
            [
                'nama_aset' => 'AC Split 1 PK',
                'jumlah' => 3,
                'kondisi' => 'baik',
                'keterangan' => 'Daikin untuk ruang kepala desa, sekretaris, dan ruang rapat'
            ],
            [
                'nama_aset' => 'Kipas Angin',
                'jumlah' => 8,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Beberapa unit perlu perbaikan motor'
            ],

            // Peralatan Kantor
            [
                'nama_aset' => 'Meja Kerja Kayu',
                'jumlah' => 12,
                'kondisi' => 'baik',
                'keterangan' => 'Meja untuk perangkat desa dan staf administrasi'
            ],
            [
                'nama_aset' => 'Kursi Kantor',
                'jumlah' => 15,
                'kondisi' => 'baik',
                'keterangan' => 'Kursi putar untuk perangkat desa'
            ],
            [
                'nama_aset' => 'Lemari Arsip',
                'jumlah' => 6,
                'kondisi' => 'baik',
                'keterangan' => 'Lemari besi untuk penyimpanan dokumen penting'
            ],
            [
                'nama_aset' => 'Brankas',
                'jumlah' => 1,
                'kondisi' => 'baik',
                'keterangan' => 'Brankas untuk penyimpanan uang kas dan dokumen penting'
            ],

            // Peralatan Rapat & Acara
            [
                'nama_aset' => 'Sound System',
                'jumlah' => 1,
                'kondisi' => 'baik',
                'keterangan' => 'TOA untuk acara-acara desa'
            ],
            [
                'nama_aset' => 'Kursi Plastik',
                'jumlah' => 200,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Untuk acara-acara desa, beberapa unit rusak'
            ],
            [
                'nama_aset' => 'Tenda Pesta',
                'jumlah' => 10,
                'kondisi' => 'baik',
                'keterangan' => 'Tenda 3x3 meter untuk kegiatan desa'
            ],
            [
                'nama_aset' => 'Meja Lipat',
                'jumlah' => 20,
                'kondisi' => 'baik',
                'keterangan' => 'Meja untuk acara rapat dan kegiatan desa'
            ],

            // Infrastruktur & Bangunan
            [
                'nama_aset' => 'Gedung Balai Desa',
                'jumlah' => 1,
                'kondisi' => 'baik',
                'keterangan' => 'Bangunan utama untuk kantor pemerintah desa'
            ],
            [
                'nama_aset' => 'Gedung Posyandu',
                'jumlah' => 3,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Perlu perbaikan atap dan cat'
            ],
            [
                'nama_aset' => 'Masjid Desa',
                'jumlah' => 1,
                'kondisi' => 'baik',
                'keterangan' => 'Masjid Al-Ikhlas untuk ibadah warga'
            ],
            [
                'nama_aset' => 'Lapangan Olahraga',
                'jumlah' => 1,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Rumput lapangan perlu perawatan'
            ],

            // Alat Pertanian
            [
                'nama_aset' => 'Traktor Tangan',
                'jumlah' => 2,
                'kondisi' => 'baik',
                'keterangan' => 'Quick G1000 untuk membantu petani'
            ],
            [
                'nama_aset' => 'Mesin Pompa Air',
                'jumlah' => 4,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Honda WB20 untuk irigasi sawah, perlu service'
            ],
            [
                'nama_aset' => 'Mesin Perontok Padi',
                'jumlah' => 1,
                'kondisi' => 'baik',
                'keterangan' => 'Yanmar untuk membantu petani saat panen'
            ],

            // Alat Kebersihan
            [
                'nama_aset' => 'Gerobak Sampah',
                'jumlah' => 5,
                'kondisi' => 'rusak_ringan',
                'keterangan' => 'Untuk pengangkutan sampah desa'
            ],
            [
                'nama_aset' => 'Sapu Lidi',
                'jumlah' => 30,
                'kondisi' => 'baik',
                'keterangan' => 'Untuk kerja bakti kebersihan desa'
            ],
            [
                'nama_aset' => 'Tong Sampah Besar',
                'jumlah' => 15,
                'kondisi' => 'baik',
                'keterangan' => 'Tong sampah 120 liter untuk setiap RT'
            ],
        ];

        foreach ($asetData as $aset) {
            Aset::create($aset);
        }
    }
}
