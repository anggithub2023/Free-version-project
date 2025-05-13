// src/components/Process/SectionBlockProcess.jsx

import React from 'react';

/**
 * @param {string} title - Section title
 * @param {string} description - Section description
 * @param {Array} questions - Array of questions for the section
 * @param {string} sectionKey - Unique key used in state tracking
 * @param {object} answers - Current answers from useReducer
 * @param {function} handleAnswer - Handler to set rating/note
 */
function SectionBlockProcess({ title, description, questions, sectionKey, answers, handleAnswer }) {
    return (
        <div className="mb-12">
            <div className="mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-600 italic text-sm">{description}</p>
            </div>

            <div className="space-y-6">
                {questions.map((question, idx) => {
                    const key = `${sectionKey}-${idx}`;
                    const entry = answers[key] ?? { rating: 0, note: '' };

                    return (
                        <div key={key} className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow">
                            <p className="font-medium text-gray-900 dark:text-white mb-2">{question}</p>

                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => handleAnswer(sectionKey, idx, { ...entry, rating: num })}
                                        className={`w-10 h-10 rounded-full border font-bold transition-all
                                            ${entry.rating === num
                                            ? 'bg-indigo-600 text-white border-indigo-700 scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        {num}
                                    </button>
                                ))}

                                <input
                                    type="text"
                                    value={entry?.note || ''}
                                    onChange={(e) =>
                                        handleAnswer(sectionKey, idx, { ...entry, note: e.target.value })
                                    }
                                    maxLength={50}
                                    className="flex-1 min-w-[150px] md:min-w-[200px] border p-2 rounded-md text-sm dark:bg-gray-900 dark:text-white"
                                    placeholder="Optional note (max 50 chars)"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SectionBlockProcess;
