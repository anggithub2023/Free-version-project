import React from 'react';

function ReflectionModal({ total, offense, defense, culture, onClose }) {
    const icon = total >= 95 ? '🔥' : total >= 85 ? '💪' : '🧱';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-xl font-bold mb-2">{icon} Great Job Reflecting</h2>
                <p className="mb-2">Total Score: {total}%</p>
                <p className="mb-1 text-sm">Offense: {offense}%</p>
                <p className="mb-1 text-sm">Defense: {defense}%</p>
                <p className="mb-4 text-sm">Team Identity: {culture}%</p>
                <p className="mb-4 font-medium">Champions do the little things.</p>
                <button
                    onClick={onClose}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                >
                    OK
                </button>
            </div>
        </div>
    );
}

export default ReflectionModal;
