<?php

namespace App\Http\Controllers;

use App\Models\Aset;
use App\Models\Project;
use App\Models\TransaksiKeuangan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isSuperAdmin()) {
            // Dashboard Super Admin
            $totalAset = Aset::count();
            $totalProjectAktif = Project::count();
            
            $totalPemasukan = TransaksiKeuangan::where('tipe', 'pemasukan')->sum('nominal');
            $totalPengeluaran = TransaksiKeuangan::where('tipe', 'pengeluaran')->sum('nominal');
            
            // Aktivitas terbaru (10 transaksi terakhir)
            $aktivitasTerbaru = TransaksiKeuangan::with(['project', 'creator'])
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            return Inertia::render('Dashboard/SuperAdmin', [
                'stats' => [
                    'totalAset' => $totalAset,
                    'totalProjectAktif' => $totalProjectAktif,
                    'totalPemasukan' => $totalPemasukan,
                    'totalPengeluaran' => $totalPengeluaran,
                ],
                'aktivitasTerbaru' => $aktivitasTerbaru,
            ]);
        } else {
            // Dashboard Perangkat Desa
            $projects = Project::where('owner_id', $user->id)->get();
            
            $totalPemasukan = TransaksiKeuangan::whereIn('project_id', $projects->pluck('id'))
                ->where('tipe', 'pemasukan')
                ->sum('nominal');
                
            $totalPengeluaran = TransaksiKeuangan::whereIn('project_id', $projects->pluck('id'))
                ->where('tipe', 'pengeluaran')
                ->sum('nominal');
            
            $sisaDana = $totalPemasukan - $totalPengeluaran;

            return Inertia::render('Dashboard/PerangkatDesa', [
                'stats' => [
                    'jumlahProject' => $projects->count(),
                    'totalPemasukan' => $totalPemasukan,
                    'totalPengeluaran' => $totalPengeluaran,
                    'sisaDana' => $sisaDana,
                ],
            ]);
        }
    }
}
