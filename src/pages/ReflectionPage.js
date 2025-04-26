// src/pages/ReflectionPage.jsx (RADIO ANSWER VERSION)

import React, { useState, useEffect, useReducer } from 'react';
import QUESTIONS, { BONUS_QUESTIONS } from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';

function ReflectionPage() {
    const [ready, setReady] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [state, dispatch] = useReducer(answersReducer, {});
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(null);
    const [bonusAnswer, setBonusAnswer] = useState(50);

    useEffect(() => {
        const sport = localStorage.getItem('selectedSport') || '';
        const position = localStorage.getItem('selectedPosition') || '';
        setSelectedSport(sport);
        setSelectedPosition(position);
        if (sport) setReady(true);
    }, []);

    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    const handleAnswerChange = (key, value) => {
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const calculateTotalScore = () => {
        const selectedQuestions = getSelectedQuestions();
        if (!selectedQuestions) return 0;

        const allKeys = Object.keys(selectedQuestions).flatMap((category) =>
            selectedQuestions[category].map((q, index) => `${category}_${index}`)
        );

        const answeredYes = allKeys.filter((key) => state[key] === 'yes');
        return Math.round((answeredYes.length / allKeys.length) * 100);
    };

    const handleSubmit = () => {
        const total = calculateTotalScore();
        setScore(total);

        const processHistory = JSON.parse(localStorage.getItem('processHistory')) || [];
        const newEntry = {
            timestamp: Date.now(),
            total,
            bonus: bonusAnswer
        };
        localStorage.setItem('processHistory', JSON.stringify([...processHistory, newEntry]));

        setShowModal(true);
        dispatch({ type: 'RESET' });
    };

    const getSelectedQuestions = () => {
        if (!selectedSport) return null;
        const key = selectedPosition ? `${selectedSport}-${selectedPosition.replace(' ', '').toLowerCase()}` : selectedSport;
        return QUESTIONS[key] || QUESTIONS[selectedSport];
    };

    const randomizeQuestions = (questionsObj) => {
        const randomQuestions = {};
        Object.keys(questionsObj).forEach((category) => {
            const shuffled = [...questionsObj[category]].sort(() => 0.5 - Math.random());
            randomQuestions[category] = shuffled.slice(0, 3);
        });
        return randomQuestions;
    };

    const selectedQuestions = getSelectedQuestions();
    const randomizedQuestions = selectedQuestions ? randomizeQuestions(selectedQuestions) : {};
    const randomBonusQuestion = BONUS_QUESTIONS[Math.floor(Math.random() * BONUS_QUESTIONS.length)];

    if (!ready) {
        return <ReflectionStartFlow onComplete={() => window.location.reload()} />;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Reflection</h1>

                {selectedQuestions ? (
                    <>
                        {Object.keys(randomizedQuestions).map((category) => (
                            <div key={category} className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                    {capitalize(category)} <span className="text-sm font-normal text-gray-500">(Answer 3)</span>
                                </h2>
                                <div className="space-y-4">
                                    {randomizedQuestions[category].map((question, idx) => {
                                        const key = `${category}_${idx}`;
                                        return (
                                            <div key={key} className="space-y-2">
                                                <label className="block text-gray-700 dark:text-white">{question}</label>
                                                <div className="flex gap-4">
                                                    {['yes', 'no', 'unsure'].map((option) => (
                                                        <label key={option} className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                name={key}
                                                                value={option}
                                                                checked={state[key] === option}
                                                                onChange={(e) => handleAnswerChange(key, e.target.value)}
                                                                className="form-radio text-indigo-600"
                                                            />
                                                            <span className="ml-2 capitalize">{option}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Bonus Reflection</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{randomBonusQuestion}</p>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={bonusAnswer}
                                onChange={(e) => setBonusAnswer(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-sm mt-2">{bonusAnswer}%</div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow"
                            >
                                Submit Reflection
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">No reflection questions available.</p>
                )}

                {showModal && <ReflectionModal total={score} />}
            </div>
        </div>
    );
}

export default ReflectionPage;