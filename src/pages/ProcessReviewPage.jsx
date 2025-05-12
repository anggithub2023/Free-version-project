// src/pages/ProcessReviewPage.jsx

import React, { useEffect, useState } from 'react';

function ProcessReviewPage() {
    const [processData, setProcessData] = useState(null);

    useEffect(() => {
        const latest = localStorage.getItem('latestProcess');
        if (latest) setProcessData(JSON.parse(latest));
    }, []);

    if (!processData) {
        return <div className="text-center p-10">No process reflection found.</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">📝 Process Reflection Summary</h1>
                <p className="text-sm text-center text-gray-500 mb-8">
                    Submitted on {new Date(processData.created_at).toLocaleString()}
                </p>

                {processData.categories.map((cat) => (
                    <div key={cat.key} className="mb-10">
                        <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                            {cat.title}
                        </h2>

                        {cat.questions.map((q, idx) => (
                            <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                                <p className="font-medium mb-1">{q.question}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <strong>Rating:</strong> {q.rating ?? 'N/A'}
                                </p>
                                {q.note && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                        <strong>Note:</strong> {q.note}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProcessReviewPage;
