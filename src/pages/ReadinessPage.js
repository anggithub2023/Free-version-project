// SectionBlockReadiness.js
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
                        <p className="text-sm mb-2 font-medium text-gray-800 dark:text-gray-100">{q}</p>

                        {/* Slider input for all except 'intention' */}
                        {sectionKey !== 'intention' && (
                            <div className="flex items-center gap-3 mb-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={current.value || 50}
                                    onChange={(e) =>
                                        handleAnswer(sectionKey, idx, {
                                            ...current,
                                            value: parseInt(e.target.value, 10)
                                        })
                                    }
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 w-12 text-right">
                  {current.value || 50}%
                </span>
                            </div>
                        )}

                        {/* Comment box for all */}
                        <input
                            type="text"
                            placeholder={sectionKey === 'intention' ? 'Focus for today...' : 'Add optional context'}
                            value={current.comment || ''}
                            onChange={(e) =>
                                handleAnswer(sectionKey, idx, {
                                    ...current,
                                    comment: e.target.value
                                })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default SectionBlockReadiness;
