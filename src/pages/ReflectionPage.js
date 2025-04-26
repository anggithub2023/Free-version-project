// src/pages/ReflectionPage.jsx (FINALIZED + Bonus Styling Fixed)

import React, { useState, useEffect, useReducer } from 'react';
import QUESTIONS, { BONUS_QUESTIONS } from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import handleSubmit from '../helpers/handleSubmit';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import SectionBlock from '../components/ReflectionModal/SectionBlock';

function ReflectionPage() {
    const [ready, setReady] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [answers, dispatch] = useReducer(
        answersReducer,
        {},
        () => JSON.parse(localStorage.getItem('processAnswers')) || {}
    );
    const [bonusAnswer, setBonusAnswer] = useState(50);
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [lockedQuestions, setLockedQuestions] = useState(null);
    const [bonusQuestion, setBonusQuestion] = useState('');

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

    useEffect(() => {
        const sport = localStorage.getItem('selectedSport') || '';
        const position = localStorage.getItem('selectedPosition') || '';
        setSelectedSport(sport);
        setSelectedPosition(position);
        if (sport) setReady(true);
    }, []);

    useEffect(() => {
        if (ready) {
            const selected = getSelectedQuestions();
            if (selected) {
                const randomized = randomizeQuestions(selected);
                setLockedQuestions(randomized);
            }
            setBonusQuestion(BONUS_QUESTIONS[Math.floor(Math.random() * BONUS_QUESTIONS.length)]);
        }
    }, [ready]);

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
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

    if (!ready || !lockedQuestions) {
        return <ReflectionStartFlow onComplete={() => window.location.reload()} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header
                className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                {Object.keys(lockedQuestions).map((category) => (
                    <SectionBlock
                        key={category}
                        title={<>{category.replace(/([A-Z])/g, ' $1').trim()} <span className="text-sm text-gray-100">(3 required)</span></>}
                        questions={lockedQuestions[category]}
                        sectionKey={category}
                        answers={answers}
                        handleAnswer={handleAnswer}
                    />
                ))}

                <div className="mb-12">
                    <h2 className="text-center text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">Bonus Reflection</h2>
                    <div className="border p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md">
                        <p className="text-gray-800 dark:text-white mb-4 font-medium">{bonusQuestion}</p>
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
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                        onClick={() => handleSubmit(answers, setScoreSummary, setShowModal, bonusAnswer)}
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
                    bonus={bonusAnswer}
                    onClose={() => window.location.href = '/'}
                />
            )}
        </div>
    );
}

export default ReflectionPage;