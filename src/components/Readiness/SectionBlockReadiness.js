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
                    <div key={key} className="mb-4">
                        <p className="text-sm mb-1">{q}</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((val) => (
                                <button
                                    key={val}
                                    onClick={() =>
                                        handleAnswer(sectionKey, idx, { value: val })
                                    }
                                    className={`w-10 h-10 rounded-full text-sm font-semibold ${
                                        current?.value === val
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-700'
                                    }`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SectionBlockReadiness;