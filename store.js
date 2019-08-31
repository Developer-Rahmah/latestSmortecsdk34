import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import {sagaGetCategories} from './saga/Saga';

const sagaMidlleware = createSagaMiddleware()
const initialState = {};

const middleWare = compose (
    applyMiddleware(sagaMidlleware)
)

const store = createStore(rootReducer, initialState, middleWare);
sagaMidlleware.run(sagaGetCategories);

export default store;
