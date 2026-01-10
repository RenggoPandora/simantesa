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
                    <h2 className="text-3xl font-bold text-gray-900">Dashboard Perangkat Desa</h2>
                    <p className="text-gray-600 mt-1">Kelola project dan pelaporan keuangan Anda</p>
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
                                onChange={(e) => setTanggalMulai(e.target.value)}
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
                                onChange={(e) => setTanggalAkhir(e.target.value)}
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
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-sm font-medium text-red-700 pr-2 flex-1">Jumlah Project</div>
                                    <svg className="w-8 h-8 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-red-900">{stats.jumlahProject}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-sm font-medium text-gray-600 pr-2 flex-1">Total Pemasukan</div>
                                    <svg className="w-8 h-8 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                </div>
                                <div className="text-lg font-bold text-green-600 break-words">{formatRupiah(stats.totalPemasukan)}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-sm font-medium text-gray-600 pr-2 flex-1">Total Pengeluaran</div>
                                    <svg className="w-8 h-8 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                    </svg>
                                </div>
                                <div className="text-lg font-bold text-red-600 break-words">{formatRupiah(stats.totalPengeluaran)}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-sm font-medium text-gray-600 pr-2 flex-1">Sisa Dana</div>
                                    <svg className="w-8 h-8 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div className="text-lg font-bold text-gray-900 break-words">{formatRupiah(stats.sisaDana)}</div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Akses Cepat</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Link 
                                        href="/aset"
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition group"
                                    >
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900 group-hover:text-red-700">Inventaris Aset</div>
                                            <div className="text-sm text-gray-500">Kelola aset desa</div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <Link 
                                        href="/projects"
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition group"
                                    >
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900 group-hover:text-red-700">Project Saya</div>
                                            <div className="text-sm text-gray-500">Kelola project dan keuangan</div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
