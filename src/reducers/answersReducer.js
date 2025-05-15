const answersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ANSWER':
            return { ...state, [action.key]: action.value };

        case 'SET_ANSWER_FIELD': {
            const { key, field, value } = action;
            return {
                ...state,
                [key]: {
                    ...state[key],
                    [field]: value,
                },
            };
        }

        case 'RESET':
            return {};
        default:
            return state;
    }
};