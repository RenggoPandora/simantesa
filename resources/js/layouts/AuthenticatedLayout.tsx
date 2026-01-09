import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

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

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return url === '/dashboard' || url === '/';
        }
        return url.startsWith(path);
    };

    const navLinkClass = (path: string) => {
        const base = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
        return isActive(path)
            ? `${base} bg-blue-600 text-white`
            : `${base} text-gray-700 hover:bg-gray-100 hover:text-gray-900`;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    <h1 className="text-xl font-bold text-gray-800">SIMANTESA</h1>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link 
                                href="/dashboard" 
                                className={navLinkClass('/dashboard')}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href="/aset" 
                                className={navLinkClass('/aset')}
                            >
                                Aset
                            </Link>
                            <Link 
                                href="/projects" 
                                className={navLinkClass('/projects')}
                            >
                                Project
                            </Link>
                            {user.role === 'super_admin' && (
                                <Link 
                                    href="/users" 
                                    className={navLinkClass('/users')}
                                >
                                    Users
                                </Link>
                            )}
                            <div className="ml-3 relative">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-700">{user.name}</span>
                                    <Link 
                                        href="/logout" 
                                        method="post" 
                                        as="button"
                                        className="text-sm text-red-600 hover:text-red-800"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                {children}
            </main>
        </div>
    );
}
