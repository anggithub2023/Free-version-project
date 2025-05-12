// src/helpers/getRandomProcessCategories.js

/**
 * Randomly selects a set of categories from the full list.
 * @param {Array} categories - Full list of categories.
 * @param {number} count - Number to select (default is 4).
 * @returns {Array} - Randomized subset.
 */
export default function getRandomProcessCategories(categories, count = 4) {
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}