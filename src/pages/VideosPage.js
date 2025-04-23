import React from 'react';

function VideosPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-300 mb-4">🎥 Videos</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">
                This is where videos or highlights can be embedded. Great for film study or inspiration!
            </p>
            <button onClick={() => window.location.href='/'} className="mt-8 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">
                Back Home
            </button>
        </div>
    );
}

export default VideosPage;
