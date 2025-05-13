import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-8 font-sans">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            {/* Section 1: Own Your Process */}
            <div className="text-center mb-12 animate-fade-up">
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-2">Own your process.</h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Build intentional habits before you compete.
                </p>
                <button
                    onClick={() => navigate('/process')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow w-full max-w-xs mx-auto"
                >
                    Start Process
                </button>
            </div>

            {/* Optional Divider or Arrow */}
            <div className="flex justify-center my-6 animate-fade-up">
                <HiOutlineArrowDown className="text-4xl text-gray-400 dark:text-gray-500" />
            </div>

            {/* Section 2: Reflect on Your Performance */}
            <div className="text-center mb-12 animate-fade-up">
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-2">Reflect on your performance.</h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Turn self-awareness into progress.
                </p>
                <button
                    onClick={() => navigate('/reflect')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow w-full max-w-xs mx-auto"
                >
                    Start Reflection
                </button>
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