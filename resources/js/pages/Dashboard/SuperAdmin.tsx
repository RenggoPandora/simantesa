import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

interface Stats {
    totalAset: number;
    totalProjectAktif: number;
    totalPemasukan: number;
    totalPengeluaran: number;
}

interface Transaksi {
    id: number;
    tanggal: string;
    tipe: string;
    keterangan: string;
    nominal: number;
    project: {
        nama_project: string;
    };
    creator: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    aktivitasTerbaru: Transaksi[];
}

export default function SuperAdmin({ stats, aktivitasTerbaru }: Props) {
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Super Admin" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Super Admin</h2>
                    <p className="text-gray-600">Sistem Inventaris Aset dan Transparansi Keuangan Desa</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-sm font-medium text-gray-500">Total Aset Desa</div>
                                <div className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalAset}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-sm font-medium text-gray-500">Total Project Aktif</div>
                                <div className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalProjectAktif}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-sm font-medium text-gray-500">Total Pemasukan</div>
                                <div className="mt-2 text-2xl font-semibold text-green-600">{formatRupiah(stats.totalPemasukan)}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-sm font-medium text-gray-500">Total Pengeluaran</div>
                                <div className="mt-2 text-2xl font-semibold text-red-600">{formatRupiah(stats.totalPengeluaran)}</div>
                            </div>
                        </div>

                        {/* Aktivitas Terbaru */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {aktivitasTerbaru.map((transaksi) => (
                                        <div key={transaksi.id} className="flex items-center justify-between border-b pb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                                        transaksi.tipe === 'pemasukan' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {transaksi.tipe}
                                                    </span>
                                                    <span className="text-sm text-gray-900">{transaksi.keterangan}</span>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500">
                                                    {transaksi.project.nama_project} • {transaksi.creator.name} • {new Date(transaksi.tanggal).toLocaleDateString('id-ID')}
                                                </div>
                                            </div>
                                            <div className={`text-lg font-semibold ${
                                                transaksi.tipe === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {transaksi.tipe === 'pemasukan' ? '+' : '-'}{formatRupiah(transaksi.nominal)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                </div>
        </AuthenticatedLayout>
    );
}
