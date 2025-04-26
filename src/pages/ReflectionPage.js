import React, { useState, useEffect, useReducer } from 'react';
import QUESTIONS from '../data/QUESTIONS';
import answersReducer from '../reducers/answersReducer';
import ReflectionModal from '../components/ReflectionModal/ReflectionModal';
import ReflectionStartFlow from '../components/ReflectionModal/ReflectionStartFlow';
import SectionBlock from '../components/ReflectionModal/SectionBlock';
import BonusQuestion from '../components/ReflectionModal/BonusQuestion';
import handleSubmit from '../helpers/handleSubmit';

function ReflectionPage() {
    const [selectedSport] = useState(() => localStorage.getItem('selectedSport') || '');
    const [selectedPosition] = useState(() => localStorage.getItem('selectedPosition') || '');
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

    const handleAnswer = (section, idx, value) => {
        const key = `${section}-${idx}`;
        dispatch({ type: 'SET_ANSWER', key, value });
    };

    const handleBonusChange = (value) => {
        dispatch({ type: 'SET_ANSWER', key: 'bonus', value });
    };

    if (!selectedSport) {
        return <ReflectionStartFlow onComplete={() => {}} />;
    }

    const currentQuestions = QUESTIONS[selectedSport]?.[selectedPosition] || QUESTIONS[selectedSport] || {};

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <header className={`sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 bg-opacity-90 backdrop-blur-md shadow-md py-6 px-4 sm:px-6 transition-transform duration-300 ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-wide uppercase">
                    Focus. Reflect. Dominate.
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-4 sm:p-6 space-y-12">
                {Object.entries(currentQuestions).map(([sectionKey, questionsArray]) => (
                    <SectionBlock
                        key={sectionKey}
                        title={sectionKey.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        questions={questionsArray.slice(0, 3)}
                        sectionKey={sectionKey}
                        answers={answers}
                        handleAnswer={handleAnswer}
                    />
                ))}

                <BonusQuestion
                    value={answers['bonus'] || 50}
                    onChange={handleBonusChange}
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