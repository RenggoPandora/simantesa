<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Laporan Project - {{ $project['nama_project'] }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11px;
            color: #333;
            line-height: 1.6;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #DC143C;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #DC143C, #B00020);
            border-radius: 10px;
            margin: 0 auto 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 28px;
            font-weight: bold;
        }
        
        .header h1 {
            font-size: 24px;
            color: #1a1a1a;
            margin-bottom: 5px;
        }
        
        .header .subtitle {
            font-size: 12px;
            color: #666;
            margin-bottom: 10px;
        }
        
        .header .generated {
            font-size: 10px;
            color: #999;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #DC143C;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .info-grid {
            display: table;
            width: 100%;
            margin-bottom: 20px;
        }
        
        .info-row {
            display: table-row;
        }
        
        .info-label {
            display: table-cell;
            width: 30%;
            padding: 8px 10px;
            background: #f8f9fa;
            font-weight: 600;
            color: #555;
        }
        
        .info-value {
            display: table-cell;
            padding: 8px 10px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .summary-cards {
            display: table;
            width: 100%;
            margin-bottom: 20px;
        }
        
        .summary-row {
            display: table-row;
        }
        
        .summary-card {
            display: table-cell;
            width: 33.33%;
            padding: 15px;
            text-align: center;
            border: 1px solid #e9ecef;
        }
        
        .summary-card.pemasukan {
            background: #f0fdf4;
        }
        
        .summary-card.pengeluaran {
            background: #fef2f2;
        }
        
        .summary-card.sisa {
            background: #f8f9fa;
        }
        
        .summary-label {
            font-size: 10px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .summary-value {
            font-size: 16px;
            font-weight: bold;
        }
        
        .summary-value.green {
            color: #16a34a;
        }
        
        .summary-value.red {
            color: #dc2626;
        }
        
        .summary-value.gray {
            color: #1a1a1a;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        thead {
            background: #f8f9fa;
        }
        
        th {
            padding: 10px 8px;
            text-align: left;
            font-weight: 600;
            color: #555;
            border-bottom: 2px solid #DC143C;
            font-size: 10px;
            text-transform: uppercase;
        }
        
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #e9ecef;
            font-size: 10px;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .badge {
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 600;
            display: inline-block;
        }
        
        .badge.pemasukan {
            background: #dcfce7;
            color: #166534;
        }
        
        .badge.pengeluaran {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .badge.status-berlangsung {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .badge.status-selesai {
            background: #dcfce7;
            color: #166534;
        }
        
        .badge.status-dibatalkan {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .font-bold {
            font-weight: 700;
        }
        
        .text-green {
            color: #16a34a;
        }
        
        .text-red {
            color: #dc2626;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .attachment-section {
            margin-top: 30px;
        }
        
        .attachment-item {
            margin-bottom: 40px;
            padding: 15px;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            background: #f8f9fa;
        }
        
        .attachment-header {
            font-weight: 600;
            color: #DC143C;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid #dee2e6;
        }
        
        .attachment-info {
            margin-bottom: 15px;
            line-height: 1.8;
        }
        
        .attachment-info-row {
            margin-bottom: 5px;
        }
        
        .attachment-label {
            font-weight: 600;
            color: #555;
            display: inline-block;
            width: 120px;
        }
        
        .attachment-image {
            margin-top: 15px;
            max-width: 100%;
            border: 1px solid #dee2e6;
            border-radius: 5px;
        }
        
        .no-data {
            text-align: center;
            padding: 30px;
            color: #999;
            font-style: italic;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
            text-align: center;
            font-size: 10px;
            color: #999;
        }
    </style>
</head>
<body>
    {{-- Header --}}
    <div class="header">
        <div class="logo">S</div>
        <h1>SIMANTESA</h1>
        <div class="subtitle">Sistem Manajemen Aset dan Transparansi Keuangan Desa</div>
        <div class="subtitle" style="font-weight: 600; color: #333; margin-top: 10px;">
            LAPORAN KEUANGAN PROJECT
        </div>
        <div class="generated">Digenerate pada: {{ $generated_at }}</div>
    </div>

    {{-- Project Information --}}
    <div class="section">
        <div class="section-title">INFORMASI PROJECT</div>
        <div class="info-grid">
            <div class="info-row">
                <div class="info-label">Nama Project</div>
                <div class="info-value">{{ $project['nama_project'] }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Status</div>
                <div class="info-value">
                    <span class="badge status-{{ $project['status'] }}">
                        @if($project['status'] == 'berlangsung')
                            Berlangsung
                        @elseif($project['status'] == 'selesai')
                            Selesai
                        @else
                            Dibatalkan
                        @endif
                    </span>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">Tanggal Mulai</div>
                <div class="info-value">{{ \Carbon\Carbon::parse($project['tanggal_mulai'])->translatedFormat('d F Y') }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Penanggung Jawab</div>
                <div class="info-value">{{ $project['owner'] }}</div>
            </div>
        </div>
    </div>

    {{-- Summary Cards --}}
    <div class="section">
        <div class="section-title">RINGKASAN KEUANGAN</div>
        <div class="summary-cards">
            <div class="summary-row">
                <div class="summary-card pemasukan">
                    <div class="summary-label">Total Pemasukan</div>
                    <div class="summary-value green">Rp {{ number_format($project['total_pemasukan'], 0, ',', '.') }}</div>
                </div>
                <div class="summary-card pengeluaran">
                    <div class="summary-label">Total Pengeluaran</div>
                    <div class="summary-value red">Rp {{ number_format($project['total_pengeluaran'], 0, ',', '.') }}</div>
                </div>
                <div class="summary-card sisa">
                    <div class="summary-label">Sisa Dana</div>
                    <div class="summary-value gray">Rp {{ number_format($project['sisa_dana'], 0, ',', '.') }}</div>
                </div>
            </div>
        </div>
    </div>

    {{-- Transaction Table --}}
    <div class="section">
        <div class="section-title">DAFTAR TRANSAKSI</div>
        @if(count($transaksi) > 0)
            <table>
                <thead>
                    <tr>
                        <th style="width: 10%;">No</th>
                        <th style="width: 12%;">Tanggal</th>
                        <th style="width: 10%;">Jenis</th>
                        <th style="width: 28%;">Keterangan</th>
                        <th style="width: 18%; text-align: right;">Nominal</th>
                        <th style="width: 22%;">Penanggung Jawab</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($transaksi as $index => $t)
                        <tr>
                            <td class="text-center">{{ $index + 1 }}</td>
                            <td>{{ \Carbon\Carbon::parse($t['tanggal'])->format('d/m/Y') }}</td>
                            <td>
                                <span class="badge {{ $t['tipe'] }}">
                                    {{ ucfirst($t['tipe']) }}
                                </span>
                            </td>
                            <td>
                                <div style="font-weight: 600;">{{ $t['keterangan'] }}</div>
                                <div style="font-size: 9px; color: #666;">oleh {{ $t['created_by'] }}</div>
                            </td>
                            <td class="text-right">
                                <span class="font-bold {{ $t['tipe'] == 'pemasukan' ? 'text-green' : 'text-red' }}">
                                    {{ $t['tipe'] == 'pemasukan' ? '+' : '-' }}Rp {{ number_format($t['nominal'], 0, ',', '.') }}
                                </span>
                            </td>
                            <td>{{ $t['penanggung_jawab'] }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <div class="no-data">Belum ada transaksi</div>
        @endif
    </div>

    {{-- Page Break before attachments --}}
    @if(count($transaksi) > 0)
        <div class="page-break"></div>
        
        {{-- Attachments Section --}}
        <div class="attachment-section">
            <div class="section-title">LAMPIRAN BUKTI TRANSAKSI</div>
            @foreach($transaksi as $index => $t)
                <div class="attachment-item">
                    <div class="attachment-header">
                        Lampiran {{ $index + 1 }} - {{ ucfirst($t['tipe']) }}
                    </div>
                    <div class="attachment-info">
                        <div class="attachment-info-row">
                            <span class="attachment-label">Tanggal:</span>
                            <span>{{ \Carbon\Carbon::parse($t['tanggal'])->translatedFormat('d F Y') }}</span>
                        </div>
                        <div class="attachment-info-row">
                            <span class="attachment-label">Keterangan:</span>
                            <span>{{ $t['keterangan'] }}</span>
                        </div>
                        <div class="attachment-info-row">
                            <span class="attachment-label">Nominal:</span>
                            <span class="font-bold {{ $t['tipe'] == 'pemasukan' ? 'text-green' : 'text-red' }}">
                                {{ $t['tipe'] == 'pemasukan' ? '+' : '-' }}Rp {{ number_format($t['nominal'], 0, ',', '.') }}
                            </span>
                        </div>
                        <div class="attachment-info-row">
                            <span class="attachment-label">Penanggung Jawab:</span>
                            <span>{{ $t['penanggung_jawab'] }}</span>
                        </div>
                        <div class="attachment-info-row">
                            <span class="attachment-label">Dibuat oleh:</span>
                            <span>{{ $t['created_by'] }}</span>
                        </div>
                        <div class="attachment-info-row">
                            <span class="attachment-label">File Bukti:</span>
                            <span>{{ basename($t['bukti_file']) }}</span>
                        </div>
                    </div>
                    
                    @php
                        $filePath = storage_path('app/public/' . $t['bukti_file']);
                        $fileExtension = strtolower(pathinfo($t['bukti_file'], PATHINFO_EXTENSION));
                        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                        $fileExists = file_exists($filePath);
                        $hasPdfImages = isset($t['pdf_images']) && !empty($t['pdf_images']);
                    @endphp
                    
                    @if($hasPdfImages)
                        {{-- Display PDF converted to images (all pages) --}}
                        <div style="margin-top: 15px; page-break-inside: avoid;">
                            <div style="background: linear-gradient(135deg, #fee2e2, #fecaca); padding: 10px; border-radius: 6px; margin-bottom: 15px; text-align: center;">
                                <p style="font-size: 11px; color: #dc2626; font-weight: 600; margin: 0;">
                                    📄 FILE PDF - {{ count($t['pdf_images']) }} HALAMAN
                                </p>
                            </div>
                            
                            @foreach($t['pdf_images'] as $pageIndex => $imageData)
                                <div style="margin-bottom: 20px; page-break-inside: avoid; @if($pageIndex > 0) page-break-before: always; @endif">
                                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                                        <p style="font-size: 10px; color: #666; margin: 0; text-align: center;">
                                            <strong>Halaman {{ $pageIndex + 1 }} dari {{ count($t['pdf_images']) }}</strong>
                                        </p>
                                    </div>
                                    <div style="text-align: center; border: 2px solid #dc2626; border-radius: 8px; padding: 10px; background: #fff;">
                                        <img src="{{ $imageData }}" alt="Halaman {{ $pageIndex + 1 }}" style="max-width: 100%; height: auto; border: 1px solid #dee2e6; border-radius: 4px;">
                                    </div>
                                </div>
                            @endforeach
                            
                            <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 6px; text-align: center;">
                                <p style="font-size: 10px; color: #666; margin: 0;">
                                    <strong>File:</strong> {{ basename($t['bukti_file']) }} 
                                    <span style="margin: 0 8px;">•</span>
                                    <strong>Total:</strong> {{ count($t['pdf_images']) }} halaman
                                </p>
                            </div>
                        </div>
                    @elseif(in_array($fileExtension, $imageExtensions) && $fileExists)
                        {{-- Display actual image using base64 encoding for PDF compatibility --}}
                        @php
                            try {
                                $imageData = base64_encode(file_get_contents($filePath));
                                $mimeTypes = [
                                    'jpg' => 'image/jpeg',
                                    'jpeg' => 'image/jpeg',
                                    'png' => 'image/png',
                                    'gif' => 'image/gif',
                                ];
                                $mimeType = $mimeTypes[$fileExtension] ?? 'image/jpeg';
                                $imageSrc = 'data:' . $mimeType . ';base64,' . $imageData;
                            } catch (\Exception $e) {
                                $imageSrc = null;
                            }
                        @endphp
                        
                        @if($imageSrc)
                            <div style="margin-top: 15px; text-align: center; page-break-inside: avoid;">
                                <img src="{{ $imageSrc }}" alt="Bukti Transaksi {{ $index + 1 }}" style="max-width: 100%; height: auto; max-height: 600px; border: 2px solid #dee2e6; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <p style="margin-top: 10px; font-size: 10px; color: #666; font-style: italic;">{{ basename($t['bukti_file']) }}</p>
                            </div>
                        @else
                            <div style="padding: 30px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; text-align: center; margin-top: 15px;">
                                <p style="margin-bottom: 8px; color: #856404; font-weight: 600;">Gagal Memuat Gambar</p>
                                <p style="font-size: 10px; color: #856404;">{{ basename($t['bukti_file']) }}</p>
                            </div>
                        @endif
                    @elseif($fileExtension == 'pdf' && $fileExists)
                        {{-- Fallback: PDF file exists but not converted (Imagick not available) --}}
                        @php
                            $fileSize = filesize($filePath);
                            $fileSizeKB = round($fileSize / 1024, 2);
                        @endphp
                        
                        <div style="padding: 30px; background: #fff; border: 2px solid #dee2e6; border-radius: 8px; text-align: center; margin-top: 15px; page-break-inside: avoid;">
                            <div style="width: 64px; height: 64px; margin: 0 auto 15px; background: linear-gradient(135deg, #fee2e2, #fecaca); border-radius: 12px; display: table; padding: 16px;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" style="display: table-cell; vertical-align: middle;">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <p style="margin-bottom: 12px; color: #1a1a1a; font-weight: 700; font-size: 14px;">📄 Bukti File PDF Terlampir</p>
                            <div style="padding: 12px 16px; background: #f8f9fa; border-radius: 6px; display: inline-block; margin-bottom: 12px;">
                                <p style="font-size: 11px; color: #666; font-family: monospace; margin: 0;">{{ basename($t['bukti_file']) }}</p>
                                <p style="font-size: 10px; color: #999; margin-top: 4px;">Ukuran: {{ $fileSizeKB }} KB</p>
                            </div>
                            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 12px; margin-top: 12px;">
                                <p style="font-size: 10px; color: #856404; margin: 0; line-height: 1.6;">
                                    <strong>⚠️ Catatan:</strong><br>
                                    PDF tidak dapat dikonversi menjadi gambar.<br>
                                    Install Imagick extension untuk menampilkan isi PDF di laporan.<br>
                                    Atau akses file asli melalui sistem SIMANTESA.
                                </p>
                            </div>
                        </div>
                    @else
                        {{-- File not found or unsupported format --}}
                        <div style="padding: 30px; background: #fff3cd; border: 2px dashed #ffc107; border-radius: 8px; text-align: center; margin-top: 15px;">
                            <div style="width: 64px; height: 64px; margin: 0 auto 15px; background: #fff; border-radius: 12px; display: table; padding: 16px;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#856404" stroke-width="2" style="display: table-cell; vertical-align: middle;">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <p style="margin-bottom: 8px; color: #856404; font-weight: 700; font-size: 14px;">
                                @if(!$fileExists)
                                    File Bukti Tidak Ditemukan
                                @else
                                    Format File Tidak Didukung
                                @endif
                            </p>
                            <p style="font-size: 10px; color: #856404; font-family: monospace;">{{ basename($t['bukti_file']) }}</p>
                            @if(!$fileExists)
                                <p style="font-size: 9px; color: #999; margin-top: 8px; font-style: italic;">File mungkin telah dihapus atau dipindahkan</p>
                            @endif
                        </div>
                    @endif
                </div>
                
                @if(($index + 1) % 2 == 0 && $index < count($transaksi) - 1)
                    <div class="page-break"></div>
                @endif
            @endforeach
        </div>
    @endif

    {{-- Footer --}}
    <div class="footer">
        <p>Dokumen ini digenerate secara otomatis oleh SIMANTESA</p>
        <p>Sistem Manajemen Aset dan Transparansi Keuangan Desa</p>
        <p style="margin-top: 5px;">© {{ date('Y') }} SIMANTESA - All rights reserved</p>
    </div>
</body>
</html>
