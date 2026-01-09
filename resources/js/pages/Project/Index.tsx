import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

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
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus project ini?')) {
            router.delete(`/projects/${id}`);
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

    return (
        <AuthenticatedLayout>
            <Head title="Project" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Daftar Project</h2>
                                <p className="text-gray-600">Kelola project dan pelaporan keuangan</p>
                            </div>
                            <Link
                                href="/projects/create"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Tambah Project
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                                                    <div className="text-sm text-blue-600 font-semibold">{formatRupiah(project.sisa_dana)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={`/projects/${project.id}`}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href={`/projects/${project.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
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
        </AuthenticatedLayout>
    );
}
