import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

interface Aset {
    id: number;
    nama_aset: string;
    jumlah: number;
    kondisi: string;
    keterangan?: string;
}

interface Props {
    aset: Aset[];
}

export default function Index({ aset }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus aset ini?')) {
            router.delete(`/aset/${id}`);
        }
    };

    const getKondisiBadge = (kondisi: string) => {
        const badges: Record<string, string> = {
            baik: 'bg-green-100 text-green-800',
            rusak_ringan: 'bg-yellow-100 text-yellow-800',
            rusak_berat: 'bg-red-100 text-red-800',
        };
        return badges[kondisi] || 'bg-gray-100 text-gray-800';
    };

    const getKondisiLabel = (kondisi: string) => {
        const labels: Record<string, string> = {
            baik: 'Baik',
            rusak_ringan: 'Rusak Ringan',
            rusak_berat: 'Rusak Berat',
        };
        return labels[kondisi] || kondisi;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Inventaris Aset" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Inventaris Aset</h2>
                                <p className="text-gray-600">Kelola inventaris aset desa</p>
                            </div>
                            <Link
                                href="/aset/create"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Tambah Aset
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Aset
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kondisi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Keterangan
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {aset.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                Belum ada data aset
                                            </td>
                                        </tr>
                                    ) : (
                                        aset.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{item.nama_aset}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{item.jumlah}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getKondisiBadge(item.kondisi)}`}>
                                                        {getKondisiLabel(item.kondisi)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">{item.keterangan || '-'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={`/aset/${item.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
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
