import { Link, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'super_admin' | 'perangkat_desa';
}

interface Props {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: Props) {
    const page = usePage();
    const { auth } = page.props as { auth: { user: User } };
    const user = auth.user;
    const url = page.url;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return url === '/dashboard' || url === '/';
        }
        return url.startsWith(path);
    };

    const navLinkClass = (path: string) => {
        const base = "flex items-center px-4 py-3 text-sm font-medium transition-all rounded-lg mx-2 my-1";
        return isActive(path)
            ? `${base} bg-red-600 text-white shadow-md`
            : `${base} text-gray-700 hover:bg-red-50 hover:text-red-700`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center mb-8 px-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">SIMANTESA</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        <Link href="/dashboard" className={navLinkClass('/dashboard')}>
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </Link>

                        <Link href="/aset" className={navLinkClass('/aset')}>
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Inventaris Aset
                        </Link>

                        <Link href="/projects" className={navLinkClass('/projects')}>
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Project
                        </Link>

                        {user.role === 'super_admin' && (
                            <Link href="/users" className={navLinkClass('/users')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Manajemen User
                            </Link>
                        )}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center mb-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-700 font-semibold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button"
                            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Keluar
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Mobile header */}
                <header className="sticky top-0 z-20 bg-white border-b border-gray-200 lg:hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className="text-lg font-bold text-gray-900">SIMANTESA</span>
                        <div className="w-6"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
