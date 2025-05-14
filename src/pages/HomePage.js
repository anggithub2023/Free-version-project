import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
            {/* CTA Button Top */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => navigate('/personalize')}
                    className="text-xs sm:text-sm font-medium px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Personalize your journey
                </button>
            </div>

            {/* Additional button (space preserved) */}
            <div className="flex justify-center mb-6">
                <button
                    className="bg-rose-500 text-white px-4 py-2 rounded-full font-semibold text-xs sm:text-sm shadow hover:bg-rose-400"
                    onClick={() => navigate('/readiness')}
                >
                    Readiness Check-In
                </button>
            </div>

            {/* Brain image */}
            <div className="flex justify-center mb-8">
                <img src="/assets/brain_only_colored.svg" alt="Brain" className="w-24 sm:w-32 animate-fade-in" />
            </div>

            {/* Buttons Grid */}
            <div className="flex flex-col sm:flex-row justify-center gap-10 px-4 mb-10 animate-fade-up">
                <div className="text-center">
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold mb-2">Own your process.</h2>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">
                        Build intentional habits before you compete.
                    </p>
                    <button
                        onClick={() => navigate('/process')}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow w-52"
                    >
                        Start Process
                    </button>
                </div>

                <div className="text-center">
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold mb-2">Reflect</h2>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">
                        Turn self-awareness into progress.
                    </p>
                    <button
                        onClick={() => navigate('/reflect')}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow w-52"
                    >
                        Start Reflection
                    </button>
                </div>
            </div>

            {/* Bottom Links */}
            <div className="flex justify-center gap-6 text-sm text-gray-500">
                <button onClick={() => setShowIntroModal(true)} className="hover:text-blue-500">
                    What is this?
                </button>
                <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500">
                    Skip for now →
                </button>
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
        </div>
    );
}