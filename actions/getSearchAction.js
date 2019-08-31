import {SEARCH_ITEM } from './types';



export const getSearchAction = (payload)=>{
    return {
        type:SEARCH_ITEM,
        payload : payload
    }
}