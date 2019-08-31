import {combineReducers} from 'redux';
import CategoryReducers from './CategoryReducers';
import CategoryItemsReducer from './CategoryItemsReducer';
import AddToOrderReducer from './AddToOrderReducer';
import WishListReducer from './WishListReducer';
import GetOffersReducer from './GetOffersReducer'

export default combineReducers({
    CategoryReducers : CategoryReducers,
    CategoryItemsReducer: CategoryItemsReducer,
    AddToOrderReducer: AddToOrderReducer,
    WishListReducer: WishListReducer,
    GetOffersReducer : GetOffersReducer
})