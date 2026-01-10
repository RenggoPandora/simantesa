import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; nama: string; email: string }>({
        isOpen: false,
        id: null,
        nama: '',
        email: '',
    });

    const handleDelete = (id: number, nama: string, email: string) => {
        setDeleteModal({ isOpen: true, id, nama, email });
    };

    const confirmDelete = () => {
        if (deleteModal.id) {
            router.delete(`/users/${deleteModal.id}`);
        }
    };

    const getRoleBadge = (role: string) => {
        return role === 'super_admin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800';
    };

    const getRoleLabel = (role: string) => {
        return role === 'super_admin' ? 'Super Admin' : 'Perangkat Desa';
    };

    const breadcrumbs = [
        { title: 'Manajemen User' }
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div>
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                                <p className="text-gray-600">Kelola akun user sistem</p>
                            </div>
                            <Link
                                href="/users/create"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Tambah User
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Terdaftar
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                Belum ada user
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getRoleBadge(user.role)}`}>
                                                        {getRoleLabel(user.role)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user.id, user.name, user.email)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null, nama: '', email: '' })}
                onConfirm={confirmDelete}
                title="Hapus User"
                message="Apakah Anda yakin ingin menghapus user ini?"
                itemName={`${deleteModal.nama} (${deleteModal.email})`}
            />
        </AuthenticatedLayout>
    );
}
