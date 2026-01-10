import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

interface Project {
    id: number;
    nama_project: string;
    tanggal_mulai: string;
    status: string;
    owner?: string;
    total_pemasukan: number;
    total_pengeluaran: number;
    sisa_dana: number;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    projects: Project[];
    users?: User[];
}

export default function Index({ projects, users }: Props) {
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; nama: string }>({
        isOpen: false,
        id: null,
        nama: '',
    });

    const handleDelete = (id: number, nama: string) => {
        setDeleteModal({ isOpen: true, id, nama });
    };

    const confirmDelete = () => {
        if (deleteModal.id) {
            router.delete(`/projects/${deleteModal.id}`);
        }
    };

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

    const breadcrumbs = [
        { title: 'Project' }
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Project" />

            <div>
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Daftar Project</h2>
                                <p className="text-gray-600">Kelola project dan pelaporan keuangan</p>
                            </div>
                            <Link
                                href="/projects/create"
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm hover:shadow-md"
                            >
                                Tambah Project
                            </Link>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-4">
                            {projects.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-500">
                                    Belum ada project
                                </div>
                            ) : (
                                projects.map((project) => (
                                    <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold text-gray-900 mb-1">{project.nama_project}</h3>
                                                <p className="text-xs text-gray-500">{new Date(project.tanggal_mulai).toLocaleDateString('id-ID')}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                                                {getStatusLabel(project.status)}
                                            </span>
                                        </div>
                                        
                                        {users && project.owner && (
                                            <div className="mb-3 pb-3 border-b border-gray-100">
                                                <p className="text-xs text-gray-500">Owner</p>
                                                <p className="text-sm font-medium text-gray-900">{project.owner}</p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Pemasukan</p>
                                                <p className="text-sm font-bold text-green-600">{formatRupiah(project.total_pemasukan)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Pengeluaran</p>
                                                <p className="text-sm font-bold text-red-600">{formatRupiah(project.total_pengeluaran)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Sisa Dana</p>
                                                <p className="text-sm font-bold text-gray-900">{formatRupiah(project.sisa_dana)}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="flex-1 px-3 py-2 text-center text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                                            >
                                                Detail
                                            </Link>
                                            <Link
                                                href={`/projects/${project.id}/edit`}
                                                className="flex-1 px-3 py-2 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id, project.nama_project)}
                                                className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Project
                                            </th>
                                            {users && (
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Owner
                                                </th>
                                            )}
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Mulai
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pemasukan
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pengeluaran
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sisa Dana
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {projects.length === 0 ? (
                                            <tr>
                                                <td colSpan={users ? 8 : 7} className="px-6 py-4 text-center text-gray-500">
                                                    Belum ada project
                                                </td>
                                            </tr>
                                        ) : (
                                            projects.map((project) => (
                                                <tr key={project.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{project.nama_project}</div>
                                                    </td>
                                                    {users && (
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{project.owner}</div>
                                                        </td>
                                                    )}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(project.tanggal_mulai).toLocaleDateString('id-ID')}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(project.status)}`}>
                                                            {getStatusLabel(project.status)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <div className="text-sm text-green-600 font-semibold">{formatRupiah(project.total_pemasukan)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <div className="text-sm text-red-600 font-semibold">{formatRupiah(project.total_pengeluaran)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <div className="text-sm text-gray-900 font-semibold">{formatRupiah(project.sisa_dana)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link
                                                            href={`/projects/${project.id}`}
                                                            className="text-red-600 hover:text-red-900 mr-3"
                                                        >
                                                            Detail
                                                        </Link>
                                                        <Link
                                                            href={`/projects/${project.id}/edit`}
                                                            className="text-gray-600 hover:text-gray-900 mr-3"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(project.id, project.nama_project)}
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
                onClose={() => setDeleteModal({ isOpen: false, id: null, nama: '' })}
                onConfirm={confirmDelete}
                title="Hapus Project"
                message="Apakah Anda yakin ingin menghapus project ini? Semua transaksi terkait juga akan dihapus."
                itemName={deleteModal.nama}
            />
        </AuthenticatedLayout>
    );
}
