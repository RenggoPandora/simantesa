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

        // Get filter dates from request
        $tanggalMulai = $request->input('tanggal_mulai');
        $tanggalAkhir = $request->input('tanggal_akhir');

        if ($user->isSuperAdmin()) {
            // Dashboard Super Admin
            $totalAset = Aset::count();
            $totalProjectAktif = Project::count();
            
            // Apply date filter if provided
            $pemasukanQuery = TransaksiKeuangan::where('tipe', 'pemasukan');
            $pengeluaranQuery = TransaksiKeuangan::where('tipe', 'pengeluaran');
            $aktivitasQuery = TransaksiKeuangan::with(['project', 'creator']);

            if ($tanggalMulai) {
                $pemasukanQuery->where('tanggal', '>=', $tanggalMulai);
                $pengeluaranQuery->where('tanggal', '>=', $tanggalMulai);
                $aktivitasQuery->where('tanggal', '>=', $tanggalMulai);
            }
            if ($tanggalAkhir) {
                $pemasukanQuery->where('tanggal', '<=', $tanggalAkhir);
                $pengeluaranQuery->where('tanggal', '<=', $tanggalAkhir);
                $aktivitasQuery->where('tanggal', '<=', $tanggalAkhir);
            }

            $totalPemasukan = $pemasukanQuery->sum('nominal');
            $totalPengeluaran = $pengeluaranQuery->sum('nominal');
            
            // Aktivitas terbaru (10 transaksi terakhir)
            $aktivitasTerbaru = $aktivitasQuery
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
                'filters' => [
                    'tanggal_mulai' => $tanggalMulai,
                    'tanggal_akhir' => $tanggalAkhir,
                ],
            ]);
        } else {
            // Dashboard Perangkat Desa
            $projects = Project::where('owner_id', $user->id)->get();
            
            // Apply date filter if provided
            $pemasukanQuery = TransaksiKeuangan::whereIn('project_id', $projects->pluck('id'))
                ->where('tipe', 'pemasukan');
            $pengeluaranQuery = TransaksiKeuangan::whereIn('project_id', $projects->pluck('id'))
                ->where('tipe', 'pengeluaran');

            if ($tanggalMulai) {
                $pemasukanQuery->where('tanggal', '>=', $tanggalMulai);
                $pengeluaranQuery->where('tanggal', '>=', $tanggalMulai);
            }
            if ($tanggalAkhir) {
                $pemasukanQuery->where('tanggal', '<=', $tanggalAkhir);
                $pengeluaranQuery->where('tanggal', '<=', $tanggalAkhir);
            }

            $totalPemasukan = $pemasukanQuery->sum('nominal');
            $totalPengeluaran = $pengeluaranQuery->sum('nominal');
            
            $sisaDana = $totalPemasukan - $totalPengeluaran;

            return Inertia::render('Dashboard/PerangkatDesa', [
                'stats' => [
                    'jumlahProject' => $projects->count(),
                    'totalPemasukan' => $totalPemasukan,
                    'totalPengeluaran' => $totalPengeluaran,
                    'sisaDana' => $sisaDana,
                ],
                'filters' => [
                    'tanggal_mulai' => $tanggalMulai,
                    'tanggal_akhir' => $tanggalAkhir,
                ],
            ]);
        }
    }
}
