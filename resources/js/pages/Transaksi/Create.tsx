import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import PdfToImageUpload from '@/components/PdfToImageUpload';

interface Project {
    id: number;
    nama_project: string;
    sisa_dana: number;
}

interface Props {
    project: Project;
}

export default function Create({ project }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: project.id.toString(),
        tipe: 'pemasukan',
        keterangan: '',
        nominal: '',
        tanggal: '',
        penanggung_jawab: '',
        bukti_files: [] as File[],
    });

    const [displayNominal, setDisplayNominal] = useState('');

    const formatNumber = (value: string) => {
        // Remove non-digit characters
        const numbers = value.replace(/\D/g, '');
        // Add thousand separators
        return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
        setData('nominal', rawValue); // Store raw number
        setDisplayNominal(formatNumber(rawValue)); // Display formatted
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Validate bukti_files
        if (!data.bukti_files || data.bukti_files.length === 0) {
            alert('Harap upload bukti file terlebih dahulu');
            return;
        }
        
        post('/transaksi');
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
        { title: 'Tambah Transaksi' }
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Transaksi" />

            <div className="max-w-3xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Tambah Transaksi</h2>
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
                                        placeholder="Jelaskan detail transaksi..."
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
                                        placeholder="Nama penanggung jawab"
                                    />
                                    {errors.penanggung_jawab && (
                                        <div className="mt-1 text-sm text-red-600">{errors.penanggung_jawab}</div>
                                    )}
                                </div>

                                <PdfToImageUpload
                                    name="bukti_files"
                                    label="Bukti File (JPG, PNG, PDF)"
                                    required={true}
                                    error={errors.bukti_file}
                                    onFileChange={(files) => setData('bukti_files', files)}
                                />

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
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
        </AuthenticatedLayout>
    );
}
