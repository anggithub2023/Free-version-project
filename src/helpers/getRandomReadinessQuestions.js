// helpers/getRandomReadinessQuestions.js

const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());

const getRandomReadinessQuestions = (categories, count = 2) => {
    return categories.map((cat) => {
        if (cat.key === 'intention_purpose') {
            return {
                ...cat,
                questions: cat.questions.slice(0, 1)
            };
        }

        return {
            ...cat,
            questions: shuffleArray(cat.questions).slice(0, count)
        };
    });
};

export default getRandomReadinessQuestions;
