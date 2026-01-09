<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'nama_project',
        'owner_id',
        'tanggal_mulai',
        'status',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
    ];

    /**
     * Get the owner of this project.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get all transactions for this project.
     */
    public function transaksi(): HasMany
    {
        return $this->hasMany(TransaksiKeuangan::class, 'project_id');
    }

    /**
     * Get total pemasukan (income).
     */
    public function getTotalPemasukanAttribute(): float
    {
        return $this->transaksi()->where('tipe', 'pemasukan')->sum('nominal');
    }

    /**
     * Get total pengeluaran (expenses).
     */
    public function getTotalPengeluaranAttribute(): float
    {
        return $this->transaksi()->where('tipe', 'pengeluaran')->sum('nominal');
    }

    /**
     * Get sisa dana (remaining funds).
     */
    public function getSisaDanaAttribute(): float
    {
        return $this->total_pemasukan - $this->total_pengeluaran;
    }
}
