import questions from '../data/basketball/questions';
import { scoreValue } from './scoring';

const handleSubmit = (answers, setScoreSummary, setShowModal) => {
    const allSections = Object.keys(questions);

    // Ensure at least 5 answers per section
    const allAnswered = allSections.every((section) => {
        const answeredCount = questions[section].filter((_, idx) => answers[`${section}-${idx}`]).length;
        return answeredCount >= 5;
    });

    if (!allAnswered) {
        const allKeys = Object.keys(questions).flatMap((section) =>
            questions[section].map((_, idx) => `${section}-${idx}`)
        );

        const firstUnansweredKey = allKeys.find((key) => !answers[key]);
        const scrollTarget = document.getElementById(`card-${firstUnansweredKey}`);
        if (scrollTarget) {
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        setTimeout(() => {
            alert('Please answer at least 5 questions in each section.');
        }, 200);
        return;
    }

    // Score calculation per section
    const calcSectionScore = (sectionKey) => {
        const rawScores = questions[sectionKey]
            .map((_, idx) => scoreValue(answers[`${sectionKey}-${idx}`]))
            .filter((val) => val !== null);

        const totalScore = rawScores.reduce((sum, val) => sum + val, 0);
        const pct = rawScores.length > 0 ? (totalScore / (rawScores.length * 2)) * 100 : 0;
        return Math.round(pct);
    };

    const offensePct = calcSectionScore('offense');
    const defensePct = calcSectionScore('defense');
    const teamIdentityPct = calcSectionScore('teamIdentity');

    const total = Math.round((offensePct + defensePct + teamIdentityPct) / 3);

    const summary = {
        timestamp: new Date().toISOString(),
        total,
        offense: offensePct,
        defense: defensePct,
        teamIdentity: teamIdentityPct,
        answers: { ...answers },
    };

    const history = JSON.parse(localStorage.getItem('processHistory')) || [];
    history.push(summary);
    localStorage.setItem('processHistory', JSON.stringify(history));
    localStorage.removeItem('processAnswers');

    setScoreSummary(summary);
    setShowModal(true);
};

export default handleSubmit;