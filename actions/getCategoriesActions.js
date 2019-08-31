import  { FETCH_CATEGORIES, RECIVE_CATEGORIES } from './types'

export const requestCategories = () => {
    return {
        type: FETCH_CATEGORIES
    }
}

export const reciveCategories = (payload) =>{
    return {
        type: RECIVE_CATEGORIES,
        payload :   payload.data.data
        
    }
}
