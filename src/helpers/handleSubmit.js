// src/helpers/handleSubmit.js (Final Version)

function handleSubmit(answers, callback, bonusAnswer) {
    if (!answers) return;

    const categories = ['offense', 'defense', 'teamIdentity', 'focus', 'preparation', 'execution'];

    const scoreByCategory = {};
    let totalYes = 0;
    let totalQuestions = 0;

    categories.forEach((category) => {
        const categoryKeys = Object.keys(answers).filter((key) => key.startsWith(category));
        const yesCount = categoryKeys.filter((key) => answers[key] === 'yes').length;
        const categoryTotal = categoryKeys.length;

        if (categoryTotal > 0) {
            scoreByCategory[category] = Math.round((yesCount / categoryTotal) * 100);
        }

        totalYes += yesCount;
        totalQuestions += categoryTotal;
    });

    const totalScore = totalQuestions > 0 ? Math.round((totalYes / totalQuestions) * 100) : 0;

    const summary = {
        total: totalScore,
        offense: scoreByCategory.offense || 0,
        defense: scoreByCategory.defense || 0,
        culture: scoreByCategory.teamIdentity || 0,
        focus: scoreByCategory.focus || 0,
        preparation: scoreByCategory.preparation || 0,
        execution: scoreByCategory.execution || 0,
        bonus: bonusAnswer || 0
    };

    const processHistory = JSON.parse(localStorage.getItem('processHistory')) || [];
    const newEntry = {
        timestamp: Date.now(),
        ...summary
    };

    localStorage.setItem('processHistory', JSON.stringify([...processHistory, newEntry]));

    callback(summary); // ✅ Now pass the data BACK to the caller
}

export default handleSubmit;