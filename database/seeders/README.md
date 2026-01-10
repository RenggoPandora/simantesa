# Database Seeder - SIMANTESA

## Deskripsi
Seeder ini akan mengisi database dengan data sample yang realistis untuk sistem SIMANTESA.

## Data yang Akan Dibuat

### 1. Users (5 user)
- **Super Admin**: admin@simantesa.com / password
- **Perangkat Desa**:
  - budi@simantesa.com / password
  - siti@simantesa.com / password
  - ahmad@simantesa.com / password
  - rina@simantesa.com / password

### 2. Aset (27 item)
- Kendaraan: Mobil, Motor, Sepeda
- Elektronik: Komputer, Laptop, Printer, Proyektor, AC
- Peralatan Kantor: Meja, Kursi, Lemari, Brankas
- Peralatan Rapat: Sound System, Kursi Plastik, Tenda, Meja Lipat
- Infrastruktur: Balai Desa, Posyandu, Masjid, Lapangan
- Alat Pertanian: Traktor, Pompa Air, Perontok Padi
- Alat Kebersihan: Gerobak, Sapu, Tong Sampah

### 3. Project (14 project)
**Berlangsung (5):**
- Pembangunan Jalan Desa RT 03
- Renovasi Balai Desa
- Pengadaan Alat Pertanian
- Pembangunan Posyandu RT 05
- Program Bantuan Sosial COVID-19

**Selesai (7):**
- Pembangunan Pagar Masjid
- Pengaspalan Jalan RT 02
- Pemasangan Lampu Jalan
- Pembangunan Saluran Air RT 01
- Renovasi Gedung PAUD
- Program Komposter Desa
- Pelatihan UMKM Warga

**Dibatalkan (2):**
- Pembangunan Taman RT 04
- Renovasi Pos Kamling

### 4. Transaksi Keuangan (40+ transaksi)
- Pemasukan dan pengeluaran untuk setiap project
- Total nilai transaksi > 1,5 Miliar Rupiah
- Lengkap dengan bukti file PDF (dummy)

## Cara Menjalankan

### Fresh Install (Reset Database)
```bash
php artisan migrate:fresh --seed
```

### Hanya Jalankan Seeder
```bash
php artisan db:seed
```

### Jalankan Seeder Spesifik
```bash
# Users only
php artisan db:seed --class=InitialUserSeeder

# Aset only
php artisan db:seed --class=AsetSeeder

# Projects only
php artisan db:seed --class=ProjectSeeder

# Transaksi only
php artisan db:seed --class=TransaksiKeuanganSeeder
```

## Catatan Penting

1. **Password Default**: Semua user menggunakan password `password`
2. **Bukti File**: Seeder akan membuat file PDF dummy di `storage/app/public/bukti-transaksi/`
3. **Relasi**: Data sudah disesuaikan dengan relasi antar tabel (user → project → transaksi)
4. **Realistic Data**: Semua data menggunakan nama dan nilai yang realistis untuk desa

## Testing Akun

Login dengan akun berikut untuk testing:

**Super Admin:**
- Email: admin@simantesa.com
- Password: password
- Akses: Full access ke semua fitur

**Perangkat Desa:**
- Email: budi@simantesa.com (atau yang lain)
- Password: password
- Akses: Kelola project yang dimiliki

## Troubleshooting

**Error: Storage link not found**
```bash
php artisan storage:link
```

**Error: Foreign key constraint fails**
```bash
# Pastikan urutan seeder benar:
# 1. InitialUserSeeder (users first)
# 2. AsetSeeder
# 3. ProjectSeeder (needs users)
# 4. TransaksiKeuanganSeeder (needs projects and users)
```

**Clear cache jika diperlukan:**
```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```
