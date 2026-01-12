<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

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

    /**
     * Export project report to PDF.
     */
    public function exportPdf(Project $project)
    {
        $this->authorize('view', $project);

        $project->load(['owner', 'transaksi.creator']);

        $transaksi = $project->transaksi->map(function ($t) {
            $buktiFile = $t->bukti_file;
            $filePath = storage_path('app/public/' . $buktiFile);
            $fileExtension = strtolower(pathinfo($buktiFile, PATHINFO_EXTENSION));
            
            // Convert PDF to images if file is PDF
            $pdfImages = [];
            if ($fileExtension === 'pdf' && file_exists($filePath)) {
                try {
                    // Check if Imagick is available
                    if (extension_loaded('imagick')) {
                        $imagick = new \Imagick();
                        $imagick->setResolution(150, 150);
                        $imagick->readImage($filePath);
                        
                        // Get number of pages
                        $numPages = $imagick->getNumberImages();
                        
                        // Convert each page to JPG
                        for ($i = 0; $i < $numPages; $i++) {
                            $imagick->setIteratorIndex($i);
                            $imagick->setImageFormat('jpeg');
                            $imagick->setImageCompressionQuality(90);
                            $imagick->setImageBackgroundColor('white');
                            $imagick->setImageAlphaChannel(\Imagick::ALPHACHANNEL_REMOVE);
                            $imagick->mergeImageLayers(\Imagick::LAYERMETHOD_FLATTEN);
                            
                            // Resize for reasonable file size
                            $imagick->scaleImage(1000, 0);
                            
                            $imageBlob = $imagick->getImageBlob();
                            $pdfImages[] = 'data:image/jpeg;base64,' . base64_encode($imageBlob);
                        }
                        
                        $imagick->clear();
                        $imagick->destroy();
                    }
                } catch (\Exception $e) {
                    // If conversion fails, pdfImages will be empty
                    \Log::warning('Failed to convert PDF to images: ' . $e->getMessage());
                }
            }
            
            return [
                'id' => $t->id,
                'tanggal' => $t->tanggal,
                'tipe' => $t->tipe,
                'keterangan' => $t->keterangan,
                'nominal' => $t->nominal,
                'penanggung_jawab' => $t->penanggung_jawab,
                'bukti_file' => $buktiFile,
                'created_by' => $t->creator->name,
                'pdf_images' => $pdfImages, // Array of base64 images if PDF
            ];
        });

        $data = [
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
            'generated_at' => now()->format('d F Y H:i'),
        ];

        $pdf = Pdf::loadView('pdf.project-report', $data);
        $pdf->setPaper('a4', 'portrait');
        
        $filename = 'Laporan_' . str_replace(' ', '_', $project->nama_project) . '_' . now()->format('Ymd') . '.pdf';
        
        return $pdf->download($filename);
    }
}
