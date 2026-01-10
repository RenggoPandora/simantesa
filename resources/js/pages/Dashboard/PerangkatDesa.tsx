import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { FormEvent, useState } from 'react';

interface Stats {
    jumlahProject: number;
    totalPemasukan: number;
    totalPengeluaran: number;
    sisaDana: number;
}

interface Filters {
    tanggal_mulai?: string;
    tanggal_akhir?: string;
}

interface Props {
    stats: Stats;
    filters: Filters;
}

export default function PerangkatDesa({ stats, filters = {} }: Props) {
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
            <Head title="Dashboard Perangkat Desa" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Perangkat Desa</h2>
                    <p className="text-gray-600">Kelola project dan pelaporan keuangan Anda</p>
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
                                onChange={(e) => setTanggalMulai(e.target.value)}
                                style={{ colorScheme: 'light' }}
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
                                onChange={(e) => setTanggalAkhir(e.target.value)}
                                style={{ colorScheme: 'light' }}
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
                                <div className="text-sm font-medium text-gray-500">Jumlah Project</div>
                                <div className="mt-2 text-3xl font-semibold text-gray-900">{stats.jumlahProject}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-sm font-medium text-gray-500">Total Pemasukan</div>
                                <div className="mt-2 text-xl font-semibold text-green-600">{formatRupiah(stats.totalPemasukan)}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-sm font-medium text-gray-500">Total Pengeluaran</div>
                                <div className="mt-2 text-xl font-semibold text-red-600">{formatRupiah(stats.totalPengeluaran)}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-sm font-medium text-gray-500">Sisa Dana</div>
                                <div className="mt-2 text-xl font-semibold text-blue-600">{formatRupiah(stats.sisaDana)}</div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">Akses Cepat</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Link 
                                        href="/aset"
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">Inventaris Aset</div>
                                            <div className="text-sm text-gray-500">Kelola aset desa</div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <Link 
                                        href="/projects"
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">Project Saya</div>
                                            <div className="text-sm text-gray-500">Kelola project dan keuangan</div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
