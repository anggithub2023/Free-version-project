// src/helpers/getRandomReadinessQuestions.js

const shuffleArray = (arr) => {
    return [...arr].sort(() => 0.5 - Math.random());
};

const getRandomReadinessQuestions = (categories, count = 2) => {
    return categories.map((cat) => {
        if (cat.key === 'intention_purpose') {
            // Only 1 static question, no need to shuffle
            return {
                ...cat,
                questions: cat.questions.slice(0, 1)
            };
        }

        // Shuffle and return `count` number of questions for all other categories
        const shuffled = shuffleArray(cat.questions);
        return {
            ...cat,
            questions: shuffled.slice(0, count)
        };
    });
};

export default getRandomReadinessQuestions;
