import React from 'react';

function PanelHeader({ title = "Performance Dashboard" }) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight text-center sm:text-left">
                {title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center sm:text-left mt-1">
                Your personal performance stats and progress insights.
            </p>
        </div>
    );
}

export default PanelHeader;