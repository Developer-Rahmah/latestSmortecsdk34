import {ADD_ITEM,CLEAR_CART} from './types'

export const addItem = (payload) =>{
    return {
        type: ADD_ITEM,
        payload :  payload
    }
}
export const clearCart = value => {
    return {type:CLEAR_CART};
  };
