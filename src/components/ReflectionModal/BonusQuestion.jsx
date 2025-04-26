// src/components/ReflectionModal/BonusQuestion.jsx

import React from 'react';

function BonusQuestion({ answers, dispatch }) {
    const key = 'bonusReflection';

    const handleChange = (e) => {
        dispatch({ type: 'SET_ANSWER', key, value: parseInt(e.target.value) });
    };

    const value = answers[key] || 50; // Default slider middle

    return (
        <div className="mb-16 relative">
            <div className="sticky top-16 z-10 bg-pink-500 text-white py-3 px-4 rounded-b-xl shadow-md">
                <div className="flex items-center justify-center">
                    <h2 className="text-lg sm:text-xl font-bold tracking-wide uppercase text-center">
                        Bonus Reflection
                    </h2>
                </div>
            </div>

            <div className="space-y-6 mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <p className="font-medium text-gray-800 dark:text-gray-100 text-center">
                    How proud are you of your effort today? 🎯
                </p>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleChange}
                    className="w-full accent-pink-500"
                />

                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );
}

export default BonusQuestion;