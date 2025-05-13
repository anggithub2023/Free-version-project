// src/pages/ProcessPage.jsx

import React, { useReducer, useEffect, useState } from 'react';
import PROCESS_CATEGORIES from '../data/PROCESS_CATEGORIES';
import getRandomProcessCategories from '../helpers/getRandomProcessCategories';
import SectionBlockProcess from '../components/Process/SectionBlockProcess';
import { saveProcess } from '../services/syncService';
import answersReducer from '../reducers/answersReducer';

function ProcessPage() {
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('randomProcessCategories');
        return saved ? JSON.parse(saved) : null;
    });

    const [answers, dispatch] = useReducer(
        answersReducer,
        {},
        () => JSON.parse(localStorage.getItem('processAnswers')) || {}
    );

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!categories) {
            const selected = getRandomProcessCategories(PROCESS_CATEGORIES, 4);
            localStorage.setItem('randomProcessCategories', JSON.stringify(selected));
            setCategories(selected);
        }
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleSubmit = async () => {
        const response = categories.map((cat) => ({
            key: cat.key,
            title: cat.title,
            questions: cat.questions.map((q, idx) => {
                const key = `${cat.key}-${idx}`;
                return { question: q, ...answers[key] };
            })
        }));

        const processData = {
            categories: response,
            created_at: new Date().toISOString()
        };

        try {
            await saveProcess(processData);
        } catch (err) {
            const queue = JSON.parse(localStorage.getItem('unsyncedProcesses') || '[]');
            queue.push(processData);
            localStorage.setItem('unsyncedProcesses', JSON.stringify(queue));
        }

        localStorage.setItem('latestProcess', JSON.stringify(processData));
        setShowModal(true);
        dispatch({ type: 'RESET' });
    };

    if (!categories) {
        return <div className="text-center p-10">Loading your process journey...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 font-poppins">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-1">Own Your Process</h1>
                <p className="text-center text-sm text-gray-500 mb-6">Take Control. Build Habits. See Results</p>

                {categories.map((cat) => (
                    <SectionBlockProcess
                        key={cat.key}
                        title={cat.title}
                        description={cat.description}
                        questions={cat.questions}
                        sectionKey={cat.key}
                        answers={answers}
                        handleAnswer={handleAnswer}
                    />
                ))}

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow"
                    >
                        Submit Process
                    </button>
                </div>

                {showModal && (
                    <div className="text-center mt-6 text-green-600 font-semibold">
                        Process submitted successfully!
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProcessPage;
