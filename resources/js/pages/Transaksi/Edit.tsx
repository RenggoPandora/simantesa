import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState, useEffect } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

interface Transaksi {
    id: number;
    project_id: number;
    tipe: string;
    keterangan: string;
    nominal: number;
    tanggal: string;
    penanggung_jawab: string;
    bukti_file: string;
}

interface Project {
    id: number;
    nama_project: string;
    sisa_dana: number;
}

interface Props {
    transaksi: Transaksi;
    project: Project;
}

export default function Edit({ transaksi, project }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        tipe: transaksi.tipe,
        keterangan: transaksi.keterangan,
        nominal: transaksi.nominal.toString(),
        tanggal: transaksi.tanggal,
        penanggung_jawab: transaksi.penanggung_jawab,
        bukti_file: null as File | null,
    });

    const formatNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const [displayNominal, setDisplayNominal] = useState('');

    useEffect(() => {
        setDisplayNominal(formatNumber(transaksi.nominal.toString()));
    }, [transaksi.nominal]);

    const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setData('nominal', rawValue);
        setDisplayNominal(formatNumber(rawValue));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(`/transaksi/${transaksi.id}`);
    };

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Transaksi" />

            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <Link href={`/projects/${project.id}`} className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
                                ← Kembali ke Detail Project
                            </Link>
                            <h2 className="text-2xl font-bold text-gray-800">Edit Transaksi</h2>
                            <p className="text-gray-600">Project: {project.nama_project}</p>
                            <p className="text-sm text-blue-600">Sisa Dana: {formatRupiah(project.sisa_dana)}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="tipe" className="block text-sm font-medium text-gray-700 mb-2">
                                        Jenis Transaksi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="tipe"
                                        value={data.tipe}
                                        onChange={(e) => setData('tipe', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    >
                                        <option value="pemasukan">Pemasukan</option>
                                        <option value="pengeluaran">Pengeluaran</option>
                                    </select>
                                    {errors.tipe && (
                                        <div className="mt-1 text-sm text-red-600">{errors.tipe}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal"
                                        value={data.tanggal}
                                        onChange={(e) => setData('tanggal', e.target.value)}
                                        style={{ colorScheme: 'light' }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    />
                                    {errors.tanggal && (
                                        <div className="mt-1 text-sm text-red-600">{errors.tanggal}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-2">
                                        Keterangan <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    />
                                    {errors.keterangan && (
                                        <div className="mt-1 text-sm text-red-600">{errors.keterangan}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="nominal" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nominal <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-2 text-gray-500">Rp</span>
                                        <input
                                            type="text"
                                            id="nominal"
                                            value={displayNominal}
                                            onChange={handleNominalChange}
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            placeholder="0"
                                        />
                                    </div>
                                    {errors.nominal && (
                                        <div className="mt-1 text-sm text-red-600">{errors.nominal}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="penanggung_jawab" className="block text-sm font-medium text-gray-700 mb-2">
                                        Penanggung Jawab <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="penanggung_jawab"
                                        value={data.penanggung_jawab}
                                        onChange={(e) => setData('penanggung_jawab', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    />
                                    {errors.penanggung_jawab && (
                                        <div className="mt-1 text-sm text-red-600">{errors.penanggung_jawab}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="bukti_file" className="block text-sm font-medium text-gray-700 mb-2">
                                        Bukti File Baru (JPG, PNG, PDF)
                                    </label>
                                    <input
                                        type="file"
                                        id="bukti_file"
                                        onChange={(e) => setData('bukti_file', e.target.files ? e.target.files[0] : null)}
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Maksimal 2MB. Kosongkan jika tidak ingin mengubah bukti.</p>
                                    <div className="mt-2">
                                        <a 
                                            href={`/storage/${transaksi.bukti_file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Lihat Bukti Saat Ini
                                        </a>
                                    </div>
                                    {errors.bukti_file && (
                                        <div className="mt-1 text-sm text-red-600">{errors.bukti_file}</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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
