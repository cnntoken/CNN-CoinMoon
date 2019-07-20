import {put, call, select} from 'redux-saga/effects';
import * as Types from '../../actions/types';
import * as services from '../../services/market';
import {$toast} from '@utils/index'
import i18n from '@i18n'

export function* likeDiscuss({payload, onSuccess, onFail}) {
    try{
        yield call(services.likeDisucss,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}

export function* cancelLikeDiscuss({payload, onSuccess, onFail}) {
    try{
        yield call(services.cancelLikeDiscuss,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* deleteDiscuss({payload, onSuccess, onFail}){
    try{
        yield call(services.deleteDiscuss,payload)
        onSuccess && onSuccess()
        let list = yield select((state)=>{
            return state.discussList.list
        })
        list.splice(payload.index,1)
        yield put({type: Types.MARKET_SET_DISCUSS_LIST,list:list})
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* getDiscussDetail({payload, onSuccess, onFail}) {
    try{
        const res = yield call(services.getDiscussDetail,payload)
        yield put({type: Types.MARKET_SET_DISCUSS_DETAIL,discuss_id:payload.discuss_id,info:res})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
        $toast(i18n.t('net_error'));
    }
}

//回复某条讨论
export function* discussReply({payload, onSuccess, onFail}) {
    try{
        yield call(services.discussReply,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}


