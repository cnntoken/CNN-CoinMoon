import {put, call, select} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';
import {$toast} from '../utils'
import * as Types from '../actions/types'
import userService from '../services/user'
import i18n from 'app/i18n';

export function* refresh({user}) {
    try {
        if (!user) {
            user = yield Auth.currentAuthenticatedUser({
                bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            });
        }
        userService.init(user);
        console.log('Auth.currentAuthenticatedUser success', user)
        // console.log(user.getUserContextData());
        const attr = user.attributes || {};
        const payload = user.signInUserSession && user.signInUserSession.idToken.payload
        const info = {
            attributes: payload ? {...payload, ...attr} : attr,
            username: user.username,
            userDataKey: user.userDataKey,
            firstEntry: true
        };
        yield put({type: Types.SET_USER_INFO, info: info})
    } catch (e) {
        yield put({type: Types.SET_USER_INFO, info: {}});
        console.log('Auth.currentAuthenticatedUser fail');
        console.log(e);
    }
}


export function* login({payload, callback}) {
    const {email, password} = payload
    try {
        const user = yield Auth.signIn(email, password);
        yield put({type: Types.AUTH_REFRESH, user});
        callback()
    } catch (e) {
        callback(e)
    }
}

export function* register({payload, callback}) {
    console.log(payload)
    const {email, password} = payload;
    const essentialAttributes = userService.generateRandomAttributes();
    try {
        const res = yield Auth.signUp({
            username: email,
            password,
            attributes: {
                email,
                ...essentialAttributes
            },
            validationData: []  //optional
        });
        callback && callback();
    } catch (e) {
        $toast(`${i18n.t('page_register.reg_fail')}: ${e.message}`);
    }
}


export function* verify({payload, callback}) {
    const {email, code} = payload
    try {
        $toast(i18n.t('page_register.verifing'));
        const res = yield Auth.confirmSignUp(email, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        });
        if (callback) callback();
    } catch (e) {
        $toast(i18n.t('page_verify.verify_fail'));
    }
}

export function* resend({payload, callback}) {
    const {email} = payload;
    console.log('resend email', email);
    try {
        const res = yield Auth.resendSignUp(email);
        console.log('resend res', res);
        $toast(`${i18n.t('page_register.resend_tip')}: ${email}`);
        callback()
    } catch (e) {
        console.log('resend fail');
        console.log(e);
    }
}


export function* logout({callback}) {
    try {
        const res = yield Auth.signOut();
        userService.destory();
        yield put({type: Types.SET_USER_INFO, info: {}});
        $toast(i18n.t('page_login.loginout_ok'));
        callback && callback()
    } catch (e) {
        $toast(i18n.t('page_login.loginout_fail:', e));
    }
}
