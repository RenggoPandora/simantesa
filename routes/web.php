<?php

use App\Http\Controllers\AsetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TransaksiKeuanganController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Inventaris Aset (Accessible by all authenticated users)
    Route::resource('aset', AsetController::class);

    // Projects (Accessible based on ownership and role)
    Route::resource('projects', ProjectController::class);

    // Transaksi Keuangan (Accessible based on project ownership)
    Route::get('transaksi/create', [TransaksiKeuanganController::class, 'create'])->name('transaksi.create');
    Route::post('transaksi', [TransaksiKeuanganController::class, 'store'])->name('transaksi.store');
    Route::get('transaksi/{transaksi}/edit', [TransaksiKeuanganController::class, 'edit'])->name('transaksi.edit');
    Route::put('transaksi/{transaksi}', [TransaksiKeuanganController::class, 'update'])->name('transaksi.update');
    Route::delete('transaksi/{transaksi}', [TransaksiKeuanganController::class, 'destroy'])->name('transaksi.destroy');

    // User Management (Super Admin only)
    Route::middleware(['check.super.admin'])->group(function () {
        Route::resource('users', UserController::class)->except(['show']);
    });
});

require __DIR__.'/settings.php';
