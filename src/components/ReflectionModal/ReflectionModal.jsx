import React from 'react';
import { useNavigate } from 'react-router-dom';

function ReflectionModal({ total }) {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center animate-scale-in">
                <h2 className="text-2xl font-bold mb-4">🔥 Great Work Reflecting! 🔥</h2>
                <p className="text-lg font-semibold mb-2">Total Score: {total}%</p>

                <div className="my-4 flex flex-col space-y-3">
                    <button
                        onClick={() => handleNavigate('/workouts')}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full shadow"
                    >
                        🏋️ Log a Workout
                    </button>

                    <button
                        onClick={() => handleNavigate('/stats')}
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow"
                    >
                        📊 Track Game Stats
                    </button>

                    <button
                        onClick={() => handleNavigate('/')}
                        className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-full shadow"
                    >
                        🏠 Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReflectionModal;