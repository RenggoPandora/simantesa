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
                    <h2 className="text-3xl font-bold text-gray-900">Dashboard Super Admin</h2>
                    <p className="text-gray-600 mt-1">Sistem Inventaris Aset dan Transparansi Keuangan Desa</p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Data</h3>
                    <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="tanggal_mulai" className="block text-sm font-medium text-gray-900 mb-2">
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
                                style={{ colorScheme: 'light' }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white"
                            />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="tanggal_akhir" className="block text-sm font-medium text-gray-900 mb-2">
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
                                style={{ colorScheme: 'light' }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm hover:shadow-md"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm border border-red-200 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-medium text-red-700">Total Aset Desa</div>
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-red-900">{stats.totalAset}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-medium text-gray-600">Total Project Aktif</div>
                                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-gray-900">{stats.totalProjectAktif}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-medium text-gray-600">Total Pemasukan</div>
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                </div>
                                <div className="text-2xl font-bold text-green-600">{formatRupiah(stats.totalPemasukan)}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-medium text-gray-600">Total Pengeluaran</div>
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                    </svg>
                                </div>
                                <div className="text-2xl font-bold text-red-600">{formatRupiah(stats.totalPengeluaran)}</div>
                            </div>
                        </div>

                        {/* Aktivitas Terbaru */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {aktivitasTerbaru.map((transaksi) => (
                                        <div key={transaksi.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                        transaksi.tipe === 'pemasukan' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {transaksi.tipe}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-900">{transaksi.keterangan}</span>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500">
                                                    {transaksi.project.nama_project} • {transaksi.creator.name} • {new Date(transaksi.tanggal).toLocaleDateString('id-ID')}
                                                </div>
                                            </div>
                                            <div className={`text-lg font-bold ${
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
