import React, { useState, useEffect, useReducer } from 'react';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import getRandomQuestionsReflection from '../helpers/getRandomQuestionsReflection';
import answersReducer from '../reducers/answersReducer';

const SESSION_TIMEOUT_MINUTES = 5;

function clearSessionData() {
    localStorage.removeItem('selectedSport');
    localStorage.removeItem('selectedPosition');
    localStorage.removeItem('processAnswers');
    localStorage.removeItem('randomReflectionQuestions');
}

function ReflectionPage() {
    const [sport, setSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [randomQuestions, setRandomQuestions] = useState(() => {
        const saved = localStorage.getItem('randomReflectionQuestions');
        return saved ? JSON.parse(saved) : null;
    });
    const [showStartFlow, setShowStartFlow] = useState(!sport);
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

    useEffect(() => {
        const sessionTimer = setTimeout(() => {
            clearSessionData();
            window.location.reload();
        }, SESSION_TIMEOUT_MINUTES * 60 * 1000);

        window.addEventListener('beforeunload', clearSessionData);

        return () => {
            clearTimeout(sessionTimer);
            window.removeEventListener('beforeunload', clearSessionData);
        };
    }, []);

    const handleStartFlowComplete = (selectedSport, selectedPosition) => {
        setSport(selectedSport);
        setPosition(selectedPosition);
        const generated = getRandomQuestionsReflection(selectedSport, selectedPosition);
        setRandomQuestions(generated);
        localStorage.setItem('randomReflectionQuestions', JSON.stringify(generated));
        setShowStartFlow(false);
    };

    if (showStartFlow || !randomQuestions) {
        return <ReflectionStartFlow onComplete={handleStartFlowComplete} />;
    }

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleSubmit = () => {
        const totalQuestions = Object.keys(answers).length;
        const totalYes = Object.values(answers).filter(v => v === 'yes').length;
        const total = Math.round((totalYes / totalQuestions) * 100);

        const offenseKeys = Object.keys(answers).filter(k => k.startsWith('offense'));
        const defenseKeys = Object.keys(answers).filter(k => k.startsWith('defense'));
        const cultureKeys = Object.keys(answers).filter(k => k.startsWith('teamIdentity'));

        const calcSection = (keys) => {
            const yes = keys.filter(k => answers[k] === 'yes').length;
            return keys.length ? Math.round((yes / keys.length) * 100) : 0;
        };

        setScoreSummary({
            total,
            offense: calcSection(offenseKeys),
            defense: calcSection(defenseKeys),
            culture: calcSection(cultureKeys),
            bonus: answers['bonusReflection'] || 50
        });

        setShowModal(true);
        dispatch({ type: 'RESET' });
        clearSessionData();
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold mb-8 text-center">Reflection</h1>

                {['offense', 'defense', 'teamIdentity'].map((section) => (
                    randomQuestions[section] && (
                        <SectionBlock
                            key={section}
                            title={section.charAt(0).toUpperCase() + section.slice(1)}
                            questions={randomQuestions[section]}
                            sectionKey={section}
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                    )
                ))}

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
                        total={scoreSummary.total}
                        offense={scoreSummary.offense}
                        defense={scoreSummary.defense}
                        culture={scoreSummary.culture}
                        bonus={scoreSummary.bonus}
                        onClose={() => window.location.href = '/'}
                    />
                )}
            </div>
        </div>
    );
}

export default ReflectionPage;