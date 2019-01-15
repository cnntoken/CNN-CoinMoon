import {put, call, select} from 'redux-saga/effects';
import {$toast} from '../utils';
import * as Types from '../actions/types';
import * as services from '../services/feed';
// import * as feedActions from '../actions/feedActions';

// 获取列表
export function* getList({payload}) {
    const {isRefresh, category, params} = payload;
    console.log('is refresh', isRefresh)

    try {
        
        const list = yield call(services.getlist,category,params);
        // console.log('res', res);
        console.log(list)
        if(isRefresh){
            yield put({type: Types.FEED_PREPEND_LIST,category,list});
        }else{
            yield put({type: Types.FEED_APPEND_LIST,category,list});
        }
    } catch (e) {
        console.log(e)
        $toast(`getList fail`);
    }
}

// 点赞
export function* like({payload}) {
    const {id, field, cancel, callback} = payload;
    try {
        const res = yield call(services.like, id, field, cancel);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`like fail: ${e.message}`);
        if (callback) callback(e)
    }
}

const getDetailFromStateByIdAndCategory = (id,category)=>{
   
    return (state)=>{
        const {feedReducer} = state;
        if(feedReducer[category]){
            return feedReducer[category].find(item=>item._id === id)
        }
        return false
    }
}

// 获取详情
export function* getDetail({payload,callback}) {
    const {id, category} = payload;
    const info = yield select(getDetailFromStateByIdAndCategory(id, category));
    if(info){
        callback && callback(info);
        return false;
    }
    try {
        const res = yield call(services.getDetail, id);
        callback && callback(res);
    } catch (e) {
        $toast(`getDiscloseDetail fail: ${e.message}`);
        // callback && callback(e);
    }
}


// 获取所有的评论列表，一次获取多条数据再在前端分页
export function* getCommentList({payload}) {
    const {id, params, callback} = payload;
    try {
        const res = yield call(services.getDiscloseComments, id, params);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`getDiscloseComments fail: ${e.message}`);
        if (callback) callback(e)
    }
}

// 评论，或者回复评论
export function* commentFeed({payload}) {
    const {params, callback} = payload;
    try {
        const res = yield call(services.commentDisclose, params);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`commentDisclose fail: ${e.message}`);
        if (callback) callback(e);
    }
}

// 点赞评论
export function* likeComment({payload}) {
    const {id, field, cancel, callback} = payload;
    try {
        const res = yield call(services.likeComment, id, field, cancel);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`likeComment fail: ${e.message}`);
        if (callback) callback(e);
    }
}


// 删除评论
export function* deleteComment({payload}) {
    const {id, callback} = payload;
    try {
        const res = yield call(services.deleteComment, id);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`deleteComment fail: ${e.message}`);
        if (callback) callback(e)
    }
}
