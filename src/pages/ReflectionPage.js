import React, { useReducer, useEffect, useState } from 'react';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SectionBlock from '../components/SectionBlock';
import SportSelectionModal from '../components/ReflectionModal/SportSelectionModal';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import handleSubmit from '../helpers/handleSubmit';

function ReflectionPage() {
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);

    // 🛠 Load selectedSport safely
    const [selectedSport, setSelectedSport] = useState(() => {
        const rawSport = localStorage.getItem('selectedSport');
        return rawSport && rawSport !== 'null' && rawSport !== '' ? rawSport : null;
    });

    // 🛠 Load saved answers if any
    const [answers, dispatch] = useReducer(answersReducer, {}, () => {
        return JSON.parse(localStorage.getItem('processAnswers')) || {};
    });

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleResetSport = () => {
        localStorage.removeItem('selectedSport');
        setSelectedSport(null);
    };

    // ✅ IF no selectedSport, show SportSelectionModal
    if (!selectedSport) {
        return (
            <SportSelectionModal onSelect={(sport) => setSelectedSport(sport)} />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-xl mx-auto p-4">
                {/* Title and reset */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-wide uppercase">
                        Focus. Reflect. Dominate.
                    </h1>
                    <button
                        onClick={handleResetSport}
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                    >
                        Change Sport
                    </button>
                </div>

                {/* Sections */}
                <SectionBlock
                    title={<>Offense <span className="text-sm text-gray-500">(5 required)</span></>}
                    questions={QUESTIONS[selectedSport]?.offense || []}
                    sectionKey="offense"
                    answers={answers}
                    handleAnswer={handleAnswer}
                    bgClass="from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
                />

                <SectionBlock
                    title={<>Defense <span className="text-sm text-gray-500">(5 required)</span></>}
                    questions={QUESTIONS[selectedSport]?.defense || []}
                    sectionKey="defense"
                    answers={answers}
                    handleAnswer={handleAnswer}
                    bgClass="from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
                />

                <SectionBlock
                    title={<>Team Identity & Culture <span className="text-sm text-gray-500">(5 required)</span></>}
                    questions={QUESTIONS[selectedSport]?.teamIdentity || []}
                    sectionKey="teamIdentity"
                    answers={answers}
                    handleAnswer={handleAnswer}
                    bgClass="from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
                />

                {/* Buttons */}
                <div className="mt-6 flex justify-between gap-4">
                    <button
                        onClick={() => handleSubmit(answers, setScoreSummary, setShowModal)}
                        className="flex-1 bg-indigo-700 text-white px-6 py-3 rounded hover:bg-indigo-600"
                    >
                        Submit Reflection
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500"
                    >
                        Back Home
                    </button>
                </div>

                {/* Reflection result modal */}
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
        </div>
    );
}

export default ReflectionPage;