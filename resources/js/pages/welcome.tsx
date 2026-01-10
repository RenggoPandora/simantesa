import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to SIMANTESA">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">S</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">SIMANTESA</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium shadow-sm hover:shadow-md"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={login()}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium shadow-sm hover:shadow-md"
                                    >
                                        Masuk
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full mb-6">
                                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></span>
                                <span className="text-sm font-medium text-red-700">Sistem Manajemen Desa Modern</span>
                            </div>
                            
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                                Sistem Inventaris Aset & <span className="text-red-600">Transparansi Keuangan</span> Desa
                            </h1>
                            
                            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                                Platform digital yang memudahkan pengelolaan aset desa dan pelaporan keuangan berbasis proyek dengan transparansi penuh untuk masyarakat.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Buka Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={login()}
                                        className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Masuk ke Sistem
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
                            <p className="text-xl text-gray-600">Solusi lengkap untuk manajemen desa yang efisien dan transparan</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Inventaris Aset Desa</h3>
                                <p className="text-gray-600 leading-relaxed">Kelola dan pantau seluruh aset desa dengan sistem pencatatan yang terstruktur dan mudah diakses.</p>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Laporan Keuangan</h3>
                                <p className="text-gray-600 leading-relaxed">Pelaporan keuangan berbasis proyek dengan tracking pemasukan dan pengeluaran real-time.</p>
                            </div>
                            
                            {/* Feature 3 */}
                            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparansi Penuh</h3>
                                <p className="text-gray-600 leading-relaxed">Setiap transaksi tercatat dengan bukti file pendukung untuk akuntabilitas maksimal.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-5xl font-bold text-red-500 mb-2">100%</div>
                                <div className="text-gray-300 text-lg">Transparansi Data</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold text-red-500 mb-2">Real-time</div>
                                <div className="text-gray-300 text-lg">Update Keuangan</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold text-red-500 mb-2">Aman</div>
                                <div className="text-gray-300 text-lg">Role-Based Access</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Siap Meningkatkan Transparansi Desa Anda?</h2>
                        <p className="text-xl text-gray-600 mb-10">Hubungi administrator untuk mendapatkan akses ke sistem SIMANTESA.</p>
                        
                        {!auth.user && (
                            <Link
                                href={login()}
                                className="inline-block px-10 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Masuk ke Sistem
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">S</span>
                                    </div>
                                    <span className="text-lg font-bold">SIMANTESA</span>
                                </div>
                                <p className="text-gray-400 text-sm">Sistem Inventaris Aset dan Transparansi Keuangan Desa</p>
                            </div>
                            <div className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} SIMANTESA. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
