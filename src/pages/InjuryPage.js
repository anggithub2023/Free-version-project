import React from 'react';
import { MdHealthAndSafety, MdDirectionsRun, MdOutlineIcecream, MdOutlineFlag, MdReportProblem } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function InjuryPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-4 py-8 sm:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-rose-600 flex items-center gap-2 tracking-tight">
                        <MdHealthAndSafety className="text-4xl bg-rose-500 text-white p-1 rounded-full shadow-md" />
                        Injury Prevention
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-rose-600 hover:bg-rose-500 transition text-white px-4 py-2 rounded-md shadow-md"
                    >
                        Back Home
                    </button>
                </div>

                {/* Intro */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-10 border border-rose-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-3 text-rose-700 flex items-center gap-2">
                        <MdOutlineFlag className="text-2xl text-rose-500" />
                        Why Injury Prevention Matters
                    </h2>
                    <p className="text-sm mb-2">
                        Prevent injuries before they happen. This section provides real-world knowledge and routines from a certified athletic trainer — helping you stay healthy, move better, and stay in the game.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Videos, daily recovery guidance, and red-flag warnings are coming soon.
                    </p>
                </div>

                {/* Modern Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Card */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-rose-300 transition-all">
                        <h3 className="text-md font-semibold text-rose-700 mb-2 flex items-center gap-2">
                            <MdDirectionsRun className="text-xl text-rose-500" />
                            Warm-Up Routines
                        </h3>
                        <ul className="list-disc list-inside text-sm space-y-1 leading-relaxed">
                            <li>Dynamic mobility before games</li>
                            <li>Joint-specific activation drills</li>
                            <li>Pre-practice stabilization sets</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-rose-300 transition-all">
                        <h3 className="text-md font-semibold text-rose-700 mb-2 flex items-center gap-2">
                            <MdOutlineIcecream className="text-xl text-rose-500" />
                            Recovery Tips
                        </h3>
                        <ul className="list-disc list-inside text-sm space-y-1 leading-relaxed">
                            <li>Post-game stretching & foam rolling</li>
                            <li>Hydration & sleep guidance</li>
                            <li>Nutrition that supports recovery</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-rose-300 transition-all">
                        <h3 className="text-md font-semibold text-rose-700 mb-2 flex items-center gap-2">
                            <MdHealthAndSafety className="text-xl text-rose-500" />
                            Video Series (Coming Soon)
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Watch certified trainers break down how elite athletes warm up, strengthen, and recover from real-life injuries.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-rose-300 transition-all">
                        <h3 className="text-md font-semibold text-rose-700 mb-2 flex items-center gap-2">
                            <MdReportProblem className="text-xl text-rose-500" />
                            Injury Red Flags
                        </h3>
                        <ul className="list-disc list-inside text-sm space-y-1 leading-relaxed">
                            <li>When soreness signals something more</li>
                            <li>Warning signs for ankle, hip, and knee stress</li>
                            <li>Know when to stop and seek help</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-10 text-xs text-gray-500 dark:text-gray-400 text-center">
                    This content is provided for educational purposes by licensed professionals. For any symptoms or concerns, consult a physician or physical therapist.
                </div>
            </div>
        </div>
    );
}

export default InjuryPage;