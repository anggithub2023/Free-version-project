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
        <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center items-start px-4 py-8">
            <div className="bg-white dark:bg-gray-950 rounded-3xl shadow-xl w-full max-w-sm p-5 text-black dark:text-white font-sans transition-colors">

                {/* Header */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium mb-6">
                    <BsCheckCircleFill className="text-black dark:text-white" />
                    <span>processwins.app</span>
                </div>

                {/* Hero Text */}
                <div className="text-left mb-4">
                    <h1 className="text-4xl font-black leading-tight mb-3">
                        Reflect on<br />your<br />performance.
                    </h1>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        Turn self-awareness<br />into progress.
                    </p>
                </div>

                {/* Arrow BETWEEN text and button */}
                <div className="flex justify-center my-4">
                    <HiOutlineArrowDown className="text-2xl text-gray-400 dark:text-gray-500" />
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => navigate('/reflect')}
                        className="bg-black text-white dark:bg-white dark:text-black rounded-xl px-6 py-4 w-full font-bold text-base max-w-xs shadow hover:scale-105 transition"
                    >
                        Start Reflection
                    </button>
                </div>

                {/* Icon Cards */}
                <div className="flex justify-between gap-3 mb-6">
                    {[ 'Track Progress', 'Get Insights', 'Build Consistency' ].map((label, idx) => {
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
                <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                    © {new Date().getFullYear()} processwins.app
                </p>
            </div>
        </div>
    );
}