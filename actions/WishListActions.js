import {ADD_TO_WISHLIST,GET_WISHLIST } from './types';

export const addToWishList = (payload) => {
    return {
        type : ADD_TO_WISHLIST,
        payload : payload
    }

}

export const getWishListAction = ()=>{
    return {
        type : GET_WISHLIST,
        payload : payload
    }
}