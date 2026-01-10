import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

interface Project {
    id: number;
    nama_project: string;
    tanggal_mulai: string;
    status: string;
}

interface Props {
    project: Project;
}

export default function Edit({ project }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama_project: project.nama_project,
        tanggal_mulai: project.tanggal_mulai,
        status: project.status,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/projects/${project.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Project" />

            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 mb-4 transition"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar Project
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Project</h2>
                    <p className="text-gray-600">Update informasi project</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="nama_project" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Project <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_project"
                                        value={data.nama_project}
                                        onChange={(e) => setData('nama_project', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                    />
                                    {errors.nama_project && (
                                        <div className="mt-1 text-sm text-red-600">{errors.nama_project}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="tanggal_mulai" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal_mulai"
                                        value={data.tanggal_mulai}
                                        onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                        style={{ colorScheme: 'light' }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                    />
                                    {errors.tanggal_mulai && (
                                        <div className="mt-1 text-sm text-red-600">{errors.tanggal_mulai}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as 'berlangsung' | 'selesai' | 'dibatalkan')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                    >
                                        <option value="berlangsung">Berlangsung</option>
                                        <option value="selesai">Selesai</option>
                                        <option value="dibatalkan">Dibatalkan</option>
                                    </select>
                                    {errors.status && (
                                        <div className="mt-1 text-sm text-red-600">{errors.status}</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                                    <Link
                                        href="/projects"
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-medium shadow-sm hover:shadow-md"
                                    >
                                        {processing ? 'Menyimpan...' : 'Update'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
        </AuthenticatedLayout>
    );
}
