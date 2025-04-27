// src/pages/ReflectionPage.jsx

import React, { useState, useEffect, useReducer } from 'react';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import QUESTIONS, { BONUS_QUESTIONS } from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';

function ReflectionPage() {
    const [sport, setSport] = useState('');
    const [position, setPosition] = useState('');
    const [answers, dispatch] = useReducer(answersReducer, {});
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);

    useEffect(() => {
        const storedSport = localStorage.getItem('selectedSport') || '';
        const storedPosition = localStorage.getItem('selectedPosition') || '';
        setSport(storedSport);
        setPosition(storedPosition);
    }, []);

    if (!sport) {
        return <ReflectionStartFlow onComplete={(sport, position) => {
            setSport(sport);
            setPosition(position);
        }} />;
    }

    const getReflectionQuestions = () => {
        const specialKey = position ? `${sport}-${position.toLowerCase()}` : '';
        if (QUESTIONS[specialKey]) return QUESTIONS[specialKey];
        return QUESTIONS[sport];
    };

    const questions = getReflectionQuestions();

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleBonusAnswer = (value) => {
        dispatch({ type: 'SET_BONUS', value });
    };

    const handleSubmit = () => {
        const totalCategories = ['offense', 'defense', 'teamIdentity', 'focus', 'preparation', 'execution'];
        let totalAnswered = 0;
        let totalPossible = 0;

        totalCategories.forEach((cat) => {
            if (questions[cat]) {
                totalPossible += questions[cat].length;
                questions[cat].forEach((_, idx) => {
                    if (answers[`${cat}-${idx}`]) totalAnswered++;
                });
            }
        });

        const bonus = answers['bonus'] || 0;

        const total = Math.round((totalAnswered / (totalPossible || 1)) * 100);

        setScoreSummary({
            total,
            offense: calcCategory('offense'),
            defense: calcCategory('defense'),
            culture: calcCategory('teamIdentity'),
            bonus
        });

        setShowModal(true);
        dispatch({ type: 'RESET' });
    };

    const calcCategory = (category) => {
        if (!questions[category]) return 0;
        const totalCat = questions[category].length;
        const answeredCat = questions[category].filter((_, idx) => answers[`${category}-${idx}`]).length;
        return Math.round((answeredCat / (totalCat || 1)) * 100);
    };

    const randomQuestions = (list) => {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    const bonusPrompt = BONUS_QUESTIONS[Math.floor(Math.random() * BONUS_QUESTIONS.length)];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                {['offense', 'defense', 'teamIdentity', 'focus', 'preparation', 'execution'].map((section) => (
                    questions[section] && (
                        <SectionBlock
                            key={section}
                            title={section.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            questions={randomQuestions(questions[section])}
                            sectionKey={section}
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                    )
                ))}

                <BonusQuestion
                    question={bonusPrompt}
                    value={answers['bonus'] || 0}
                    onChange={handleBonusAnswer}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-indigo-700 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition-all"
                    >
                        Submit Reflection
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-500 transition-all"
                    >
                        Back Home
                    </button>
                </div>
            </main>

            {showModal && scoreSummary && (
                <ReflectionModal
                    total={scoreSummary.total}
                    offense={scoreSummary.offense}
                    defense={scoreSummary.defense}
                    culture={scoreSummary.culture}
                    bonus={scoreSummary.bonus}
                    onClose={() => window.location.href = '/'}
                />
            )}
        </div>
    );
}

export default ReflectionPage;
