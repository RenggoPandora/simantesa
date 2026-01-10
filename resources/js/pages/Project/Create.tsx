import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_project: '',
        tanggal_mulai: '',
        status: 'berlangsung',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/projects');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Project" />

            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Tambah Project</h2>
                            <p className="text-gray-600">Buat project baru untuk pelaporan keuangan</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        placeholder="Contoh: Pembangunan Jalan Desa"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    >
                                        <option value="berlangsung">Berlangsung</option>
                                        <option value="selesai">Selesai</option>
                                        <option value="dibatalkan">Dibatalkan</option>
                                    </select>
                                    {errors.status && (
                                        <div className="mt-1 text-sm text-red-600">{errors.status}</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <Link
                                        href="/projects"
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
