import {put, call, select} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';
import {$toast} from '../utils';
import * as Types from '../actions/types';
import * as services from '../services/disclose';
// import {upload as uploadImgs} from '../services/upload';
import * as navigationActions from 'app/actions/navigationActions';


// 发布页上传图片
export function* upload({payload}) {
    const {images, callback} = payload;
    try {
        const res = yield call(services.upload, images);
        if (callback) callback(res);
    } catch (e) {
        $toast(`upload image fail: ${e.message}`);
    }
}

// 发布保存
export function* publish({payload}) {
    const {title, images, userId, userName, callback} = payload;
    try {
        const res = yield call(services.publish, title, images, userId, userName);
        if (callback) callback(res);
    } catch (e) {
        console.log('publish fail');
        $toast(`publish fail: ${e.message}`);

    }
}

// 获取爆料列表，一次获取多条数据再在前端分页
export function* getList({payload}) {
    const {params, callback} = payload;
    try {
        const res = yield call(services.getlist, params);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`getList fail: ${e.message}`);
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

// 点赞爆料
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

// 删除爆料，仅能删除自己发布的爆料
export function* deleteDisclose({payload}) {
    const {id, callback} = payload;
    try {
        const res = yield call(services.deleteDisclose, id);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        // debugger;
        $toast(`deleteDisclose fail: ${e.message}`);

    }
}

// 获取爆料详情
export function* getDiscloseDetail({payload}) {
    const {id, userId, callback} = payload;
    try {
        const res = yield call(services.getDiscloseDetail, id, userId);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`getDiscloseDetail fail: ${e.message}`);

    }
}


// 获取所有的爆料评论列表
export function* getDiscloseComments({payload}) {
    const {id, params, callback} = payload;
    try {
        const res = yield call(services.getDiscloseComments, id, params);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`getDiscloseComments fail: ${e.message}`);

    }
}


// 评论爆料，或者回复评论
export function* commentDisclose({payload}) {
    const {params, callback} = payload;
    try {
        const res = yield call(services.commentDisclose, params);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`commentDisclose fail: ${e.message}`);
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
    }
}


// 获取爆料详情
export function* deleteComment({payload}) {
    const {id, callback} = payload;
    try {
        const res = yield call(services.deleteComment, id);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`deleteComment fail: ${e.message}`);

    }
}
