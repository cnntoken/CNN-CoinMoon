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
import services from '@services/wallet/index';
import getReducers from '@lib/getReducers';
import getTasks from '@lib/getTasks';

export const modal = {
    namespace: 'WALLET',
    state: {
        status: {},
        allInfo: {},
        list: [],
        loading: true,
    },
    reducers: {
        save2state(state,action){
            console.log(action.payload)
            return {
                ...state,
                ...action.payload,
            }
        }
    },
    effects: {
        * initWallet({callback}){
            try {
                yield put({type: 'WALLET/save2state',payload: {loading: true}})
                const [status,allInfo] = yield all([call(services.checkStatus),call(services.getAllAssets)])
                const {btcInfo,ethInfo} = allInfo;
                let list = []
                if(btcInfo&&btcInfo.tokens){
                    list = list.concat(btcInfo.tokens)
                }
                if(ethInfo&&ethInfo.tokens){
                    list = list.concat(ethInfo.tokens)
                }
                // console.log(list)
                yield put({type: 'WALLET/save2state',payload: {status,allInfo,list,loading: false}})
                callback && callback({status,allInfo})
            } catch (e) {
                console.log('error: ',e)
                callback && callback()
                yield put({type: 'WALLET/save2state',payload: {loading: false}})
            }
        },
        * checkWallet({callback}){
            try {
                yield put({type: 'WALLET/save2state',payload: {loading: true}})
                const status = yield call(services.checkStatus)
                yield put({type: 'WALLET/save2state',payload: {status,loading: false}})
                callback && callback(status)
            } catch (e) {
                console.log('error: ',e)
                yield put({type: 'WALLET/save2state',payload: {loading: false}})
            }
        },
        // 币种模糊搜索
        * getSearchList({payload,callback}){
            console.log(payload)
            try {
                const res = yield call(services.searchToken,payload)
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
