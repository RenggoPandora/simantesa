<?php

namespace App\Http\Controllers;

use App\Models\Aset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AsetController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Aset::class, 'aset');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $aset = Aset::orderBy('created_at', 'desc')->get();

        return Inertia::render('Aset/Index', [
            'aset' => $aset,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Aset/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_aset' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'keterangan' => 'nullable|string',
        ]);

        Aset::create($validated);

        return redirect()->route('aset.index')
            ->with('success', 'Aset berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Aset $aset)
    {
        return Inertia::render('Aset/Show', [
            'aset' => $aset,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Aset $aset)
    {
        return Inertia::render('Aset/Edit', [
            'aset' => $aset,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Aset $aset)
    {
        $validated = $request->validate([
            'nama_aset' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'keterangan' => 'nullable|string',
        ]);

        $aset->update($validated);

        return redirect()->route('aset.index')
            ->with('success', 'Aset berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aset $aset)
    {
        $aset->delete();

        return redirect()->route('aset.index')
            ->with('success', 'Aset berhasil dihapus.');
    }
}
