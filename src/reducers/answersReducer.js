// ✅ src/reducers/answersReducer.js

const answersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ANSWER': {
            return {
                ...state,
                [action.key]: action.value
            };
        }
        case 'RESET': {
            return {};
        }
        default:
            return state;
    }
};

export default answersReducer;