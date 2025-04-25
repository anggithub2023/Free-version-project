import React, { useState, useEffect, useReducer } from 'react';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SportSelectionModal from '../components/ReflectionModal/SportSelectionModal';

function ReflectionPage() {
    const [selectedSport, setSelectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(null);
    const [showSportSelection, setShowSportSelection] = useState(!selectedSport);
    const [state, dispatch] = useReducer(answersReducer, {});

    const teamSports = ['basketball', 'soccer', 'football', 'lacrosse', 'iceHockey', 'baseball'];

    useEffect(() => {
        if (selectedSport) {
            localStorage.setItem('selectedSport', selectedSport);
        }
    }, [selectedSport]);

    const handleAnswerChange = (key, value) => {
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const renderSectionTitle = (title) => (
        <h2 className="text-xl font-bold text-gray-800 mb-2">
            {title} <span className="text-sm font-normal text-gray-500">(5 required)</span>
        </h2>
    );

    const calculateTotalScore = () => {
        const selectedQuestions = QUESTIONS[selectedSport?.toLowerCase()];
        if (!selectedQuestions) return 0;

        const allKeys = Object.keys(selectedQuestions).flatMap(category =>
            selectedQuestions[category].map((q, index) => `${category}_${index}`)
        );

        const answered = allKeys.filter(key => state[key]);
        return Math.round((answered.length / allKeys.length) * 100);
    };

    const handleSubmit = () => {
        const total = calculateTotalScore();
        setScore(total);

        const processHistory = JSON.parse(localStorage.getItem('processHistory')) || [];
        const newEntry = {
            timestamp: Date.now(),
            total,
            offense: 0,
            defense: 0,
            teamIdentity: 0
        };
        localStorage.setItem('processHistory', JSON.stringify([...processHistory, newEntry]));

        setShowModal(true);
        dispatch({ type: 'RESET' });
    };

    const renderTeamSections = () => {
        const selectedQuestions = QUESTIONS[selectedSport?.toLowerCase()];
        if (!selectedQuestions) {
            return <p className="text-center text-gray-500 mt-10">No reflection questions available for {selectedSport}.</p>;
        }

        return (
            <>
                {['offense', 'defense', 'teamIdentity'].map((category) => (
                    <div key={category} className="mb-8">
                        {renderSectionTitle(capitalize(category))}
                        <div className="space-y-2">
                            {selectedQuestions[category]?.map((question, idx) => {
                                const key = `${category}_${idx}`;
                                return (
                                    <div key={key} className="flex items-center">
                                        <input
                                            id={key}
                                            type="checkbox"
                                            checked={state[key] || false}
                                            onChange={(e) => handleAnswerChange(key, e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={key} className="text-gray-700">{question}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    const renderIndividualSections = () => {
        const selectedQuestions = QUESTIONS[selectedSport?.toLowerCase()];
        if (!selectedQuestions) {
            return <p className="text-center text-gray-500 mt-10">No reflection questions available for {selectedSport}.</p>;
        }

        return (
            <>
                {['focus', 'preparation', 'execution'].map((category) => (
                    <div key={category} className="mb-8">
                        {renderSectionTitle(capitalize(category))}
                        <div className="space-y-2">
                            {selectedQuestions[category]?.map((question, idx) => {
                                const key = `${category}_${idx}`;
                                return (
                                    <div key={key} className="flex items-center">
                                        <input
                                            id={key}
                                            type="checkbox"
                                            checked={state[key] || false}
                                            onChange={(e) => handleAnswerChange(key, e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={key} className="text-gray-700">{question}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    const handleSportSelect = (sport) => {
        setSelectedSport(sport);
        setShowSportSelection(false);
        dispatch({ type: 'RESET' });
    };

    if (showSportSelection) {
        return <SportSelectionModal onSelectSport={handleSportSelect} />;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Reflection</h1>

                {teamSports.includes(selectedSport?.toLowerCase())
                    ? renderTeamSections()
                    : renderIndividualSections()
                }

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow"
                    >
                        Submit Reflection
                    </button>
                </div>

                {showModal && <ReflectionModal total={score} />}
            </div>
        </div>
    );
}

export default ReflectionPage;