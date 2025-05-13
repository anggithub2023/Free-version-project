import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineArrowDown } from 'react-icons/hi';
import useAnonymousUser from '../hooks/useAnonymousUser';
import { ensureUserExists } from '../services/syncService';

export default function HomePage() {
    const navigate = useNavigate();
    const userId = useAnonymousUser();
    const [showIntroModal, setShowIntroModal] = useState(false);

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
            <div className="text-center mb-6 animate-fade-up">
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

                <div className="flex justify-center gap-6 text-sm text-gray-500 mt-4">
                    <button onClick={() => setShowIntroModal(true)} className="hover:text-blue-500">
                        What is this?
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500">
                        Skip for now →
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showIntroModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg max-w-md w-full shadow-xl text-center">
                        <h3 className="text-xl font-bold mb-4">Welcome</h3>
                        <p className="text-sm leading-relaxed">
                            This isn’t just another sports app.<br />
                            It’s a tool to help you grow.<br />
                            Before you compete, own your habits.<br />
                            After you compete, reflect with purpose.<br />
                            Every time you show up with intention,<br />
                            you move closer to the athlete you’re becoming.
                        </p>
                        <button
                            onClick={() => setShowIntroModal(false)}
                            className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

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
