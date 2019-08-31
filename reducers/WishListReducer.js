import {GET_WISHLIST} from '../actions/types';

initialState = {
    wishList : {

    },
}

export default (state = initialState, action) =>{
    switch(action.type) {
        case GET_WISHLIST : 
            return {
                ...state,
                wishList : action.payload
            }
        default :
        return state
    }
}