// src/pages/ReflectionPage.jsx (FINAL QA-PASSED VERSION)

import React, { useState, useEffect, useReducer } from 'react';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import getRandomQuestionsReflection from '../helpers/getRandomQuestionsReflection';

function ReflectionPage() {
    const [showStartFlow, setShowStartFlow] = useState(() => {
        const sport = localStorage.getItem('selectedSport');
        const randomQs = localStorage.getItem('randomQuestionsReflection');
        return !(sport && randomQs);
    });

    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);

    const [answers, dispatch] = useReducer(
        answersReducer,
        {},
        () => JSON.parse(localStorage.getItem('processAnswers')) || {}
    );

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleStartFlowComplete = (sport, position) => {
        const key = position ? `${sport}-${position.toLowerCase()}` : sport;
        const fullQuestions = QUESTIONS[key];
        if (!fullQuestions) {
            console.error('No questions found for:', key);
            return;
        }
        const randomized = getRandomQuestionsReflection(fullQuestions);
        localStorage.setItem('randomQuestionsReflection', JSON.stringify(randomized));
        localStorage.setItem('selectedSport', sport);
        if (position) {
            localStorage.setItem('selectedPosition', position);
        }
        setShowStartFlow(false);
    };

    const randomizedQuestions = JSON.parse(localStorage.getItem('randomQuestionsReflection'));

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleSubmit = () => {
        const totalQuestions = Object.keys(answers).length;
        const totalYes = Object.values(answers).filter(v => v === 'yes').length;
        const total = Math.round((totalYes / totalQuestions) * 100);

        const calcSection = (keys) => {
            const yes = keys.filter(k => answers[k] === 'yes').length;
            return keys.length ? Math.round((yes / keys.length) * 100) : 0;
        };

        setScoreSummary({
            total,
            offense: calcSection(Object.keys(answers).filter(k => k.startsWith('offense'))),
            defense: calcSection(Object.keys(answers).filter(k => k.startsWith('defense'))),
            culture: calcSection(Object.keys(answers).filter(k => k.startsWith('teamIdentity'))),
            bonus: answers['bonusReflection'] || 50,
        });

        setShowModal(true);
        dispatch({ type: 'RESET' });
    };

    if (showStartFlow) {
        return <ReflectionStartFlow onComplete={handleStartFlowComplete} />;
    }

    if (!randomizedQuestions) {
        return <div className="text-center p-10">Loading questions... Please refresh.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold mb-8 text-center">Reflection</h1>

                {Object.keys(randomizedQuestions).map(section =>
                        randomizedQuestions[section] && (
                            <SectionBlock
                                key={section}
                                title={section.charAt(0).toUpperCase() + section.slice(1)}
                                questions={randomizedQuestions[section]}
                                sectionKey={section}
                                answers={answers}
                                handleAnswer={handleAnswer}
                            />
                        )
                )}

                <BonusQuestion answers={answers} dispatch={dispatch} />

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow"
                    >
                        Submit Reflection
                    </button>
                </div>

                {showModal && scoreSummary && (
                    <ReflectionModal
                        {...scoreSummary}
                        sport={localStorage.getItem('selectedSport')}
                        position={localStorage.getItem('selectedPosition')}
                    />
                )}
            </div>
        </div>
    );
}

export default ReflectionPage;
