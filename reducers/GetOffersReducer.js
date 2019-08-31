import {RECIVE_OFFERS} from '../actions/types';

const initialState ={
    offers : {}
}

export default (state = initialState , action) =>{
    switch (action.type) {
        case RECIVE_OFFERS:
        return {
            ...state,
            offers: action.payload
        }
        default:
         return state;
    }
}