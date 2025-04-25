import React, { useReducer, useEffect, useState } from 'react';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import SectionBlock from '../components/SectionBlock';
import SportSelectionModal from '../components/ReflectionModal/SportSelectionModal';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import handleSubmit from '../helpers/handleSubmit';

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

function ReflectionPage() {
    const [showModal, setShowModal] = useState(true);
    const [selectedSport, setSelectedSport] = useState(null);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [showChangeSportFAB, setShowChangeSportFAB] = useState(true);

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

    // 🛠 Scroll Listener to hide/reveal Change Sport FAB
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setShowChangeSportFAB(false);
            } else {
                // Scrolling up
                setShowChangeSportFAB(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800 relative">
            <div className="max-w-xl mx-auto p-4">

                {showModal && (
                    <SportSelectionModal onSelect={handleSelectSport} />
                )}

                {!showModal && (
                    <>
                        {/* Title Section */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-800 dark:text-white tracking-wide uppercase flex items-center gap-2">
                                <span className="text-2xl">{sportEmojis[selectedSport]}</span>
                                Focus. Reflect. Dominate.
                            </h1>
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
                    </>
                )}

                {/* Floating Action Buttons */}
                {!showModal && (
                    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4">
                        {/* Submit FAB */}
                        <button
                            onClick={() => handleSubmit(answers, setScoreSummary, setShowModal)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg"
                            title="Submit Reflection"
                        >
                            📝
                        </button>

                        {/* Home FAB */}
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg"
                            title="Home"
                        >
                            🏠
                        </button>

                        {/* Change Sport FAB */}
                        <button
                            onClick={handleResetSport}
                            className={`bg-red-500 hover:bg-red-400 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
                                showChangeSportFAB ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                            title="Change Sport"
                        >
                            🔄
                        </button>
                    </div>
                )}

                {/* Score Modal after submitting */}
                {scoreSummary && (
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