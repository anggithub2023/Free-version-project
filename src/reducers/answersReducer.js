const handleAnswer = (section, idx, field, value) => {
    const key = `${section}-${idx}`;
    const existing = answers[key] || {};

    dispatch({
        type: 'SET_ANSWER',
        key,
        value: {
            ...existing,
            [field]: value
        }
    });
};