import { RECIVE_ITEM } from '../actions/types';

const initialState = {
    Item: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case RECIVE_ITEM:
            return {
                ...state,
                Item: action.payload.payload.data
            };
        default:
            return state;
    }
}
