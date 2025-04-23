import React from 'react';

function WorkoutsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-extrabold text-yellow-600 dark:text-yellow-300 mb-4">💪 Workouts</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">
                This is where your workouts will go. You can list drills, upload plans, or link to videos here.
            </p>
            <button onClick={() => window.location.href='/'} className="mt-8 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">
                Back Home
            </button>
        </div>
    );
}

export default WorkoutsPage;
