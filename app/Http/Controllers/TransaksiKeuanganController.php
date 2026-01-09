<?php

namespace App\Http\Controllers;

use App\Models\TransaksiKeuangan;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TransaksiKeuanganController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $projectId = $request->query('project_id');
        $project = Project::findOrFail($projectId);

        // Check authorization
        $this->authorize('view', $project);

        return Inertia::render('Transaksi/Create', [
            'project' => [
                'id' => $project->id,
                'nama_project' => $project->nama_project,
                'sisa_dana' => $project->sisa_dana,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'tipe' => 'required|in:pemasukan,pengeluaran',
            'keterangan' => 'required|string',
            'nominal' => 'required|numeric|min:0.01',
            'tanggal' => 'required|date',
            'penanggung_jawab' => 'required|string|max:255',
            'bukti_file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        $this->authorize('view', $project);

        // Validasi pengeluaran tidak boleh melebihi sisa dana
        if ($validated['tipe'] === 'pengeluaran') {
            $sisaDana = $project->sisa_dana;
            if ($validated['nominal'] > $sisaDana) {
                return back()->withErrors([
                    'nominal' => 'Pengeluaran tidak boleh melebihi sisa dana (Rp ' . number_format($sisaDana, 0, ',', '.') . ').'
                ])->withInput();
            }
        }

        // Upload bukti file
        $buktiFile = $request->file('bukti_file')->store('bukti-transaksi', 'public');

        $validated['bukti_file'] = $buktiFile;
        $validated['created_by'] = $request->user()->id;

        TransaksiKeuangan::create($validated);

        return redirect()->route('projects.show', $project->id)
            ->with('success', 'Transaksi berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TransaksiKeuangan $transaksi)
    {
        $this->authorize('update', $transaksi);

        $transaksi->load('project');

        return Inertia::render('Transaksi/Edit', [
            'transaksi' => [
                'id' => $transaksi->id,
                'project_id' => $transaksi->project_id,
                'tipe' => $transaksi->tipe,
                'keterangan' => $transaksi->keterangan,
                'nominal' => $transaksi->nominal,
                'tanggal' => $transaksi->tanggal,
                'penanggung_jawab' => $transaksi->penanggung_jawab,
                'bukti_file' => $transaksi->bukti_file,
            ],
            'project' => [
                'id' => $transaksi->project->id,
                'nama_project' => $transaksi->project->nama_project,
                'sisa_dana' => $transaksi->project->sisa_dana,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TransaksiKeuangan $transaksi)
    {
        $this->authorize('update', $transaksi);

        $validated = $request->validate([
            'tipe' => 'required|in:pemasukan,pengeluaran',
            'keterangan' => 'required|string',
            'nominal' => 'required|numeric|min:0.01',
            'tanggal' => 'required|date',
            'penanggung_jawab' => 'required|string|max:255',
            'bukti_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Validasi pengeluaran tidak boleh melebihi sisa dana
        if ($validated['tipe'] === 'pengeluaran') {
            $project = $transaksi->project;
            // Hitung sisa dana tanpa transaksi ini
            $sisaDanaTanpaTransaksi = $project->sisa_dana + ($transaksi->tipe === 'pengeluaran' ? $transaksi->nominal : -$transaksi->nominal);
            
            if ($validated['nominal'] > $sisaDanaTanpaTransaksi) {
                return back()->withErrors([
                    'nominal' => 'Pengeluaran tidak boleh melebihi sisa dana (Rp ' . number_format($sisaDanaTanpaTransaksi, 0, ',', '.') . ').'
                ])->withInput();
            }
        }

        // Upload bukti file baru jika ada
        if ($request->hasFile('bukti_file')) {
            // Hapus file lama
            Storage::disk('public')->delete($transaksi->bukti_file);
            
            $buktiFile = $request->file('bukti_file')->store('bukti-transaksi', 'public');
            $validated['bukti_file'] = $buktiFile;
        }

        $transaksi->update($validated);

        return redirect()->route('projects.show', $transaksi->project_id)
            ->with('success', 'Transaksi berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransaksiKeuangan $transaksi)
    {
        $this->authorize('delete', $transaksi);

        $projectId = $transaksi->project_id;

        // Hapus file bukti
        Storage::disk('public')->delete($transaksi->bukti_file);

        $transaksi->delete();

        return redirect()->route('projects.show', $projectId)
            ->with('success', 'Transaksi berhasil dihapus.');
    }
}
