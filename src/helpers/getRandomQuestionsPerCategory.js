// src/helpers/getRandomQuestionsPerCategory.js

/**
 * Randomly selects a limited number of questions from each category.
 *
 * @param {Array} categories - Array of category objects with a "questions" array.
 * @param {number} count - How many questions to keep per category (default is 3).
 * @returns {Array} New array of categories with truncated question lists.
 */
export default function getRandomQuestionsPerCategory(categories, count = 3) {
    return categories.map((category) => {
        const shuffled = [...category.questions].sort(() => 0.5 - Math.random());
        return {
            ...category,
            questions: shuffled.slice(0, Math.min(count, shuffled.length))
        };
    });
}