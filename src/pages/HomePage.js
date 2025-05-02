import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi';

function HomePage() {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Track Progress',
            icon: <FiBarChart2 size={28} />,
            route: '/dashboard',
        },
        {
            title: 'Get Insights',
            icon: <HiOutlineLightBulb size={28} />,
            route: '/dashboard',
        },
        {
            title: 'Build Consistency',
            icon: <FiTrendingUp size={28} />,
            route: '/dashboard',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf9] px-6 py-12">
            {/* Header */}
            <div className="mb-8 text-sm font-semibold text-gray-900">
        <span className="inline-block px-3 py-1 rounded-full border border-gray-300 bg-white">
          ✔ processwins.app
        </span>
            </div>

            {/* Main Headline */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                    Reflect on <br /> your performance.
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                    Turn self-awareness into progress.
                </p>
            </div>

            {/* Start Reflection Button */}
            <button
                onClick={() => navigate('/reflect')}
                className="mt-8 px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg shadow hover:opacity-90 transition"
            >
                Start Reflection
            </button>

            {/* Cards */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
                {cards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(card.route)}
                        className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition w-40"
                    >
                        <div className="text-gray-800 mb-2">{card.icon}</div>
                        <span className="text-sm font-medium text-gray-900">{card.title}</span>
                    </button>
                ))}
            </div>

            {/* Footer */}
            <footer className="mt-12 text-xs text-gray-500 text-center">
                © 2025 processwins.app
            </footer>
        </div>
    );
}

export default HomePage;