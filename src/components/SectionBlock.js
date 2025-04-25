import React from 'react';

function SectionBlock({ title, questions, sectionKey, answers, handleAnswer }) {
  const getFeedbackText = (value) => {
    switch (value) {
      case 'yes':
        return <span className="text-green-600 font-semibold ml-2">ON POINT</span>;
      case 'no':
        return <span className="text-red-600 font-semibold ml-2">MORE WORK</span>;
      case 'unsure':
        return (
            <span className="text-orange-500 font-semibold ml-2">
            NEXT PRACTICE - MAKE IT COUNT
          </span>
        );
      default:
        return null;
    }
  };

  const getButtonClasses = (option, selected) => {
    const base = 'px-4 py-2 rounded-xl border font-semibold transition-all';
    const active = {
      yes: 'bg-green-600 text-white border-green-700 shadow-md scale-105',
      no: 'bg-red-600 text-white border-red-700 shadow-md scale-105',
      unsure: 'bg-orange-400 text-white border-orange-500 shadow-md scale-105'
    };
    const inactive = 'bg-gray-100 text-gray-700 hover:bg-gray-200';

    return selected === option ? `${base} ${active[option]}` : `${base} ${inactive}`;
  };

  const totalQuestions = questions.length;
  const answeredCount = questions.filter((_, idx) => answers[`${sectionKey}-${idx}`]).length;
  const progress = Math.floor((answeredCount / totalQuestions) * 100);

  const getSectionColor = (section) => {
    switch (section) {
      case 'offense':
        return 'bg-teal-500';
      case 'defense':
        return 'bg-blue-500';
      case 'teamIdentity':
        return 'bg-purple-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
      <div className="mb-16 relative">
        <div className={`sticky top-16 z-10 ${getSectionColor(sectionKey)} text-white py-3 px-4 rounded-b-xl shadow-md`}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold tracking-wide uppercase">{title}</h2>
            <span className="text-sm font-semibold">
            {answeredCount}/{totalQuestions}
          </span>
          </div>
          <div className="relative w-full h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
            {answeredCount >= 5 && (
                <div className="absolute inset-0 animate-pulse bg-green-400 opacity-20 rounded-full"></div>
            )}
            <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {questions.map((q, idx) => {
            const key = `${sectionKey}-${idx}`;
            const selected = answers[key];
            return (
                <div
                    key={key}
                    id={`card-${key}`}
                    className="border p-5 rounded-xl shadow-md bg-white dark:bg-gray-800 space-y-3 transition-all hover:shadow-lg"
                >
                  <p className="font-medium text-gray-800 dark:text-gray-100">{q}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    {['yes', 'no', 'unsure'].map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(sectionKey, idx, option)}
                            className={getButtonClasses(option, selected)}
                        >
                          {option.toUpperCase()}
                        </button>
                    ))}
                    {getFeedbackText(selected)}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}

export default SectionBlock;