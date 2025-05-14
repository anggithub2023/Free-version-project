// src/pages/ReadinessPage.js
import React, { useReducer, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import READINESS_CATEGORIES from '../data/READINESS_CATEGORIES';
import getRandomQuestionsPerCategory from '../helpers/getRandomQuestionsPerCategory';
import SectionBlockReadiness from '../components/Readiness/SectionBlockReadiness';
import { saveReadiness } from '../services/syncService';
import answersReducer from '../reducers/answersReducer';
import StickyCtaBar from '../components/StickyCtaBar';

function ReadinessPage() {
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('randomReadinessCategories');
        return saved ? JSON.parse(saved) : null;
    });

    const [answers, dispatch] = useReducer(
        answersReducer,
        {},
        () => JSON.parse(localStorage.getItem('readinessAnswers')) || {}
    );

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!categories) {
            const randomized = getRandomQuestionsPerCategory(READINESS_CATEGORIES, 2);
            localStorage.setItem('randomReadinessCategories', JSON.stringify(randomized));
            setCategories(randomized);
        }
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('readinessAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleAnswer = (section, idx, field, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER_FIELD', key, field, value });
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

        const readinessData = {
            categories: response,
            created_at: new Date().toISOString()
        };

        try {
            await saveReadiness(readinessData);
        } catch (err) {
            const queue = JSON.parse(localStorage.getItem('unsyncedReadiness') || '[]');
            queue.push(readinessData);
            localStorage.setItem('unsyncedReadiness', JSON.stringify(queue));
        }

        localStorage.setItem('latestReadiness', JSON.stringify(readinessData));
        setShowModal(true);
        dispatch({ type: 'RESET' });

        setTimeout(() => navigate('/dashboard'), 3500);
    };

    if (!categories) {
        return <div className="text-center p-10">Loading your readiness check...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-poppins pb-32">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm px-4 py-3 flex items-center">
                <button
                    onClick={() => navigate('/')}
                    className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-white transition"
                >
                    <MdHome className="text-2xl" />
                </button>
                <span className="ml-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Readiness Check
                </span>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-1">Center Yourself</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    How ready are you — mentally, physically, emotionally?
                </p>

                {categories.map((cat) => (
                    <SectionBlockReadiness
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
                        I’m Ready
                    </button>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-md w-full">
                            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                Readiness saved.
                                <br />
                                <span className="text-base font-normal">You’ve shown up with intention.</span>
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Redirecting to your dashboard...
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <StickyCtaBar onHome={() => navigate('/')} />
        </div>
    );
}

export default ReadinessPage;
