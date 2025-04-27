// src/pages/ReflectionPage.jsx

import React, { useEffect, useState, useReducer } from 'react';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import answersReducer from '../reducers/answersReducer';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import handleSubmit from '../helpers/handleSubmit';

function ReflectionPage() {
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition, setSelectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
    const [waitingForSelection, setWaitingForSelection] = useState(!selectedSport);
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [answers, dispatch] = useReducer(answersReducer, {}, () => JSON.parse(localStorage.getItem('processAnswers')) || {});

    const [bonusAnswer, setBonusAnswer] = useState(50);

    useEffect(() => {
        if (!selectedSport) {
            setWaitingForSelection(true);
        } else {
            setWaitingForSelection(false);
        }
    }, [selectedSport]);

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    if (waitingForSelection) {
        return (
            <ReflectionStartFlow onComplete={(sport, position) => {
                setSelectedSport(sport);
                setSelectedPosition(position);
            }} />
        );
    }

    const sportKey = selectedPosition ? `${selectedSport}-${selectedPosition.toLowerCase().replace(' ', '')}` : selectedSport;
    const selectedQuestions = QUESTIONS[sportKey] || QUESTIONS[selectedSport];

    if (!selectedQuestions) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white">
                No reflection questions available for {selectedSport}.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                {['offense', 'defense', 'teamIdentity'].map((category) => (
                    selectedQuestions[category] && (
                        <SectionBlock
                            key={category}
                            title={category === 'teamIdentity' ? 'Team Identity & Culture' : capitalize(category)}
                            questions={selectedQuestions[category].slice(0, 3)}
                            sectionKey={category}
                            answers={answers}
                            handleAnswer={handleAnswer}
                        />
                    )
                ))}

                <BonusQuestion value={bonusAnswer} setValue={setBonusAnswer} />

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
                    bonus={scoreSummary.bonus}
                    onClose={() => window.location.href = '/'}
                />
            )}
        </div>
    );
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export default ReflectionPage;
