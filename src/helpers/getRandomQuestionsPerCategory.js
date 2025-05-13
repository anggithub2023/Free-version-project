// src/helpers/getRandomQuestionsPerCategory.js

/**
 * Randomly selects up to 3 questions from each category.
 * @param {Array} categories - Array of category objects with questions.
 * @param {number} count - Number of questions per category (default 3).
 * @returns {Array} New array of categories with truncated questions.
 */
export default function getRandomQuestionsPerCategory(categories, count = 3) {
    return categories.map((category) => {
        const shuffled = [...category.questions].sort(() => 0.5 - Math.random());
        return {
            ...category,
            questions: shuffled.slice(0, count)
        };
    });
}