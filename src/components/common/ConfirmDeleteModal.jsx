// src/components/common/ConfirmDeleteModal.jsx
import React from 'react';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title = 'Are you sure?', message = 'This action cannot be undone.' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm w-full p-6 font-[Poppins]">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}