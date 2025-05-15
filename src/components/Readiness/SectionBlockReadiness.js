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

                // Special case: "Intention" category — text only
                if (sectionKey === 'intention') {
                    return (
                        <div key={key} className="mb-6">
                            <p className="text-sm mb-2">{q}</p>
                            <textarea
                                value={current.note || ''}
                                onChange={(e) => handleAnswer(sectionKey, idx, 'note', e.target.value)}
                                placeholder="What's your intention today?"
                                className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
                            />
                        </div>
                    );
                }

                // Default: slider + optional comment
                return (
                    <div key={key} className="mb-6">
                        <p className="text-sm mb-2">{q}</p>

                        {/* Slider */}
                        <div className="flex items-center gap-3 mb-2">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={current.value || 0}
                                onChange={(e) =>
                                    handleAnswer(sectionKey, idx, 'value', Number(e.target.value))
                                }
                                className="w-full"
                            />
                            <span className="text-sm w-10 text-right">{current.value || 0}%</span>
                        </div>

                        {/* Optional Note */}
                        <textarea
                            value={current.note || ''}
                            onChange={(e) => handleAnswer(sectionKey, idx, 'note', e.target.value)}
                            placeholder="Optional note..."
                            className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default SectionBlockReadiness;