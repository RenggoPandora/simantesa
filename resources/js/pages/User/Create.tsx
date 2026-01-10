import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'perangkat_desa',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    const breadcrumbs = [
        { title: 'Manajemen User', href: '/users' },
        { title: 'Tambah User' }
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah User" />

            <div className="max-w-3xl">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Tambah User</h2>
                            <p className="text-gray-600">Buat akun user baru</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                    {errors.name && (
                                        <div className="mt-1 text-sm text-red-600">{errors.name}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        placeholder="contoh@email.com"
                                    />
                                    {errors.email && (
                                        <div className="mt-1 text-sm text-red-600">{errors.email}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Role <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="role"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    >
                                        <option value="perangkat_desa">Perangkat Desa</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                    {errors.role && (
                                        <div className="mt-1 text-sm text-red-600">{errors.role}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        placeholder="Minimal 8 karakter"
                                    />
                                    {errors.password && (
                                        <div className="mt-1 text-sm text-red-600">{errors.password}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                        Konfirmasi Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        placeholder="Ulangi password"
                                    />
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <Link
                                        href="/users"
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
        </AuthenticatedLayout>
    );
}
