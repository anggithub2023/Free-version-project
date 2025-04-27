// src/pages/ReflectionPage.jsx

import React, { useEffect, useReducer, useState } from 'react';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import handleSubmit from '../helpers/handleSubmit';

function ReflectionPage() {
    const [showStartFlow, setShowStartFlow] = useState(() => !localStorage.getItem('selectedSport'));
    const [sport, setSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [position, setPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [answers, dispatch] = useReducer(answersReducer, {}, () => ({}));

    const [randomQuestions, setRandomQuestions] = useState({ offense: [], defense: [], teamIdentity: [] });

    useEffect(() => {
        if (sport) {
            const currentQuestions = QUESTIONS[sport]?.questions;
            if (currentQuestions) {
                const offense = shuffleArray(currentQuestions.offense || []).slice(0, 3);
                const defense = shuffleArray(currentQuestions.defense || []).slice(0, 3);
                const teamIdentity = shuffleArray(currentQuestions.teamIdentity || []).slice(0, 3);
                setRandomQuestions({ offense, defense, teamIdentity });
            }
        }
    }, [sport]);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setHideHeader(currentY > lastScrollY && currentY > 100);
            setLastScrollY(currentY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const shuffleArray = (array) => {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleBonus = (value) => {
        dispatch({ type: 'SET_ANSWER', key: 'bonus', value });
    };

    const handleStartComplete = (selectedSport, selectedPosition) => {
        setSport(selectedSport);
        setPosition(selectedPosition);
        setShowStartFlow(false);
    };

    if (showStartFlow) {
        return <ReflectionStartFlow onComplete={handleStartComplete} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header
                className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${
                    hideHeader ? '-translate-y-full' : 'translate-y-0'
                }`}
            >
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                <SectionBlock
                    title={<>
                        Offense
                    </>}
                    questions={randomQuestions.offense}
                    sectionKey="offense"
                    answers={answers}
                    handleAnswer={handleAnswer}
                />

                <SectionBlock
                    title={<>
                        Defense
                    </>}
                    questions={randomQuestions.defense}
                    sectionKey="defense"
                    answers={answers}
                    handleAnswer={handleAnswer}
                />

                <SectionBlock
                    title={<>
                        Team Identity & Culture
                    </>}
                    questions={randomQuestions.teamIdentity}
                    sectionKey="teamIdentity"
                    answers={answers}
                    handleAnswer={handleAnswer}
                />

                <BonusQuestion answers={answers} handleBonus={handleBonus} />

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                        onClick={() => handleSubmit(answers, setScoreSummary, setShowModal)}
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
