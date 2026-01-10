import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gray-50 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700">
                                <span className="text-white font-bold text-2xl">S</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">SIMANTESA</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                            <p className="text-center text-sm text-gray-600">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
