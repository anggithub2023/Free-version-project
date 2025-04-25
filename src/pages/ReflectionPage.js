import React, { useReducer, useEffect, useState } from 'react';
import ReflectionModal from '../components/ReflectionModal';
import SectionBlock from '../components/SectionBlock';

import QUESTIONS from '../data/basketball/questions';
import answersReducer from '../reducers/answersReducer';
import handleSubmit from '../helpers/handleSubmit';

function ReflectionPage() {
    const [showModal, setShowModal] = useState(false);
    const [scoreSummary, setScoreSummary] = useState(null);
    const [hideHeader, setHideHeader] = useState(false);

    // 🏆 LocalStorage medal + trophy tracking
    const [medals, setMedals] = useState(() => parseInt(localStorage.getItem('medals')) || 0);
    const [trophies, setTrophies] = useState(() => parseInt(localStorage.getItem('trophies')) || 0);

    const [answers, dispatch] = useReducer(
        answersReducer,
        {},
        () => JSON.parse(localStorage.getItem('processAnswers')) || {}
    );

    useEffect(() => {
        localStorage.setItem('processAnswers', JSON.stringify(answers));
    }, [answers]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHideHeader(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    // 🥇 Function to call when a section is completed
    const handleSectionComplete = () => {
        setMedals((prev) => {
            const updated = prev + 1;
            if (updated >= 10) {
                setTrophies((t) => {
                    localStorage.setItem('trophies', t + 1);
                    return t + 1;
                });
                localStorage.setItem('medals', updated - 10);
                return updated - 10;
            }
            localStorage.setItem('medals', updated);
            return updated;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>

                {/* 🥇 Display Medals and Trophies */}
                <div className="flex justify-center gap-6 mt-2 text-white text-sm">
                    <span>🎖️ Medals: {medals}</span>
                    <span>🏆 Trophies: {trophies}</span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                <SectionBlock
                    title={<>Offense <span className="text-sm text-gray-100">(5 required)</span></>}
                    questions={QUESTIONS.offense}
                    sectionKey="offense"
                    answers={answers}
                    handleAnswer={handleAnswer}
                    onSectionComplete={handleSectionComplete} // ✅ NEW
                />

                <SectionBlock
                    title={<>Defense <span className="text-sm text-gray-100">(5 required)</span></>}
                    questions={QUESTIONS.defense}
                    sectionKey="defense"
                    answers={answers}
                    handleAnswer={handleAnswer}
                    onSectionComplete={handleSectionComplete} // ✅ NEW
                />

                <SectionBlock
                    title={<>Team Identity & Culture <span className="text-sm text-gray-100">(5 required)</span></>}
                    questions={QUESTIONS.teamIdentity}
                    sectionKey="teamIdentity"
                    answers={answers}
                    handleAnswer={handleAnswer}
                    onSectionComplete={handleSectionComplete} // ✅ NEW
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

export default ReflectionPage;