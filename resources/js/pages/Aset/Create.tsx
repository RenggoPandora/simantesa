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
                            <h2 className="text-2xl font-bold text-gray-800">Tambah Aset</h2>
                            <p className="text-gray-600">Tambahkan aset baru ke inventaris</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Tambahkan keterangan jika diperlukan..."
                                    />
                                    {errors.keterangan && (
                                        <div className="mt-1 text-sm text-red-600">{errors.keterangan}</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <Link
                                        href="/aset"
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
