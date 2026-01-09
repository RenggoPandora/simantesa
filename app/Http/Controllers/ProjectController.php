<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Project::class, 'project');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isSuperAdmin()) {
            $projects = Project::with(['owner', 'transaksi'])
                ->withCount('transaksi')
                ->get()
                ->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'nama_project' => $project->nama_project,
                        'tanggal_mulai' => $project->tanggal_mulai,
                        'status' => $project->status,
                        'owner' => $project->owner->name,
                        'total_pemasukan' => $project->total_pemasukan,
                        'total_pengeluaran' => $project->total_pengeluaran,
                        'sisa_dana' => $project->sisa_dana,
                    ];
                });

            $users = User::all();
        } else {
            $projects = Project::where('owner_id', $user->id)
                ->with(['transaksi'])
                ->withCount('transaksi')
                ->get()
                ->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'nama_project' => $project->nama_project,
                        'tanggal_mulai' => $project->tanggal_mulai,
                        'status' => $project->status,
                        'total_pemasukan' => $project->total_pemasukan,
                        'total_pengeluaran' => $project->total_pengeluaran,
                        'sisa_dana' => $project->sisa_dana,
                    ];
                });

            $users = null;
        }

        return Inertia::render('Project/Index', [
            'projects' => $projects,
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_project' => 'required|string|max:255',
            'tanggal_mulai' => 'required|date',
            'status' => 'required|in:berlangsung,selesai,dibatalkan',
        ]);

        $validated['owner_id'] = $request->user()->id;

        Project::create($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load(['owner', 'transaksi.creator']);

        $transaksi = $project->transaksi->map(function ($t) {
            return [
                'id' => $t->id,
                'tanggal' => $t->tanggal,
                'tipe' => $t->tipe,
                'keterangan' => $t->keterangan,
                'nominal' => $t->nominal,
                'penanggung_jawab' => $t->penanggung_jawab,
                'bukti_file' => $t->bukti_file,
                'created_by' => $t->creator->name,
            ];
        });

        return Inertia::render('Project/Show', [
            'project' => [
                'id' => $project->id,
                'nama_project' => $project->nama_project,
                'tanggal_mulai' => $project->tanggal_mulai,
                'status' => $project->status,
                'owner' => $project->owner->name,
                'total_pemasukan' => $project->total_pemasukan,
                'total_pengeluaran' => $project->total_pengeluaran,
                'sisa_dana' => $project->sisa_dana,
            ],
            'transaksi' => $transaksi,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'nama_project' => 'required|string|max:255',
            'tanggal_mulai' => 'required|date',
            'status' => 'required|in:berlangsung,selesai,dibatalkan',
        ]);

        $project->update($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil dihapus.');
    }
}
