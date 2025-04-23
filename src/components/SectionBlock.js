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
    const base = 'px-4 py-2 rounded border font-semibold';
    const active = {
      yes: 'bg-green-600 text-white border-green-700',
      no: 'bg-red-600 text-white border-red-700',
      unsure: 'bg-orange-400 text-white border-orange-500'
    };
    const inactive = 'bg-gray-100 text-gray-700';

    return selected === option ? `${base} ${active[option]}` : `${base} ${inactive}`;
  };

  return (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const key = `${sectionKey}-${idx}`;
            const selected = answers[key];
            return (
                <div
                    key={key}
                    id={`card-${key}`}
                    className="border p-4 rounded shadow-sm bg-white space-y-2"
                >
                  <p className="font-medium">{q}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    {['yes', 'no', 'unsure'].map(option => (
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
