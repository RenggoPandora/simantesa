import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
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
    // Convert to pure number first, lalu ke string untuk memastikan format bersih
    const rawNominal = String(Math.floor(Number(transaksi.nominal)));
    
    // Format tanggal ke YYYY-MM-DD untuk input date
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        tipe: transaksi.tipe,
        keterangan: transaksi.keterangan,
        nominal: rawNominal,
        tanggal: formatDateForInput(transaksi.tanggal),
        penanggung_jawab: transaksi.penanggung_jawab,
        bukti_file: null as File | null,
    });

    const formatNumber = (value: string) => {
        // Pastikan hanya ambil digit
        const numbers = value.replace(/\D/g, '');
        // Format dengan titik sebagai thousand separator
        return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const [displayNominal, setDisplayNominal] = useState(() => formatNumber(rawNominal));

    const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setData('nominal', rawValue);
        setDisplayNominal(formatNumber(rawValue));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Jika ada file baru, gunakan post dengan file
        if (data.bukti_file) {
            post(`/transaksi/${transaksi.id}`, {
                forceFormData: true,
            });
        } else {
            // Jika tidak ada file baru, kirim data tanpa bukti_file
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { bukti_file, ...dataWithoutFile } = data;
            // @ts-expect-error - Inertia types don't match our usage
            post(`/transaksi/${transaksi.id}`, dataWithoutFile);
        }
    };

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const breadcrumbs = [
        { title: 'Project', href: '/projects' },
        { title: project.nama_project, href: `/projects/${project.id}` },
        { title: 'Edit Transaksi' }
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Transaksi" />

            <div className="max-w-3xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Transaksi</h2>
                    <p className="text-gray-600">Project: <span className="font-semibold">{project.nama_project}</span></p>
                    <p className="text-sm text-gray-900 mt-1">Sisa Dana: <span className="font-bold">{formatRupiah(project.sisa_dana)}</span></p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="tipe" className="block text-sm font-medium text-gray-700 mb-2">
                                        Jenis Transaksi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="tipe"
                                        value={data.tipe}
                                        onChange={(e) => setData('tipe', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
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
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                                    />
                                    {errors.penanggung_jawab && (
                                        <div className="mt-1 text-sm text-red-600">{errors.penanggung_jawab}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="bukti_file" className="block text-sm font-medium text-gray-700 mb-2">
                                        Bukti File Baru (Opsional)
                                    </label>
                                    <input
                                        type="file"
                                        id="bukti_file"
                                        onChange={(e) => setData('bukti_file', e.target.files ? e.target.files[0] : null)}
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Kosongkan jika tidak ingin mengubah bukti. Maksimal 2MB.</p>
                                    <div className="mt-2">
                                        <a 
                                            href={`/storage/${transaksi.bukti_file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                        >
                                            📎 Lihat Bukti Saat Ini
                                        </a>
                                    </div>
                                    {errors.bukti_file && (
                                        <div className="mt-1 text-sm text-red-600">{errors.bukti_file}</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/projects/${project.id}`}
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
