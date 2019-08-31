import { takeLatest ,take, put, call, takeEvery } from 'redux-saga/effects';
import {getCategories, getCategoryItems, getItem, getOffers,addToWishList, getWishList, getSearch } from '../api/GetCategories';
import { reciveCategories} from '../actions/getCategoriesActions';
import { reciveCategoryItems } from '../actions/getCategoryItemsAction';
import { getItemAction } from '../actions/getItemAction';
import { reciveOffersAction } from '../actions/GetOffers';
import {getWishListAction} from '../actions/WishListActions';
import { getSearchAction } from '../actions/getSearchAction';

import {FETCH_CATEGORIES, FETCH_CATEGORIES_ITEMS, FETCH_ITEM, ADD_TO_WISHLIST, GET_WISHLIST, GET_OFFERS} from '../actions/types';

function* getCategoryData(){
    const data = yield call(getCategories)
    yield put(reciveCategories(data))

}

function* getCategoryItemsData(){
    const data = yield call(getCategoryItems)
    yield put(reciveCategoryItems(data)) 

}
function* getOffersData () {
    const data = yield call(getOffers)
    yield put(reciveOffersAction(data))
}

function* addToWishListRequest () {
    yield call(addToWishList);
}

function* getWishListData () {
    const data = yield call(getWishList);
    yield put(getWishListAction(data))
}


function* getItemData(){
    const data = yield call(getItem)
    yield put(getItemAction(data))
}
// function* getSearchData(){
//     const data = yield call(getSearch)
//     yield put(getSearchAction(data))
// }

export const sagas = [
        takeLatest(GET_WISHLIST, getWishListData),
        takeLatest(ADD_TO_WISHLIST,addToWishListRequest),
        takeLatest(GET_OFFERS ,getOffersData ),
        takeLatest(FETCH_ITEM,getItemData),
        takeLatest(FETCH_CATEGORIES_ITEMS, getCategoryItemsData),
        takeLatest(FETCH_CATEGORIES, getCategoryData),
        // takeLatest(SEARCH_ITEM,getSearchData)
    ]
