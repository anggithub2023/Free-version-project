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
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition, setSelectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [loadingSelections, setLoadingSelections] = useState(!selectedSport);
    const [answers, dispatch] = useReducer(
        answersReducer,
        {},
        () => JSON.parse(localStorage.getItem('processAnswers')) || {}
    );
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [randomizedQuestions, setRandomizedQuestions] = useState({});

    const handleStartComplete = (sport, position) => {
        setSelectedSport(sport);
        setSelectedPosition(position);
        setLoadingSelections(false);
        dispatch({ type: 'RESET' });
    };

    useEffect(() => {
        if (selectedSport) {
            const rawQuestions = QUESTIONS[selectedSport]?.[selectedPosition?.toLowerCase()] || QUESTIONS[selectedSport];
            if (rawQuestions) {
                const randomized = {};
                Object.keys(rawQuestions).forEach((category) => {
                    const shuffled = [...rawQuestions[category]].sort(() => Math.random() - 0.5);
                    randomized[category] = shuffled.slice(0, 3); // Only 3 questions
                });
                setRandomizedQuestions(randomized);
            }
        }
    }, [selectedSport, selectedPosition]);

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setHideHeader(currentY > lastScrollY && currentY > 100);
            setLastScrollY(currentY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    if (loadingSelections) {
        return <ReflectionStartFlow onComplete={handleStartComplete} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">

                {Object.keys(randomizedQuestions).map((category) => (
                    <SectionBlock
                        key={category}
                        title={formatSectionTitle(category)}
                        questions={randomizedQuestions[category]}
                        sectionKey={category}
                        answers={answers}
                        handleAnswer={handleAnswer}
                    />
                ))}

                <BonusQuestion
                    answers={answers}
                    dispatch={dispatch}
                />

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
                    onClose={() => window.location.href = '/'}
                />
            )}
        </div>
    );
}

function formatSectionTitle(key) {
    const map = {
        offense: 'Offense',
        defense: 'Defense',
        teamIdentity: 'Team Identity & Culture',
        focus: 'Focus',
        preparation: 'Preparation',
        execution: 'Execution',
    };
    return map[key] || key;
}

export default ReflectionPage;