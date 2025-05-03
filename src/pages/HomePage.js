import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { FaArrowDownLong } from 'react-icons/fa6';
import { LuLineChart } from 'react-icons/lu';
import { PiLightbulbFilamentThin } from 'react-icons/pi';
import { FaCheckDouble } from 'react-icons/fa6';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-[#faf6f2] dark:bg-black text-black dark:text-white px-6 py-8">
            <div className="flex flex-col items-center space-y-6">
                {/* Top Logo */}
                <div className="flex items-center space-x-2 text-sm font-medium">
                    <FaCheckCircle className="text-black dark:text-white text-lg" />
                    <span>processwins.app</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold leading-tight text-center">
                    Reflect on<br />your performance.
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-300">
                    Turn self-awareness into progress.
                </p>

                {/* CTA */}
                <button
                    onClick={() => navigate('/reflect')}
                    className="bg-black text-white dark:bg-white dark:text-black text-lg font-semibold px-8 py-3 rounded-xl shadow-md animate-pulse"
                >
                    Start Reflection
                </button>
            </div>

            {/* Arrow */}
            <div className="my-6">
                <FaArrowDownLong className="text-black dark:text-white text-xl animate-bounce" />
            </div>

            {/* Feature Cards */}
            <div className="flex justify-between w-full max-w-sm gap-2">
                <Card icon={<LuLineChart size={30} />} label="Track Progress" />
                <Card icon={<PiLightbulbFilamentThin size={30} />} label="Get Insights" />
                <Card icon={<FaCheckDouble size={30} />} label="Build Consistency" />
            </div>

            {/* Footer */}
            <footer className="mt-10 text-xs text-gray-500 dark:text-gray-400 text-center">
                © 2025 processwins.app
            </footer>
        </div>
    );
}

function Card({ icon, label }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center justify-center flex-1 bg-white dark:bg-zinc-900 text-black dark:text-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >
            {icon}
            <p className="text-xs font-medium mt-2 text-center leading-snug">
                {label}
            </p>
        </div>
    );
}
