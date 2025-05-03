import { useNavigate } from 'react-router-dom';
import { MdOutlineEditNote } from 'react-icons/md';
import { FaChartBar } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';

export default function HomePage() {
    const navigate = useNavigate();

    const features = [
        {
            icon: MdOutlineEditNote,
            title: 'Reflect',
            route: '/reflect',
            color: 'text-indigo-500',
        },
        {
            icon: FaChartBar,
            title: 'Track',
            route: '/track',
            color: 'text-green-500',
        },
        {
            icon: GiProgression,
            title: 'Consistency',
            route: '/consistency',
            color: 'text-yellow-500',
        },
    ];

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

            {/* Start Reflection Button - Centered */}
            <div className="mb-10 flex justify-center">
                <button
                    onClick={() => navigate('/reflect')}
                    className="animate-pulse bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                >
                    Start Reflection
                </button>
            </div>

            {/* Cards - Always side-by-side, scrollable on mobile */}
            <div className="flex flex-row flex-nowrap gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                {features.map(({ icon: Icon, title, route, color }, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(route)}
                        className="w-[280px] flex-shrink-0 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition p-6 rounded-xl text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                            <Icon className={`text-3xl ${color}`} />
                        </div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}