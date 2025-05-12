import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaChartLine, FaLightbulb, FaCheckDouble } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineArrowDown } from 'react-icons/hi';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';

export default function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();

    useEffect(() => {
        if (userId) {
            ensureUserExists(userId).catch(err =>
                console.error('Failed to sync user:', err.message)
            );
        }
    }, [userId]);

    const handleCardClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-8 font-sans">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            {/* Hero Text */}
            <div className="text-left mb-4 animate-fade-up">
                <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                    Reflect on<br />your<br />performance.
                </h1>
                <p className="font-sans text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Turn self-awareness<br />into progress.
                </p>
            </div>

            {/* Arrow Above Button */}
            <div className="flex justify-center my-4 animate-fade-up">
                <HiOutlineArrowDown className="text-2xl text-gray-400 dark:text-gray-500" />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-4 animate-fade-up">
                <button
                    onClick={() => navigate('/reflect')}
                    className="bg-amber-500 text-white
                        hover:bg-amber-400
                        rounded-xl px-6 py-4 w-full font-bold text-lg max-w-xs
                        shadow hover:scale-105 transition
                        animate-pulse-slow"
                >
                    Start Reflection
                </button>
            </div>

            {/* Arrow Below Button */}
            <div className="flex justify-center mt-8 mb-4 animate-fade-up">
                <HiOutlineArrowDown className="text-2xl text-gray-400 dark:text-gray-500" />
            </div>

            {/* Feature Cards */}
            <div className="flex justify-between gap-3 mt-12 mb-10 animate-fade-up">
                {['Track Progress', 'Get Insights', 'Build Consistency'].map((label, idx) => {
                    const icons = [FaChartLine, FaLightbulb, FaCheckDouble];
                    const Icon = icons[idx];
                    return (
                        <div
                            key={idx}
                            onClick={handleCardClick}
                            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex-1 shadow-sm text-center cursor-pointer hover:shadow-md transition"
                        >
                            <Icon className="text-2xl mx-auto mb-2" />
                            <p className="text-xs font-medium leading-tight">{label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="text-center text-[10px] text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} processwins.app</p>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeopJAyVo6uA4CEKw0bVEbgTEDHwQr2S8Xev17D1KkUZcFDIQ/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-xs hover:text-pink-600 transition block mt-1"
                >
                    Feedback
                </a>
            </div>
        </div>
    );
}