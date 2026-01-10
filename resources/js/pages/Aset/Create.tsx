import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_aset: '',
        jumlah: '',
        kondisi: 'baik',
        keterangan: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/aset');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Aset" />

            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        href="/aset"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 mb-4 transition"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar Aset
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Tambah Aset</h2>
                    <p className="text-gray-600">Tambahkan aset baru ke inventaris</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="nama_aset" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Aset <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_aset"
                                        value={data.nama_aset}
                                        onChange={(e) => setData('nama_aset', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                        placeholder="Contoh: Laptop Dell"
                                    />
                                    {errors.nama_aset && (
                                        <div className="mt-1 text-sm text-red-600">{errors.nama_aset}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="jumlah"
                                        value={data.jumlah}
                                        onChange={(e) => setData('jumlah', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                        placeholder="0"
                                        min="1"
                                    />
                                    {errors.jumlah && (
                                        <div className="mt-1 text-sm text-red-600">{errors.jumlah}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="kondisi" className="block text-sm font-medium text-gray-700 mb-2">
                                        Kondisi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="kondisi"
                                        value={data.kondisi}
                                        onChange={(e) => setData('kondisi', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                    >
                                        <option value="baik">Baik</option>
                                        <option value="rusak_ringan">Rusak Ringan</option>
                                        <option value="rusak_berat">Rusak Berat</option>
                                    </select>
                                    {errors.kondisi && (
                                        <div className="mt-1 text-sm text-red-600">{errors.kondisi}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-2">
                                        Keterangan
                                    </label>
                                    <textarea
                                        id="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                        placeholder="Tambahkan keterangan jika diperlukan..."
                                    />
                                    {errors.keterangan && (
                                        <div className="mt-1 text-sm text-red-600">{errors.keterangan}</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                                    <Link
                                        href="/aset"
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-medium shadow-sm hover:shadow-md"
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
