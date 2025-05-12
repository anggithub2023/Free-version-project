// src/components/Process/ProcessModal.jsx

import React from 'react';

function ProcessModal({ categories, onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow-lg">
                <h2 className="text-xl font-bold text-center mb-4 text-indigo-600">Process Reflection Submitted</h2>

                <div className="overflow-y-auto max-h-[60vh] space-y-4">
                    {categories.map((cat) => (
                        <div key={cat.key}>
                            <h3 className="font-semibold text-lg mb-1">{cat.title}</h3>
                            {cat.questions.map((q, idx) => (
                                <div key={idx} className="text-sm border rounded p-3 mb-2 bg-gray-50 dark:bg-gray-700">
                                    <p><strong>Q:</strong> {q.question}</p>
                                    <p><strong>Rating:</strong> {q.rating ?? 'N/A'}</p>
                                    {q.note && <p><strong>Note:</strong> {q.note}</p>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProcessModal;
