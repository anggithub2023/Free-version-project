import React, { useReducer, useEffect, useState } from 'react';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SectionBlock from '../components/SectionBlock';
import SportSelectionModal from '../components/ReflectionModal/SportSelectionModal';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';

import { MdOutlineSend } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

const sportEmojis = {
    basketball: '🏀',
    soccer: '⚽',
    football: '🏈',
    baseball: '⚾',
    iceHockey: '🏒',
    trackCrossCountry: '🏃‍♂️',
    lacrosse: '🥍',
    golf: '🏌️',
};

const teamSports = ['basketball', 'soccer', 'football', 'lacrosse', 'iceHockey'];
const individualSports = ['golf', 'trackCrossCountry'];

function ReflectionPage() {
    const [showModal, setShowModal] = useState(true);
    const [selectedSport, setSelectedSport] = useState(null);
    const [scoreSummary, setScoreSummary] = useState(null);

    const [answers, dispatch] = useReducer(answersReducer, {}, () => {
        return {};
    });

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleSelectSport = (sport) => {
        setSelectedSport(sport);
        localStorage.setItem('selectedSport', sport);
        dispatch({ type: 'RESET' });
        setShowModal(false);
    };

    const handleResetSport = () => {
        localStorage.removeItem('selectedSport');
        dispatch({ type: 'RESET' });
        setShowModal(true);
        setSelectedSport(null);
    };

    const handleReflectionSubmit = () => {
        const total = calculateTotalScore();
        setScoreSummary({ total });
        setShowModal(false);
    };

    const calculateTotalScore = () => {
        const values = Object.values(answers);
        if (!values.length) return 0;
        const positive = values.filter((v) => v === 'yes').length;
        return Math.round((positive / values.length) * 100);
    };

    const renderTeamSections = () => (
        <>
            <SectionBlock
                title="Offense (5 required)"
                questions={QUESTIONS[selectedSport]?.offense || []}
                sectionKey="offense"
                answers={answers}
                handleAnswer={handleAnswer}
                bgClass="from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800"
            />
            <SectionBlock
                title="Defense (5 required)"
                questions={QUESTIONS[selectedSport]?.defense || []}
                sectionKey="defense"
                answers={answers}
                handleAnswer={handleAnswer}
                bgClass="from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800"
            />
            <SectionBlock
                title="Team Identity & Culture (5 required)"
                questions={QUESTIONS[selectedSport]?.teamIdentity || []}
                sectionKey="teamIdentity"
                answers={answers}
                handleAnswer={handleAnswer}
                bgClass="from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800"
            />
        </>
    );

    const renderIndividualSections = () => (
        <>
            <SectionBlock
                title="Focus & Mental Preparation"
                questions={QUESTIONS[selectedSport]?.focus || []}
                sectionKey="focus"
                answers={answers}
                handleAnswer={handleAnswer}
                bgClass="from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800"
            />
            <SectionBlock
                title="Preparation & Strategy"
                questions={
                    QUESTIONS[selectedSport]?.preparation ||
                    QUESTIONS[selectedSport]?.courseManagement ||
                    []
                }
                sectionKey="preparation"
                answers={answers}
                handleAnswer={handleAnswer}
                bgClass="from-lime-50 to-lime-100 dark:from-lime-900 dark:to-lime-800"
            />
            <SectionBlock
                title="Execution & Effort"
                questions={QUESTIONS[selectedSport]?.execution || []}
                sectionKey="execution"
                answers={answers}
                handleAnswer={handleAnswer}
                bgClass="from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800"
            />
        </>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800 relative">
            <div className="max-w-xl mx-auto p-4">

                {/* 🛠 Sport selection modal */}
                {showModal && <SportSelectionModal onSelect={handleSelectSport} />}

                {/* 🛠 Main content */}
                {!showModal && (
                    <>
                        <div className="flex items-center justify-center mb-6">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white tracking-wide uppercase flex items-center gap-2 text-center">
                                <span className="text-3xl">{sportEmojis[selectedSport]}</span>
                                Focus. Reflect. Dominate.
                                <button
                                    onClick={handleResetSport}
                                    className="ml-2 p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-lg shadow-md"
                                    title="Change Sport"
                                >
                                    {sportEmojis[selectedSport]}
                                </button>
                            </h1>
                        </div>

                        {teamSports.includes(selectedSport) && renderTeamSections()}
                        {individualSports.includes(selectedSport) && renderIndividualSections()}
                    </>
                )}

                {/* 🛠 Floating Action Buttons */}
                {!showModal && (
                    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4">
                        <button
                            onClick={handleReflectionSubmit}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg"
                            title="Submit Reflection"
                        >
                            <MdOutlineSend size={24} />
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg"
                            title="Back Home"
                        >
                            <AiOutlineHome size={24} />
                        </button>
                    </div>
                )}

                {/* 🛠 Score modal after reflection submit */}
                {scoreSummary && (
                    <ReflectionModal
                        total={scoreSummary.total}
                        offense={scoreSummary.total} // simplified
                        defense={scoreSummary.total} // simplified
                        culture={scoreSummary.total} // simplified
                        onClose={() => window.location.href = '/'}
                    />
                )}
            </div>
        </div>
    );
}

export default ReflectionPage;