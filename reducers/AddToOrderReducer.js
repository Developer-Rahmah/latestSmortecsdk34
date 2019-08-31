import {ADD_ITEM,CLEAR_CART} from '../actions/types';

const initialState = {
    Order: []
};


export default (state= initialState, action)=>{
    switch (action.type){
        case ADD_ITEM: 
            return {
                ...state,
                Order: state.Order.concat(action.payload)
            }

            case CLEAR_CART:
     return {...state,Order:[]};

        default:
            return state;
    }
} 