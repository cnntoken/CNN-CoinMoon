/**
 *  Redux saga class init
 */
import {takeEvery, all, take} from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from './loginSaga';
import listSaga from './listSaga';

export default function* watch() {
    yield all([
        takeEvery(types.LOGIN_REQUEST, loginSaga),
        takeEvery(types.GET_LIST, listSaga)
    ]);
}
