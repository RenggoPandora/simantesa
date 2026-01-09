# 🚀 QUICK START GUIDE - SIMANTESA

## ⚡ Setup Cepat (5 Menit)

### 1️⃣ Install Dependencies
```bash
composer install
npm install
```

### 2️⃣ Setup Database
Buat database MySQL bernama `simantesa`, lalu jalankan:
```bash
php artisan migrate
php artisan db:seed --class=InitialUserSeeder
php artisan storage:link
```

### 3️⃣ Build & Run
```bash
npm run build
php artisan serve
```

Buka browser: `http://localhost:8000`

## 🔑 Login Pertama Kali

**Super Admin**
- Email: `admin@simantesa.com`
- Password: `password`

**Perangkat Desa**
- Email: `kepala@simantesa.com`
- Password: `password`

## 📋 Checklist Setelah Install

- [ ] Database `simantesa` sudah dibuat
- [ ] Migration berhasil dijalankan
- [ ] Seeder berhasil (3 user terbuat)
- [ ] Storage link sudah dibuat
- [ ] Bisa login sebagai Super Admin
- [ ] Bisa akses halaman Dashboard
- [ ] Bisa tambah aset
- [ ] Bisa buat project
- [ ] Bisa tambah transaksi dengan upload bukti

## 🐛 Troubleshooting Cepat

### Error: "SQLSTATE[HY000] [2002]"
```bash
# MySQL belum running atau salah konfigurasi
# Cek .env file dan pastikan MySQL service aktif
```

### Error: "Class not found"
```bash
composer dump-autoload
php artisan config:clear
php artisan cache:clear
```

### Error: File upload tidak bisa
```bash
php artisan storage:link
# Windows: pastikan folder storage/app/public ada
```

### Error: Vite not found
```bash
npm install
npm run build
```

## 📝 Testing Workflow

1. Login sebagai Super Admin
2. Buat user Perangkat Desa baru
3. Logout, login sebagai Perangkat Desa
4. Tambah aset
5. Buat project baru
6. Tambah transaksi pemasukan
7. Tambah transaksi pengeluaran
8. Lihat summary di dashboard

## ⚠️ PENTING!

- Ganti password default setelah deploy production
- Backup database secara berkala
- Jangan hapus folder `storage/app/public`
- File bukti transaksi ada di `storage/app/public/bukti-transaksi`
