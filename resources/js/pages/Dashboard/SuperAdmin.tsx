import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { FormEvent, useState } from 'react';

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

interface Filters {
    tanggal_mulai?: string;
    tanggal_akhir?: string;
}

interface Props {
    stats: Stats;
    aktivitasTerbaru: Transaksi[];
    filters: Filters;
}

export default function SuperAdmin({ stats, aktivitasTerbaru, filters = {} }: Props) {
    const [tanggalMulai, setTanggalMulai] = useState(filters.tanggal_mulai || '');
    const [tanggalAkhir, setTanggalAkhir] = useState(filters.tanggal_akhir || '');

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        console.log('Filter clicked:', { tanggalMulai, tanggalAkhir });
        router.get('/dashboard', {
            tanggal_mulai: tanggalMulai,
            tanggal_akhir: tanggalAkhir,
        });
    };

    const handleReset = () => {
        console.log('Reset clicked');
        setTanggalMulai('');
        setTanggalAkhir('');
        router.get('/dashboard');
    };

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

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Data</h3>
                    <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="tanggal_mulai" className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Mulai
                            </label>
                            <input
                                type="date"
                                id="tanggal_mulai"
                                name="tanggal_mulai"
                                value={tanggalMulai}
                                onChange={(e) => {
                                    console.log('Tanggal Mulai changed:', e.target.value);
                                    setTanggalMulai(e.target.value);
                                }}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="tanggal_akhir" className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Akhir
                            </label>
                            <input
                                type="date"
                                id="tanggal_akhir"
                                name="tanggal_akhir"
                                value={tanggalAkhir}
                                onChange={(e) => {
                                    console.log('Tanggal Akhir changed:', e.target.value);
                                    setTanggalAkhir(e.target.value);
                                }}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
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
