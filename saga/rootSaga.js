import { all, fork } from 'redux-saga/effects';
import {sagas} from './Saga'

export function* rootSaga(){
    yield all([
        ...sagas
    ])
}
