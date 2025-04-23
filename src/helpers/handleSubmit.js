import QUESTIONS from '../data/basketball/questions';
import { scoreValue } from './scoring';

const handleSubmit = (answers, setScoreSummary, setShowModal) => {
    const allSections = Object.keys(QUESTIONS);

    // Ensure each section has at least 5 answered questions
    const allAnswered = allSections.every(section => {
        const answeredCount = QUESTIONS[section].filter((_, idx) => answers[`${section}-${idx}`]).length;
        return answeredCount >= 5;
    });

    if (!allAnswered) {
        const allKeys = Object.keys(QUESTIONS).flatMap(section =>
            QUESTIONS[section].map((_, idx) => `${section}-${idx}`)
        );
        const firstUnansweredKey = allKeys.find(key => !answers[key]);
        const scrollTarget = document.getElementById(`card-${firstUnansweredKey}`);
        if (scrollTarget) {
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => alert("Please answer at least 5 questions in each section."), 200);
        return;
    }

    // Section score calculation
    const calcSectionScore = (sectionKey) => {
        const rawScores = QUESTIONS[sectionKey].map((_, i) =>
            scoreValue(answers[`${sectionKey}-${i}`])
        ).filter(v => v !== null);
        const totalScore = rawScores.reduce((sum, val) => sum + val, 0);
        const pct = rawScores.length > 0 ? (totalScore / (rawScores.length * 2)) * 100 : 0;
        return Math.round(pct);
    };

    const offensePct = calcSectionScore("offense");
    const defensePct = calcSectionScore("defense");
    const culturePct = calcSectionScore("teamIdentity");

    const total = Math.round((offensePct + defensePct + culturePct) / 3);

    const summary = {
        timestamp: new Date().toISOString(),
        total,
        offense: offensePct,
        defense: defensePct,
        teamIdentity: culturePct,
        answers: { ...answers }
    };

    const history = JSON.parse(localStorage.getItem("processHistory")) || [];
    history.push(summary);
    localStorage.setItem("processHistory", JSON.stringify(history));
    localStorage.removeItem("processAnswers");

    setScoreSummary(summary);
    setShowModal(true);
};

export default handleSubmit;