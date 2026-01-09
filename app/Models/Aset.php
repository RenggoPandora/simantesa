<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aset extends Model
{
    protected $table = 'aset';

    protected $fillable = [
        'nama_aset',
        'jumlah',
        'kondisi',
        'keterangan',
    ];

    protected $casts = [
        'jumlah' => 'integer',
    ];
}
