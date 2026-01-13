import { useState, useRef, useEffect } from 'react';

// Dynamically import pdfjs-dist
let pdfjsLib: any = null;

interface PdfToImageUploadProps {
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    currentFile?: string;
    onFileChange: (files: File[]) => void;
}

export default function PdfToImageUpload({
    name,
    label,
    error,
    required = false,
    currentFile,
    onFileChange,
}: PdfToImageUploadProps) {
    const [converting, setConverting] = useState(false);
    const [preview, setPreview] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const [pdfLoaded, setPdfLoaded] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Load PDF.js dynamically
        import('pdfjs-dist').then((pdfjs) => {
            pdfjsLib = pdfjs;
            // Use local worker file
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
            setPdfLoaded(true);
        }).catch(err => {
            console.error('Failed to load PDF.js:', err);
        });
    }, []);

    const convertPdfToImages = async (file: File): Promise<File[]> => {
        if (!pdfjsLib || !pdfLoaded) {
            throw new Error('PDF.js library not loaded yet');
        }

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const images: File[] = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            if (!context) {
                throw new Error('Failed to get canvas context');
            }

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport: viewport,
            }).promise;

            // Convert canvas to blob
            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (b) => {
                        if (b) {
                            resolve(b);
                        } else {
                            reject(new Error('Failed to convert canvas to blob'));
                        }
                    },
                    'image/jpeg',
                    0.85
                );
            });

            // Create file from blob
            const imageFile = new File(
                [blob],
                `${file.name.replace('.pdf', '')}_page_${pageNum}.jpg`,
                { type: 'image/jpeg' }
            );
            images.push(imageFile);
        }

        return images;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName('');
        setPreview([]);
        setConverting(true);

        try {
            if (file.type === 'application/pdf') {
                if (!pdfLoaded) {
                    throw new Error('PDF.js masih loading, tunggu sebentar...');
                }
                
                // Convert PDF to images
                const imageFiles = await convertPdfToImages(file);
                
                if (imageFiles.length === 0) {
                    throw new Error('Tidak ada halaman yang berhasil dikonversi');
                }
                
                // Create preview URLs
                const previewUrls = await Promise.all(
                    imageFiles.map(f => {
                        return new Promise<string>((resolve) => {
                            const reader = new FileReader();
                            reader.onload = (e) => resolve(e.target?.result as string);
                            reader.readAsDataURL(f);
                        });
                    })
                );
                
                setPreview(previewUrls);
                setFileName(file.name);
                onFileChange(imageFiles);
            } else if (file.type.startsWith('image/')) {
                // Regular image file
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreview([e.target?.result as string]);
                    setFileName(file.name);
                };
                reader.readAsDataURL(file);
                onFileChange([file]);
            } else {
                throw new Error('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.');
            }
        } catch (error: any) {
            console.error('Error processing file:', error);
            alert(`Gagal memproses file: ${error.message || 'Pastikan file valid.'}`);
            setFileName('');
            setPreview([]);
            onFileChange([]);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } finally {
            setConverting(false);
        }
    };

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-600 ml-1">*</span>}
            </label>

            <div className="flex flex-col gap-3">
                {!pdfLoaded && (
                    <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-medium">Loading PDF converter...</span>
                    </div>
                )}
                
                <div className="flex items-center gap-3">
                    <input
                        ref={fileInputRef}
                        type="file"
                        id={name}
                        name={name}
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={converting || !pdfLoaded}
                    />
                </div>

                {converting && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <svg className="animate-spin h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-medium">Mengkonversi PDF ke gambar...</span>
                    </div>
                )}

                {fileName && !converting && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm font-medium text-green-800">
                                File diproses: {fileName}
                                {preview.length > 1 && ` (${preview.length} halaman)`}
                            </span>
                        </div>
                    </div>
                )}

                {preview.length > 0 && (
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">Preview:</p>
                        <div className="grid grid-cols-2 gap-3">
                            {preview.map((url, index) => (
                                <div key={index} className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
                                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-auto" />
                                    {preview.length > 1 && (
                                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                            Hal. {index + 1}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentFile && !fileName && (
                    <div className="text-sm text-gray-600">
                        File saat ini: <span className="font-medium">{currentFile}</span>
                    </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                        <strong>ℹ️ Info:</strong> File PDF akan otomatis dikonversi menjadi gambar per halaman. 
                        Format yang didukung: JPG, PNG, PDF
                    </p>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
