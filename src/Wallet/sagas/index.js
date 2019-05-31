/**
 *  Redux saga class init
 */
import {
    // takeEvery,
    all,
    // take,
    put,
    call,
    // select
} from 'redux-saga/effects';
import * as services from '../services';
import getReducers from '@lib/getReducers';
import getTasks from '@lib/getTasks';

export const modal = {
    namespace: 'WALLET',
    state: {
        params: 'init'
    },
    reducers: {
        save2Example(state,action){
            return {
                ...state,
                ...action.payload,
            }
        }
    },
    effects: {
        * getExample({payload,callback}) {
            // console.log('effects-args: ',payload,callback)
            try {
                const res = yield call(services.getExample,payload)
                console.log('res: ',res)
                yield put({type: 'WALLET/save2Example',payload: res})
                callback && callback();
            } catch (e) {
                console.log('error: ',e)
                // $toast(i18n.t('page_login.loginout_fail:', e));
            }
        },
        * getSearchList({payload,callback}){
            console.log(payload)
            try {
                const res = yield call(services.getSearchList,payload)
                callback && callback(res)
            } catch (e) {
                console.log('error: ',e)
                callback && callback(null)
            }
        },
        * checkPwd({payload,callback}){
            console.log(payload)
            try {
                const res = yield call(services.checkPwd,payload)
                callback && callback(res)
            } catch (e) {
                console.log('error: ',e)
                callback && callback(null)
            }
        }
    }
}

export const reducers = getReducers(modal);


export default function* watch() {
    
    yield all(getTasks(modal));
}
