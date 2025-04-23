import React from 'react';

function ReadinessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 dark:text-purple-200 tracking-tight mb-6">🧠 Mental Readiness Check</h1>
            <p className="text-center text-gray-700 dark:text-gray-300 max-w-md mb-8">
                Take a quick moment to center yourself before a game or practice. How ready do you feel mentally and physically?
            </p>
            {/* Placeholder for readiness questions or scale */}
            <div className="text-gray-500 dark:text-gray-400 text-sm italic">Coming soon: reflection scale and mindset questions.</div>
        </div>
    );
}

export default ReadinessPage;
