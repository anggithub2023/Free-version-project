// src/pages/ReflectionPage.jsx

import React, { useState, useEffect, useReducer } from 'react';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import handleSubmit from '../helpers/handleSubmit';

function ReflectionPage() {
    const [sport, setSport] = useState('');
    const [position, setPosition] = useState('');
    const [answers, dispatch] = useReducer(answersReducer, {});
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        // Always clear old session if coming fresh
        const prevRoute = document.referrer;
        if (!prevRoute.includes('/reflect')) {
            localStorage.removeItem('selectedSport');
            localStorage.removeItem('selectedPosition');
        }
    }, []);

    const handleStart = (selectedSport, selectedPosition) => {
        setSport(selectedSport);
        setPosition(selectedPosition);
    };

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

    if (!sport) {
        return <ReflectionStartFlow onComplete={handleStart} />;
    }

    // Select random 3 questions per category
    const getRandomQuestions = (questions, count = 3) => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const selectedQuestions = QUESTIONS[sport]?.[position] || QUESTIONS[sport];

    const offenseQs = selectedQuestions?.offense ? getRandomQuestions(selectedQuestions.offense) : [];
    const defenseQs = selectedQuestions?.defense ? getRandomQuestions(selectedQuestions.defense) : [];
    const teamIdentityQs = selectedQuestions?.teamIdentity ? getRandomQuestions(selectedQuestions.teamIdentity) : [];
    const focusQs = selectedQuestions?.focus ? getRandomQuestions(selectedQuestions.focus) : [];
    const preparationQs = selectedQuestions?.preparation ? getRandomQuestions(selectedQuestions.preparation) : [];
    const executionQs = selectedQuestions?.execution ? getRandomQuestions(selectedQuestions.execution) : [];

    const bonusQuestion = selectedQuestions?.bonus || 'What was the best thing you did today?';

    const isTeamSport = ['basketball', 'soccer', 'football', 'lacrosse', 'iceHockey', 'baseball'].includes(sport);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                {isTeamSport ? (
                    <>
                        <SectionBlock title="Offense" questions={offenseQs} sectionKey="offense" answers={answers} handleAnswer={handleAnswer} />
                        <SectionBlock title="Defense" questions={defenseQs} sectionKey="defense" answers={answers} handleAnswer={handleAnswer} />
                        <SectionBlock title="Team Identity & Culture" questions={teamIdentityQs} sectionKey="teamIdentity" answers={answers} handleAnswer={handleAnswer} />
                    </>
                ) : (
                    <>
                        <SectionBlock title="Focus" questions={focusQs} sectionKey="focus" answers={answers} handleAnswer={handleAnswer} />
                        <SectionBlock title="Preparation" questions={preparationQs} sectionKey="preparation" answers={answers} handleAnswer={handleAnswer} />
                        <SectionBlock title="Execution" questions={executionQs} sectionKey="execution" answers={answers} handleAnswer={handleAnswer} />
                    </>
                )}

                <BonusQuestion answers={answers} dispatch={dispatch} bonusPrompt={bonusQuestion} />

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

export default ReflectionPage;
