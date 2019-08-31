import { RECIVE_CATEGORIES } from '../actions/types';

const initialState = {
    Category: {}
};


export default (state = initialState , action) => {
    switch (action.type) {
        case RECIVE_CATEGORIES:
            return {
                ...state,
                Category: action.payload
            };
        
        default:
            return state;
    }
}
