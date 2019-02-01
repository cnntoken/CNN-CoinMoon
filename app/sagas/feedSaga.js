import {put, call, select} from 'redux-saga/effects';
import {$toast} from '../utils';
import * as Types from '../actions/types';
import * as services from '../services/feed';
// import * as feedActions from '../actions/feedActions';

// 获取列表
export function* getList({payload,onSuccess, onFail}) {
    const {isRefresh, category, params} = payload;

    console.log('is refresh', isRefresh, category, params)
    try {
        const res = yield call(services.getlist, category, params);
        const list = res.Items;
        // const hasMore = res.LastEvaluatedKey ? true : false;
        if (isRefresh) {
            yield put({type: Types.FEED_PREPEND_LIST, category, list});
        } else {
            yield put({type: Types.FEED_APPEND_LIST, category, list});
        }
        onSuccess && onSuccess(res.LastEvaluatedKey)
    } catch (e) {
        onFail && onFail()
        console.log(e);
        // $toast(`getList fail`);
    }
}


export function* getListByUserId({payload}) {
    const {params, callback} = payload;
    try {
        const res = yield call(services.getListByUserId, params);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`getList fail: ${e.message}`);

    }
}

const getDetailFromStateByIdAndCategory = (id, category) => {
    return (state) => {
        const {feedReducer} = state;
        if (feedReducer[category]) {
            return feedReducer[category].find(item => item._id === id)
        }
        return false
    }
};

// 获取详情
export function* getDetail({payload, onSuccess}) {
    const {id, category, userId} = payload;
    const info = yield select(getDetailFromStateByIdAndCategory(id, category));
    if (info) {
        onSuccess && onSuccess(info);
        return false;
    }
    // try {
    //     const res = yield call(services.getFeedDetail, id, userId);
    //     onSuccess && onSuccess(res);
    // } catch (e) {
    //     $toast(`getDiscloseDetail fail: ${e.message}`);
    //     // callback && callback(e);
    // }
}


// 获取所有的评论列表，一次获取多条数据再在前端分页
export function* getCommentList({payload}) {
    const {id, params, callback} = payload;
    try {
        const res = yield call(services.getFeedComments, id, params);
        console.log('res:======', res);
        if (callback) callback(res);
    } catch (e) {
        console.log(e)
        // $toast(`getDiscloseComments fail: ${e.message}`);
        // if (callback) callback(e)
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
    }
}

// 评论，或者回复评论
export function* comment({payload}) {
    const {params, callback} = payload;
    try {
        const res = yield call(services.comment, params);
        if (callback) callback(res);
    } catch (e) {
        $toast(`commentDisclose fail: ${e.message}`);
    }
}

// 对评论点赞
export function* likeComment({payload}) {
    const {id, field, cancel, callback} = payload;
    try {
        const res = yield call(services.likeComment, id, field, cancel);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`likeComment fail: ${e.message}`);
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
        console.log(e)
        $toast(`deleteComment fail`);
    }
}