// src/helpers/getRandomQuestionsReflection.js

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getRandomQuestionsReflection(fullQuestions) {
    const sections = ['offense', 'defense', 'teamIdentity', 'focus', 'preparation', 'execution'];
    const selectedQuestions = {};

    sections.forEach((section) => {
        if (fullQuestions[section]) {
            const shuffled = shuffleArray(fullQuestions[section]);
            selectedQuestions[section] = shuffled.slice(0, 3);
        }
    });

    return selectedQuestions;
}

export default getRandomQuestionsReflection;