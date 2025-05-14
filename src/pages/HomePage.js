import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-black dark:text-white px-6 py-10 font-sans">
            {/* Header CTA */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Readiness Box */}
            <div className="text-center mb-4 animate-fade-up">
                <button
                    onClick={() => navigate('/readiness')}
                    className="bg-white dark:bg-gray-800 border-2 border-black px-6 py-3 rounded-xl font-semibold text-red-500 shadow hover:scale-105 transition"
                >
                    Readiness
                </button>
            </div>

            {/* Arrows + Brain Image */}
            <div className="relative my-10 flex justify-center items-center">
                <div className="absolute left-1/4 top-0">
                    <HiOutlineArrowDown className="text-3xl text-gray-400 dark:text-gray-500 rotate-[-45deg]" />
                </div>
                <div className="z-10">
                    <img
                        src="/assets/brain_only_colored.svg"
                        alt="Brain Diagram"
                        className="w-24 sm:w-32 mx-auto"
                    />
                </div>
                <div className="absolute right-1/4 top-0">
                    <HiOutlineArrowDown className="text-3xl text-gray-400 dark:text-gray-500 rotate-[45deg]" />
                </div>
            </div>

            {/* Process and Reflection */}
            <div className="flex justify-center gap-4 flex-wrap mb-10 animate-fade-up">
                <button
                    onClick={() => navigate('/process')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow w-full max-w-xs"
                >
                    Own Your Process
                </button>
                <button
                    onClick={() => navigate('/reflect')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow w-full max-w-xs"
                >
                    Reflect on Performance
                </button>
            </div>

            {/* Links Below */}
            <div className="text-center text-sm text-gray-500 mt-4">
                <button onClick={() => setShowIntroModal(true)} className="hover:text-blue-500 mr-4">
                    What is this?
                </button>
                <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500">
                    Skip for now →
                </button>
            </div>

            {/* Intro Modal */}
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
            <footer className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-12">
                <p>© {new Date().getFullYear()} processwins.app</p>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeopJAyVo6uA4CEKw0bVEbgTEDHwQr2S8Xev17D1KkUZcFDIQ/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-xs hover:text-pink-600 transition block mt-1"
                >
                    Feedback
                </a>
            </footer>
        </div>
    );
}