
import {
    takeEvery,
    all,
    call,
} from 'redux-saga/effects';

import * as services from './services'
import * as types from './types';
import {$toast} from "@src/utils";
import i18n from "@src/i18n";



const effects = {

    // 获取详情，更新查看次数
    * getDetail({payload, onSuccess, onFail}) {
        try {
            const {id} = payload;
            // 默认都请求，拿最新数据
            let res = yield call(services.getFeedDetail, id);
            let info = res.data;
            if (info) {
                onSuccess && onSuccess(info);
            } else {
                onFail && onFail();
            }
        } catch (e) {
            onFail && onFail(e);
        }

    },

    // 获取所有的评论列表，一次获取多条数据再在前端分页
    * getCommentList({payload}) {
        const {id, params, callback} = payload;
        try {
            const res = yield call(services.getFeedComments, id, params);
            let list = res.data;
            if (callback) callback(list);
        } catch (e) {
            console.log(e)
        }
    },

    // Feed 举报
    * report({payload}) {
        const {params, data, callback} = payload;
        try {
            let res = yield call(services.reports, params, data);
            if (callback) {
                callback(res);
            }
            $toast(i18n.t('report_ok'));
        } catch (e) {
            console.log(e);
            $toast(i18n.t('report_fail'));
        }
    },

    // 点赞
    * like({payload}) {
        const {params} = payload;
        try {
            yield call(services.like, params);
        } catch (e) {
            console.log(e);
        }
    },

    // 取消点赞
    * cancel_like_Feed({payload}) {
        const {params} = payload;
        try {
            yield call(services.cancel_like_feed, params);
        } catch (e) {
            console.log(e);
        }
    },


    // 评论，或者回复评论
    * comment({payload}) {
        const {params, data, callback} = payload;
        try {
            const res = yield call(services.comment, params, data);
            if (callback) callback(res);
        } catch (e) {
            console.log(e);
        }
    },

    // 对评论点赞
    * likeComment({payload}) {
        const {params} = payload;
        try {
            yield call(services.likeComment, params);
        } catch (e) {
            console.log(e);
        }
    },

    // 取消对评论点赞
    * cancel_likeComment({payload}) {
        const {params} = payload;
        try {
            yield call(services.cancel_likeComment, params);
        } catch (e) {
            console.log(e);
        }
    },


    // 删除评论
    * deleteComment({payload}) {
        const {params, callback} = payload;
        try {
            let res = yield call(services.deleteComment, params);
            if (callback) callback(res);
        } catch (e) {
            console.log(e);
        }
    },



};

export default function* watch() {
    yield all([

        takeEvery(types.FEED_GETDETAIL, effects.getDetail),
        takeEvery(types.FEED_GETCOMMENTLIST, effects.getCommentList),
        takeEvery(types.FEED_LIKE, effects.like),
        takeEvery(types.FEED_LIST_CANCEL_LIKE, effects.cancel_like_Feed),
        takeEvery(types.FEED_COMMENT, effects.comment),
        takeEvery(types.FEED_LIKE_COMMENT, effects.likeComment),
        takeEvery(types.FEED_CANCEL_LIKE_COMMENT, effects.cancel_likeComment),
        takeEvery(types.FEED_PEPORT, effects.report),
        takeEvery(types.FEED_DELETE_COMMENT, effects.deleteComment),


    ]);
}
