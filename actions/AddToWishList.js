import {ADD_TO_WISHLIST} from './types'

export const addItem = (payload) =>{
    return {
        type: ADD_TO_WISHLIST,
        payload :  payload
    }
}
