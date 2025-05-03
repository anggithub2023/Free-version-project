import { FaCheckCircle } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 bg-[#faf6f1] text-gray-900 font-sans">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 mb-8">
                <FaCheckCircle className="text-black text-lg" />
                <span className="font-semibold text-sm">processwins.app</span>
            </div>

            {/* Headline and Subtext */}
            <div className="text-center">
                <h1 className="text-4xl font-bold leading-tight mb-4">
                    Reflect on<br />your<br />performance.
                </h1>
                <p className="text-base text-gray-700 mb-6">
                    Turn self-awareness<br />into progress.
                </p>

                {/* CTA Button */}
                <button className="bg-black text-white text-lg font-medium py-3 px-8 rounded-xl shadow-md hover:scale-[1.02] transition">
                    Start Reflection
                </button>
            </div>

            {/* Arrow and Cards */}
            <div className="flex flex-col items-center gap-6 mt-10">
                <span className="text-2xl">↓</span>

                {/* Cards */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center bg-white rounded-xl px-6 py-5 shadow">
                        <FaChartLine className="text-2xl mb-2" />
                        <p className="text-sm font-semibold">Track<br />Progress</p>
                    </div>
                    <div className="flex flex-col items-center bg-white rounded-xl px-6 py-5 shadow">
                        <FaLightbulb className="text-2xl mb-2" />
                        <p className="text-sm font-semibold">Get<br />Insights</p>
                    </div>
                    <div className="flex flex-col items-center bg-white rounded-xl px-6 py-5 shadow">
                        <FaBars className="text-2xl mb-2" />
                        <p className="text-sm font-semibold">Build<br />Consistency</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-10 text-xs text-gray-500">
                © 2025 processwins.app
            </footer>
        </div>
    );
}
