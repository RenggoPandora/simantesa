import { Fragment } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    itemName?: string;
}

export default function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    itemName,
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black transition-opacity" 
                style={{ opacity: 0.3 }}
            />

            {/* Modal */}
            <div
                className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all relative z-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-4">
                    <p className="text-gray-600">{message}</p>
                    {itemName && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{itemName}</p>
                        </div>
                    )}
                    <p className="mt-3 text-sm text-red-600 font-medium">
                        Tindakan ini tidak dapat dibatalkan!
                    </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm hover:shadow-md"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
