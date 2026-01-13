import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

interface Project {
    id: number;
    nama_project: string;
    tanggal_mulai: string;
    status: string;
    owner: string;
    total_pemasukan: number;
    total_pengeluaran: number;
    sisa_dana: number;
}

interface Transaksi {
    id: number;
    tanggal: string;
    tipe: string;
    keterangan: string;
    nominal: number;
    penanggung_jawab: string;
    bukti_file: string;
    bukti_files?: string[];
    created_by: string;
}

interface Props {
    project: Project;
    transaksi: Transaksi[];
}

export default function Show({ project, transaksi }: Props) {
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; keterangan: string }>({
        isOpen: false,
        id: null,
        keterangan: '',
    });
    const [buktiModal, setBuktiModal] = useState<{ isOpen: boolean; files: string[]; keterangan: string }>({
        isOpen: false,
        files: [],
        keterangan: '',
    });

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            berlangsung: 'bg-blue-100 text-blue-800',
            selesai: 'bg-green-100 text-green-800',
            dibatalkan: 'bg-red-100 text-red-800',
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            berlangsung: 'Berlangsung',
            selesai: 'Selesai',
            dibatalkan: 'Dibatalkan',
        };
        return labels[status] || status;
    };

    const handleDelete = (id: number, keterangan: string) => {
        setDeleteModal({ isOpen: true, id, keterangan });
    };

    const confirmDelete = () => {
        if (deleteModal.id) {
            router.delete(`/transaksi/${deleteModal.id}`);
        }
    };

    const handleViewBukti = (t: Transaksi) => {
        const files = t.bukti_files && t.bukti_files.length > 0 ? t.bukti_files : [t.bukti_file];
        console.log('Opening bukti modal with files:', files);
        console.log('Keterangan:', t.keterangan);
        setBuktiModal({ isOpen: true, files, keterangan: t.keterangan });
    };

    const breadcrumbs = [
        { title: 'Project', href: '/projects' },
        { title: project.nama_project }
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Project - ${project.nama_project}`} />

            <div>
                {/* Project Info */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{project.nama_project}</h2>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(project.status)} w-fit`}>
                            {getStatusLabel(project.status)}
                        </span>
                    </div>
                    <p className="text-gray-600">Owner: {project.owner} • Tanggal Mulai: {new Date(project.tanggal_mulai).toLocaleDateString('id-ID')}</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="text-sm font-medium text-gray-500 mb-2">Total Pemasukan</div>
                        <div className="text-2xl font-bold text-green-600">{formatRupiah(project.total_pemasukan)}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="text-sm font-medium text-gray-500 mb-2">Total Pengeluaran</div>
                        <div className="text-2xl font-bold text-red-600">{formatRupiah(project.total_pengeluaran)}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="text-sm font-medium text-gray-500 mb-2">Sisa Dana</div>
                        <div className="text-2xl font-bold text-gray-900">{formatRupiah(project.sisa_dana)}</div>
                    </div>
                </div>

                {/* Transaksi Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">Transaksi Keuangan</h3>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <a
                                href={`/projects/${project.id}/export-pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-white border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium shadow-sm hover:shadow-md text-center inline-flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export PDF
                            </a>
                            <Link
                                href={`/transaksi/create?project_id=${project.id}`}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium shadow-sm hover:shadow-md text-center"
                            >
                                Tambah Transaksi
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jenis
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Keterangan
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nominal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Penanggung Jawab
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Bukti
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transaksi.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                                    Belum ada transaksi
                                                </td>
                                            </tr>
                                        ) : (
                                            transaksi.map((t) => (
                                                <tr key={t.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(t.tanggal).toLocaleDateString('id-ID')}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                                            t.tipe === 'pemasukan' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {t.tipe}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">{t.keterangan}</div>
                                                        <div className="text-xs text-gray-500">oleh {t.created_by}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <div className={`text-sm font-semibold ${
                                                            t.tipe === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                            {t.tipe === 'pemasukan' ? '+' : '-'}{formatRupiah(t.nominal)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{t.penanggung_jawab}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleViewBukti(t)}
                                                            className="text-red-600 hover:text-red-900 text-sm font-medium inline-flex items-center gap-1"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            Lihat Bukti
                                                            {t.bukti_files && t.bukti_files.length > 1 && (
                                                                <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-semibold">
                                                                    {t.bukti_files.length}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link
                                                            href={`/transaksi/${t.id}/edit`}
                                                            className="text-red-600 hover:text-red-900 mr-3"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(t.id, t.keterangan)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null, keterangan: '' })}
                onConfirm={confirmDelete}
                title="Hapus Transaksi"
                message="Apakah Anda yakin ingin menghapus transaksi ini?"
                itemName={deleteModal.keterangan}
            />

            {/* Modal Lihat Bukti */}
            {buktiModal.isOpen && (
                <div 
                    className="fixed inset-0 z-[9999] overflow-y-auto bg-black bg-opacity-50" 
                    aria-labelledby="modal-title" 
                    role="dialog" 
                    aria-modal="true"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setBuktiModal({ isOpen: false, files: [], keterangan: '' });
                        }
                    }}
                >
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            {/* Header */}
                            <div className="px-6 py-4 bg-red-600 flex items-center justify-between rounded-t-lg">
                                <h3 className="text-lg font-semibold text-white">Bukti Transaksi</h3>
                                <button
                                    onClick={() => setBuktiModal({ isOpen: false, files: [], keterangan: '' })}
                                    className="text-white hover:text-gray-200 transition"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Content */}
                            <div className="px-6 py-4 bg-white max-h-[80vh] overflow-y-auto">
                                <p className="text-sm text-gray-600 mb-4 font-medium">{buktiModal.keterangan}</p>
                                
                                {buktiModal.files.length > 1 && (
                                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800 font-medium">
                                            📄 Dokumen Multi-Halaman: {buktiModal.files.length} halaman
                                        </p>
                                    </div>
                                )}
                                
                                <div className="space-y-6">
                                    {buktiModal.files.map((file, index) => (
                                        <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                            {buktiModal.files.length > 1 && (
                                                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Halaman {index + 1} dari {buktiModal.files.length}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="p-4 bg-white">
                                                <img 
                                                    src={`/storage/${file}`} 
                                                    alt={`Bukti halaman ${index + 1}`}
                                                    className="w-full h-auto rounded border border-gray-300"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        const parent = target.parentElement;
                                                        if (parent) {
                                                            parent.innerHTML = `<div class="p-8 text-center bg-red-50 border border-red-200 rounded">
                                                                <p class="text-red-600 font-medium">Gagal memuat gambar</p>
                                                                <p class="text-sm text-red-500 mt-1">${file}</p>
                                                            </div>`;
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                                <a
                                                    href={`/storage/${file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-red-600 hover:text-red-800 font-medium inline-flex items-center gap-1 hover:underline"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Buka di Tab Baru
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="px-6 py-4 bg-gray-50 flex justify-end border-t border-gray-200 rounded-b-lg">
                                <button
                                    onClick={() => setBuktiModal({ isOpen: false, files: [], keterangan: '' })}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
