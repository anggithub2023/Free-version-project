import React from 'react';

export default function ClearConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
                <p className="text-base text-gray-800 dark:text-gray-100 mb-5 text-center">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md font-medium"
                    >
                        Yes, Clear
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}