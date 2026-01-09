import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

interface Stats {
    jumlahProject: number;
    totalPemasukan: number;
    totalPengeluaran: number;
    sisaDana: number;
}

interface Props {
    stats: Stats;
}

export default function PerangkatDesa({ stats }: Props) {
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
