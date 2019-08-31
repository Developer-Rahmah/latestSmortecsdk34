import {GET_OFFERS,RECIVE_OFFERS} from './types';

export const getOffersAction = () => {
    return {
        type : GET_OFFERS,
    }
}

export const reciveOffersAction = (payload) => {
    return {
        type: RECIVE_OFFERS,
        payload: payload.data.product_data
    }
}