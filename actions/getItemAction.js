import {FETCH_ITEM,RECIVE_ITEM } from './types';

export const fetchItem = () =>{
    return {
        type: FETCH_ITEM
    }
}

export const getItemAction = (payload)=>{
    return {
        type:RECIVE_ITEM,
        payload : payload
    }
}