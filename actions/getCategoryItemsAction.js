import  { FETCH_CATEGORIES_ITEMS, RECIVE_CATEGORY_ITEMS } from './types'

export const requestCategoryItem = () => {
    return {
        type: FETCH_CATEGORIES_ITEMS
    }
}

export const reciveCategoryItems = (payload) =>{
    return {
        type: RECIVE_CATEGORY_ITEMS,
        payload :  payload.data.product_data
    }
}
