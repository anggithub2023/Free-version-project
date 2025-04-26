// src/components/ReflectionModal/ReflectionModal.jsx

import React from 'react';

function ReflectionModal({ total, offense, defense, culture, bonus, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 text-center">
                <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">🔥 Great Work Reflecting! 🔥</h2>

                <div className="space-y-2">
                    <p className="text-lg font-semibold">Total Reflection Score: <span className="text-indigo-500">{total}%</span></p>
                    <p>Offense: {offense}%</p>
                    <p>Defense: {defense}%</p>
                    <p>Team Culture: {culture}%</p>
                    <p>Bonus Positivity: {bonus}%</p>
                </div>

                <div className="pt-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
                    >
                        🏠 Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReflectionModal;