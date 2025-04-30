import React from 'react';

function PanelHeader({ icon, title, subtitle }) {
    return (
        <div className="mb-4 text-left">
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {icon}
                {title}
            </div>
            <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
        </div>
    );
}

export default PanelHeader;