/**
 *  Redux saga class init
 */
import {takeEvery, all, take} from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from './loginSaga';
import listSaga from './listSaga';
import appSaga from './appSaga';
import * as authSaga from './authSaga';

export default function* watch() {
    yield all([
        takeEvery(types.LOGIN_REQUEST, loginSaga),
        takeEvery(types.GET_LIST, listSaga),
        takeEvery(types.APP_INIT, appSaga),

        takeEvery(types.AUTH_LOGIN, authSaga.login),
        takeEvery(types.AUTH_REGISTER, authSaga.register),
        takeEvery(types.AUTH_VERIFY, authSaga.verify),
        takeEvery(types.AUTH_RESEND, authSaga.resend),
        takeEvery(types.AUTH_LOGOUT, authSaga.logout),
    ]);
}
