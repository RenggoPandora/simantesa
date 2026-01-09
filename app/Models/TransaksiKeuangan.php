<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransaksiKeuangan extends Model
{
    protected $table = 'transaksi_keuangan';

    protected $fillable = [
        'project_id',
        'tipe',
        'keterangan',
        'nominal',
        'tanggal',
        'penanggung_jawab',
        'bukti_file',
        'created_by',
    ];

    protected $casts = [
        'nominal' => 'decimal:2',
        'tanggal' => 'date',
    ];

    /**
     * Get the project this transaction belongs to.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    /**
     * Get the user who created this transaction.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
