import React, { useState, useEffect, useReducer } from 'react';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import getRandomQuestionsReflection from '../helpers/getRandomQuestionsReflection';
import { saveReflection } from '../services/syncService'; // ✅ Add this line

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
        const normalizedPosition = position?.toLowerCase().replace(/\s+/g, '-');
        const key = normalizedPosition ? `${sport}-${normalizedPosition}` : sport;
        const fullQuestions = QUESTIONS[key];
        if (!fullQuestions) {
            console.error('No questions found for:', key);
            return;
        }
        const randomized = getRandomQuestionsReflection(fullQuestions);
        localStorage.setItem('randomQuestionsReflection', JSON.stringify(randomized));
        localStorage.setItem('selectedSport', sport);
        if (position) {
            localStorage.setItem('selectedPosition', normalizedPosition);
        }
        setShowStartFlow(false);
    };

    const randomizedQuestions = JSON.parse(localStorage.getItem('randomQuestionsReflection'));

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleSubmit = async () => {
        const allKeys = Object.keys(answers).filter(k => k !== 'bonusReflection');
        const totalYes = allKeys.filter(k => answers[k] === 'yes').length;
        const total = allKeys.length ? Math.round((totalYes / allKeys.length) * 100) : 0;

        const sectionKeys = [...new Set(allKeys.map(k => k.split('-')[0]))];

        const sectionScores = sectionKeys.reduce((acc, section) => {
            const keys = allKeys.filter(k => k.startsWith(section));
            const yesCount = keys.filter(k => answers[k] === 'yes').length;
            acc[section] = keys.length ? Math.round((yesCount / keys.length) * 100) : 0;
            return acc;
        }, {});

        const reflectionData = {
            sport: localStorage.getItem('selectedSport'),
            position: localStorage.getItem('selectedPosition'),
            scores: {
                total,
                ...sectionScores,
                bonus: answers['bonusReflection'] || 50
            },
            created_at: new Date().toISOString()
        };

        try {
            await saveReflection(reflectionData); // ✅ Send to Supabase
        } catch (err) {
            console.warn('📦 Queuing reflection due to sync error');
            const queue = JSON.parse(localStorage.getItem('unsyncedReflections') || '[]');
            queue.push(reflectionData);
            localStorage.setItem('unsyncedReflections', JSON.stringify(queue));
        }

        localStorage.setItem('latestReflection', JSON.stringify(reflectionData));
        setScoreSummary(reflectionData.scores);
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