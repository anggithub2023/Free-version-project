// src/pages/ReflectionPage.jsx
import React, { useEffect, useReducer, useState } from 'react';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';

function ReflectionPage() {
    const [sport, setSport] = useState('');
    const [position, setPosition] = useState('');
    const [loadingSelections, setLoadingSelections] = useState(true);
    const [answers, dispatch] = useReducer(answersReducer, {});
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [hideTitle, setHideTitle] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [randomizedQuestions, setRandomizedQuestions] = useState({
        offense: [],
        defense: [],
        teamIdentity: [],
        focus: [],
        preparation: [],
        execution: [],
        goalieFocus: [],
        pitcherExecution: [],
    });

    useEffect(() => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setHideTitle(currentY > lastScrollY && currentY > 50);
            setLastScrollY(currentY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleStartComplete = (selectedSport, selectedPosition) => {
        setSport(selectedSport);
        setPosition(selectedPosition);
        setLoadingSelections(false);

        const selectedQuestions = QUESTIONS[selectedSport] || {};
        const randomized = {};

        for (const [category, questions] of Object.entries(selectedQuestions)) {
            randomized[category] = [...questions].sort(() => 0.5 - Math.random()).slice(0, 3);
        }

        // 🥅 Special position randomizer if needed
        if (selectedPosition.toLowerCase().includes('goalie') && selectedQuestions.goalieFocus) {
            randomized.goalieFocus = [...selectedQuestions.goalieFocus].sort(() => 0.5 - Math.random()).slice(0, 3);
        }
        if (selectedPosition.toLowerCase().includes('pitcher') && selectedQuestions.pitcherExecution) {
            randomized.pitcherExecution = [...selectedQuestions.pitcherExecution].sort(() => 0.5 - Math.random()).slice(0, 3);
        }

        setRandomizedQuestions(randomized);
        dispatch({ type: 'RESET' });
    };

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleBonusChange = (value) => {
        dispatch({ type: 'SET_BONUS', value });
    };

    const handleSubmit = () => {
        const totalAnswered = Object.keys(answers).filter(key => answers[key]).length;
        const bonusScore = answers['bonus'] ? parseInt(answers['bonus'], 10) : 0;
        const totalScore = Math.round((totalAnswered / (Object.values(randomizedQuestions).flat().length + 1)) * 100);

        setScoreSummary({
            total: totalScore,
            bonus: bonusScore,
        });

        setShowModal(true);
    };

    if (loadingSelections) {
        return <ReflectionStartFlow onComplete={handleStartComplete} />;
    }

    const isTeamSport = ['basketball', 'soccer', 'football', 'lacrosse', 'iceHockey', 'baseball'].includes(sport);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${hideTitle ? '-translate-y-full' : 'translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                {isTeamSport ? (
                    <>
                        <SectionBlock
                            title="Offense"
                            questions={randomizedQuestions.offense}
                            sectionKey="offense"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                        <SectionBlock
                            title="Defense"
                            questions={randomizedQuestions.defense}
                            sectionKey="defense"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                        <SectionBlock
                            title="Team Identity & Culture"
                            questions={randomizedQuestions.teamIdentity}
                            sectionKey="teamIdentity"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                    </>
                ) : (
                    <>
                        <SectionBlock
                            title="Focus"
                            questions={randomizedQuestions.focus}
                            sectionKey="focus"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                        <SectionBlock
                            title="Preparation"
                            questions={randomizedQuestions.preparation}
                            sectionKey="preparation"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                        <SectionBlock
                            title="Execution"
                            questions={randomizedQuestions.execution}
                            sectionKey="execution"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                    </>
                )}

                {/* Special Position Block 🥅 */}
                {randomizedQuestions.goalieFocus?.length > 0 && (
                    <SectionBlock
                        title="Goalie Special Focus"
                        questions={randomizedQuestions.goalieFocus}
                        sectionKey="goalieFocus"
                        answers={answers}
                        handleAnswer={handleAnswer}
                    />
                )}
                {randomizedQuestions.pitcherExecution?.length > 0 && (
                    <SectionBlock
                        title="Pitcher Special Execution"
                        questions={randomizedQuestions.pitcherExecution}
                        sectionKey="pitcherExecution"
                        answers={answers}
                        handleAnswer={handleAnswer}
                    />
                )}

                {/* Bonus */}
                <BonusQuestion value={answers.bonus || 0} onChange={handleBonusChange} />

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
                    onClose={() => window.location.href = '/'}
                />
            )}
        </div>
    );
}

export default ReflectionPage;