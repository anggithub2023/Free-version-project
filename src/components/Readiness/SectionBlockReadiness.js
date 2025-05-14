// src/components/Readiness/SectionBlockReadiness.js
import React from 'react';

function SectionBlockReadiness({
                                   title,
                                   description,
                                   questions,
                                   sectionKey,
                                   answers,
                                   handleAnswer
                               }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow mb-8">
            <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-300 mb-1">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>

            {questions.map((q, idx) => {
                const key = `${sectionKey}-${idx}`;
                const current = answers[key] || {};

                return (
                    <div key={key} className="mb-6">
                        <p className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-100">{q}</p>

                        {/* Special case: Intention & Purpose */}
                        {sectionKey === 'intention' ? (
                            <textarea
                                rows={2}
                                value={current.comment || ''}
                                onChange={(e) => handleAnswer(sectionKey, idx, 'comment', e.target.value)}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="What's your focus or mindset today?"
                            />
                        ) : (
                            <>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={current.value || 50}
                                    onChange={(e) => handleAnswer(sectionKey, idx, 'value', Number(e.target.value))}
                                    className="w-full mb-2 accent-indigo-600"
                                />
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{current.value || 50}%</div>
                                <input
                                    type="text"
                                    placeholder="Optional context..."
                                    value={current.comment || ''}
                                    onChange={(e) => handleAnswer(sectionKey, idx, 'comment', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default SectionBlockReadiness;
