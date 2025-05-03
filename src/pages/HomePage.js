import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBullseye, FaLightbulb, FaSync } from 'react-icons/fa';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <header className="w-full text-center py-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">processwins.app</p>
            </header>

            <main className="max-w-5xl mx-auto px-4 pt-8">
                <div className="mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-left text-gray-900 dark:text-white">
                        Reflect on<br />Your<br />Performance
                    </h1>
                </div>

                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => navigate('/reflect')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg animate-pulse shadow-lg"
                    >
                        Start Reflection
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer bg-indigo-100 dark:bg-indigo-800 text-center py-6 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                        <FaBullseye className="text-3xl mx-auto mb-2" />
                        <p className="font-semibold text-sm">Track</p>
                    </div>

                    <div
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer bg-indigo-100 dark:bg-indigo-800 text-center py-6 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                        <FaLightbulb className="text-3xl mx-auto mb-2" />
                        <p className="font-semibold text-sm">Insight</p>
                    </div>

                    <div
                        onClick={() => navigate('/dashboard')}
                        className="cursor-pointer bg-indigo-100 dark:bg-indigo-800 text-center py-6 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                        <FaSync className="text-3xl mx-auto mb-2" />
                        <p className="font-semibold text-sm">Consistency</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
