// src/pages/ReflectionPage.jsx

import React, { useEffect, useReducer, useState } from 'react';
import QUESTIONS from '../data/QUESTIONS';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SportSelectionModal from '../components/ReflectionModal/SportSelectionModal';
import PositionSelectionModal from '../components/ReflectionModal/PositionSelectionModal';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import handleSubmit from '../helpers/handleSubmit';
import answersReducer from '../reducers/answersReducer';

function ReflectionPage() {
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [showSportSelection, setShowSportSelection] = useState(true);
    const [showPositionSelection, setShowPositionSelection] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [answers, dispatch] = useReducer(
        answersReducer,
        {},
        () => JSON.parse(localStorage.getItem('processAnswers')) || {}
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleScroll = () => {
        const currentY = window.scrollY;
        setHideHeader(currentY > lastScrollY && currentY > 100);
        setLastScrollY(currentY);
    };

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleSportSelect = (sport) => {
        setSelectedSport(sport);
        if (['soccer', 'football', 'baseball', 'iceHockey', 'lacrosse'].includes(sport)) {
            setShowPositionSelection(true);
        } else {
            setShowSportSelection(false);
        }
    };

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        setShowPositionSelection(false);
        setShowSportSelection(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
        window.location.href = '/';
    };

    const getQuestions = (category) => {
        if (!selectedSport) return [];

        const sportData = QUESTIONS[selectedSport];
        if (selectedPosition && sportData?.[selectedPosition]?.[category]) {
            return sportData[selectedPosition][category];
        }

        return sportData?.[category] || [];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                {/* Sport / Position Modal Logic */}
                {showSportSelection && <SportSelectionModal onSelect={handleSportSelect} />}
                {showPositionSelection && <PositionSelectionModal sport={selectedSport} onSelect={handlePositionSelect} />}

                {/* Only show questions if sport and position are ready */}
                {!showSportSelection && !showPositionSelection && (
                    <>
                        <SectionBlock
                            title={<><span>Offense</span> <span className="text-sm text-gray-100">(5 required)</span></>}
                            questions={getQuestions('offense')}
                            sectionKey="offense"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                        <SectionBlock
                            title={<><span>Defense</span> <span className="text-sm text-gray-100">(5 required)</span></>}
                            questions={getQuestions('defense')}
                            sectionKey="defense"
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                        <SectionBlock
                            title={<><span>Team Identity</span> <span className="text-sm text-gray-100">(5 required)</span></>}
                            questions={getQuestions('teamIdentity')}
                            sectionKey="teamIdentity"
                            answers={answers}
                            handleAnswer={handleAnswer}
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
                    </>
                )}
            </main>

            {showModal && scoreSummary && (
                <ReflectionModal
                    total={scoreSummary.total}
                    offense={scoreSummary.offense}
                    defense={scoreSummary.defense}
                    culture={scoreSummary.culture}
                    bonus={scoreSummary.bonus}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}

export default ReflectionPage;
