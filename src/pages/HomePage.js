import { useNavigate } from 'react-router-dom';
import { MdOutlineEditNote } from 'react-icons/md';
import { FaChartBar } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6">
            {/* Header */}
            <div className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
                processwins.app
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2 text-left">
                Reflect on<br />Your<br />Performance
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-left text-gray-600 dark:text-gray-300 mb-8">
                A modern way to track, improve, and stay consistent with your goals.
            </p>

            {/* Start Reflection Button */}
            <div className="mb-10">
                <button
                    onClick={() => navigate('/reflect')}
                    className="animate-pulse bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                >
                    Start Reflection
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
                <div
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition p-6 rounded-xl text-center"
                >
                    <MdOutlineEditNote className="text-indigo-500 mx-auto text-4xl mb-2" />
                    <h3 className="text-lg font-semibold">Reflect</h3>
                </div>

                <div
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition p-6 rounded-xl text-center"
                >
                    <FaChartBar className="text-green-500 mx-auto text-4xl mb-2" />
                    <h3 className="text-lg font-semibold">Track</h3>
                </div>

                <div
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition p-6 rounded-xl text-center"
                >
                    <GiProgression className="text-yellow-500 mx-auto text-4xl mb-2" />
                    <h3 className="text-lg font-semibold">Consistency</h3>
                </div>
            </div>
        </div>
    );
}
