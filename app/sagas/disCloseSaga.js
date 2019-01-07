import {put, call, select} from 'redux-saga/effects';
import {Auth} from 'aws-amplify';
import {$toast} from '../utils';
import * as Types from '../actions/types';
import * as services from '../services/disclose';

// 发布页上传图片
export function* upload({payload}) {
    const {images, callback} = payload;
    try {
        const res = yield call(services.upload, images);
        console.log(res);
        if (callback) callback(res);
    } catch (e) {
        console.log('upload image fail');
        console.log(e);
        $toast(`upload image fail: ${e.message}`);
        if (callback) callback(e);
    }
}

// 发布保存
export function* publish({payload}) {
    const {text, images, callback} = payload;
    try {
        const res = yield call(services.publish, text, images);
        console.log('res', res);
        if (callback) callback('hhhhhhh');
    } catch (e) {
        console.log('publish fail');
        $toast(`publish fail: ${e.message}`);
        if (callback) callback(e)
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
        if (callback) callback(e)
    }
}

// 点赞爆料
export function* like({payload}) {
    const {id, callback} = payload;
    try {
        const res = yield call(services.like, id);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`like fail: ${e.message}`);
        if (callback) callback(e)
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
        $toast(`deleteDisclose fail: ${e.message}`);
        if (callback) callback(e)
    }
}

// 获取爆料详情
export function* getDiscloseDetail({payload}) {
    const {id, callback} = payload;
    try {
        const res = yield call(services.getDiscloseDetail, id);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`getDiscloseDetail fail: ${e.message}`);
        if (callback) callback(e)
    }
}


// 获取所有的爆料评论列表，一次获取多条数据再在前端分页
export function* getDiscloseComments({payload}) {
    const {params, callback} = payload;
    try {
        const res = yield call(services.getDiscloseComments, params);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`getDiscloseComments fail: ${e.message}`);
        if (callback) callback(e)
    }
}

// 评论爆料，或者回复评论
export function* commentDisclose({payload}) {
    const {id, callback} = payload;
    try {
        const res = yield call(services.commentDisclose, id);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`commentDisclose fail: ${e.message}`);
        if (callback) callback(e)
    }
}


// 点赞评论
export function* likeComment({payload}) {
    const {id, callback} = payload;
    try {
        const res = yield call(services.likeComment, id);
        console.log('res', res);
        if (callback) callback(res);
    } catch (e) {
        $toast(`likeComment fail: ${e.message}`);
        if (callback) callback(e)
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
        if (callback) callback(e)
    }
}
