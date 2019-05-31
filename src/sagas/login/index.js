/**
 *  Redux saga class init
 */
import {takeEvery, all} from 'redux-saga/effects';
import * as types from '../../actions/types';
import * as authSaga from './authSaga';

export default function* watch() {
    yield all([
        // user Auth
        takeEvery(types.AUTH_LOGOUT, authSaga.logout),
        takeEvery(types.AUTH_UPDATE_USER, authSaga.update_profile),
        takeEvery(types.AUTH_SEND_SMD, authSaga.sendsms),
        takeEvery(types.AUTH_LOGIN_OR_REG, authSaga.login_or_reg),
        takeEvery(types.AUTH_UPLOAD, authSaga.upload)
    ]);
}
