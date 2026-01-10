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

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Project - ${project.nama_project}`} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Project Info */}
                <div className="mb-6">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 mb-4 transition"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar Project
                    </Link>
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
                        <Link
                            href={`/transaksi/create?project_id=${project.id}`}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium shadow-sm hover:shadow-md w-full sm:w-auto text-center"
                        >
                            Tambah Transaksi
                        </Link>
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
                                                        <a 
                                                            href={`/storage/${t.bukti_file}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                        >
                                                            Lihat Bukti
                                                        </a>
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
        </AuthenticatedLayout>
    );
}
