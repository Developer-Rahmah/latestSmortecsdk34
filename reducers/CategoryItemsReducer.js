import {RECIVE_CATEGORY_ITEMS} from '../actions/types';

const initialState = {
    CtegoryItems: {}
};


export default (state= initialState, action)=>{
    switch (action.type){
        case RECIVE_CATEGORY_ITEMS: 
            return {
                ...state,
                CtegoryItems: action.payload
            }
        default:
            return state;
    }
} 