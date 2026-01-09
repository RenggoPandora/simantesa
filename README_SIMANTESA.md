# SIMANTESA - Sistem Inventaris Aset dan Transparansi Keuangan Desa

Sistem informasi berbasis web untuk pengelolaan inventaris aset dan pelaporan keuangan Pemerintah Desa Trimulyo.

## 🎯 Fitur Utama

### Super Admin
- Dashboard dengan overview sistem
- Kelola semua aset desa
- Lihat dan kelola semua project
- Audit keuangan global
- User management

### Perangkat Desa
- Dashboard personal
- Kelola aset desa
- Kelola project pribadi
- Pelaporan keuangan per project
- Upload bukti transaksi

## 🛠️ Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React dengan Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL
- **Authentication**: Laravel Fortify

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd simantesa
```

### 2. Install Dependencies
```bash
composer install
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Konfigurasi Database
Edit file `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=simantesa
DB_USERNAME=root
DB_PASSWORD=
```

Buat database MySQL:
```sql
CREATE DATABASE simantesa;
```

### 5. Jalankan Migration
```bash
php artisan migrate
```

### 6. Seed Data Awal
```bash
php artisan db:seed --class=InitialUserSeeder
```

### 7. Setup Storage Link
```bash
php artisan storage:link
```

### 8. Build Assets
```bash
npm run build
```

## 🚀 Menjalankan Aplikasi

### Development
```bash
# Terminal 1 - Laravel Server
php artisan serve

# Terminal 2 - Vite Dev Server
npm run dev
```

### Production
```bash
npm run build
php artisan serve
```

## 👥 Akun Default

Setelah seeding, gunakan akun berikut:

### Super Admin
- Email: `admin@simantesa.com`
- Password: `password`

### Perangkat Desa
- Email: `kepala@simantesa.com`
- Password: `password`

- Email: `sekretaris@simantesa.com`
- Password: `password`

## 📂 Struktur Database

### users
- `id`, `name`, `email`, `password`, `role`, `timestamps`

### aset
- `id`, `nama_aset`, `jumlah`, `kondisi`, `keterangan`, `timestamps`

### projects
- `id`, `nama_project`, `owner_id`, `tanggal_mulai`, `timestamps`

### transaksi_keuangan
- `id`, `project_id`, `tipe`, `keterangan`, `nominal`, `tanggal`
- `penanggung_jawab`, `bukti_file`, `created_by`, `timestamps`

## 🔐 Roles & Permissions

### Super Admin
- Akses penuh ke semua fitur
- Kelola semua user
- Lihat dan audit semua data

### Perangkat Desa
- Kelola aset (semua user)
- Kelola project pribadi
- Kelola transaksi project pribadi
- Tidak bisa lihat project user lain

## 📝 Business Rules

1. **Ownership**: User hanya bisa kelola project miliknya sendiri
2. **Sisa Dana**: Dihitung realtime (tidak disimpan di database)
3. **Validasi Pengeluaran**: Tidak boleh melebihi sisa dana
4. **Bukti Transaksi**: Wajib upload untuk setiap transaksi
5. **File Upload**: JPG, PNG, PDF maksimal 2MB

## 🌐 Routes

```php
// Public
GET  /                  - Homepage

// Authenticated
GET  /dashboard         - Dashboard (role-based)

// Aset (All Users)
GET  /aset              - List aset
GET  /aset/create       - Form tambah aset
POST /aset              - Simpan aset
GET  /aset/{id}/edit    - Form edit aset
PUT  /aset/{id}         - Update aset
DELETE /aset/{id}       - Hapus aset

// Project
GET  /projects          - List project
GET  /projects/create   - Form tambah project
POST /projects          - Simpan project
GET  /projects/{id}     - Detail project + transaksi
GET  /projects/{id}/edit - Form edit project
PUT  /projects/{id}     - Update project
DELETE /projects/{id}   - Hapus project

// Transaksi
GET  /transaksi/create?project_id={id} - Form tambah transaksi
POST /transaksi         - Simpan transaksi
GET  /transaksi/{id}/edit - Form edit transaksi
PUT  /transaksi/{id}    - Update transaksi
DELETE /transaksi/{id}  - Hapus transaksi

// User Management (Super Admin Only)
GET  /users             - List user
GET  /users/create      - Form tambah user
POST /users             - Simpan user
GET  /users/{id}/edit   - Form edit user
PUT  /users/{id}        - Update user
DELETE /users/{id}      - Hapus user
```

## 📱 Halaman React

### Dashboard
- `resources/js/pages/Dashboard/SuperAdmin.tsx`
- `resources/js/pages/Dashboard/PerangkatDesa.tsx`

### Aset
- `resources/js/pages/Aset/Index.tsx`
- `resources/js/pages/Aset/Create.tsx`
- `resources/js/pages/Aset/Edit.tsx`

### Project
- `resources/js/pages/Project/Index.tsx`
- `resources/js/pages/Project/Create.tsx`
- `resources/js/pages/Project/Edit.tsx`
- `resources/js/pages/Project/Show.tsx`

### Transaksi
- `resources/js/pages/Transaksi/Create.tsx`
- `resources/js/pages/Transaksi/Edit.tsx`

### User
- `resources/js/pages/User/Index.tsx`
- `resources/js/pages/User/Create.tsx`
- `resources/js/pages/User/Edit.tsx`

## 🔒 Security Features

- Laravel Policies untuk authorization
- Form Request Validation
- CSRF Protection
- Password Hashing
- File Upload Validation
- SQL Injection Protection (Eloquent ORM)

## 📄 License

Proprietary - Pemerintah Desa Trimulyo

## 👨‍💻 Developer Notes

### Menambah User Manual
```bash
php artisan tinker
```

```php
use App\Models\User;
use Illuminate\Support\Facades\Hash;

User::create([
    'name' => 'Nama User',
    'email' => 'email@example.com',
    'password' => Hash::make('password'),
    'role' => 'perangkat_desa', // atau 'super_admin'
]);
```

### Troubleshooting

**Error: Storage link tidak ada**
```bash
php artisan storage:link
```

**Error: Permission denied saat upload**
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

**Error: Class not found**
```bash
composer dump-autoload
```

## 📞 Support

Untuk bantuan teknis, hubungi developer sistem.
