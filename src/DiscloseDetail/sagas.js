import {
    takeEvery,
    all,
    put,
    call,
} from 'redux-saga/effects';

import * as services from './services'
import * as types from './types';
import {getNumByUserId, $toast} from '@utils';
import avatars from "@services/constants";
import i18n from '@i18n';


const effects = {

    // 点赞爆料
    * like({payload}) {
        const {id, params, callback} = payload;
        try {
            const res = yield call(services.like, id);
            if (callback) callback(res);
        } catch (e) {
            console.log(e);
        }
    },


    // 取消点赞爆料
    * cancel_like({payload}) {
        const {id, params, callback} = payload;
        try {
            const res = yield call(services.cancel_like, id);
            if (callback) callback(res);
        } catch (e) {
            console.log(e);
        }
    },


    // 删除爆料，仅能删除自己发布的爆料
    * deleteDisclose({payload}) {
        const {id, callback} = payload;
        try {
            const res = yield call(services.deleteDisclose, id);
            if (callback) callback(res);
        } catch (e) {
            console.log(e);
        }
    },


    // 获取爆料详情
    * getDiscloseDetail({payload}) {
        const {id, callback} = payload;
        try {
            let res = yield call(services.getDiscloseDetail, id);
            let avatarType = getNumByUserId(res.data.user.id);
            res.data.source = avatars[avatarType % 5];
            res.data.userName = i18n.t('disclose.anonymous');
            // 获取到最新的爆料后，更新爆料列表里数据
            if (callback) callback(res.data);

        } catch (e) {
            if (callback) callback({error: e});
        }
    },


    // 不喜欢某条ID
    * dislike_discloseId({payload}) {
        const {id, callback} = payload;
        try {
            let res = yield call(services.dislike_discloseId, id);
            // 将这条数据从列表中移除
            if (callback) callback(res.data);
        } catch (e) {
            if (callback) callback({error: e});
        }
    },

    // 不喜欢某用户
    * dislike_userId({payload}) {
        const {id, callback} = payload;
        try {
            let res = yield call(services.dislike_userId, id);
            if (callback) callback(res.data);

        } catch (e) {
            if (callback) callback({error: e});
        }
    },


    // 获取所有的爆料评论列表
    * getDiscloseComments({payload}) {
        const {id, params, callback} = payload;
        try {
            const res = yield call(services.getDiscloseComments, id, params);
            if (callback) callback(res.data);
        } catch (e) {
            if (callback) callback({error: e});
        }
    },


    // 评论爆料，或者回复评论
    * commentDisclose({payload}) {
        const {data, params, callback} = payload;
        try {
            const res = yield call(services.commentDisclose, params, data);
            if (callback) callback(res.data);
        } catch (e) {
            console.log(e);
            $toast(`commentDisclose fail: ${e.message}`);
        }
    },

    // 点赞评论
    * likeComment({payload}) {
        const {params, callback} = payload;
        try {
            const res = yield call(services.likeComment, params);
            if (callback) callback(res.data);
        } catch (e) {
            console.log(e);
        }
    },

    // 取消评论点赞
    * cancel_likeComment({payload}) {
        const {params, callback} = payload;
        try {
            const res = yield call(services.cancel_likeComment, params);
            if (callback) callback(res.data);
        } catch (e) {
            console.log(e);
        }
    },

    // 删除评论
    * deleteComment({payload}) {
        const {params, data, callback} = payload;
        try {
            const res = yield call(services.deleteComment, data);
            // params.disclose_stats.comment_count--;
            // yield put({type: Types.DISCLOSE_ITEM_CHANGE, params});
            if (callback) callback(res.data);
        } catch (e) {
            console.log(e);
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
        } catch (e) {
            console.log(e);
        }
    }

};

export default function* watch() {
    yield all([

        takeEvery(types.DISCLOSE_GETDISCLOSEDETAIL, effects.getDiscloseDetail),
        takeEvery(types.DISCLOSE_LIKE, effects.like),
        takeEvery(types.DISCLOSE_CANCEL_LIKE, effects.cancel_like),
        takeEvery(types.DISCLOSE_PEPORT, effects.report),
        takeEvery(types.DISCLOSE_COMMENTDISCLOSE, effects.commentDisclose),
        takeEvery(types.DISCLOSE_GETDISCLOSECOMMENTS, effects.getDiscloseComments),
        takeEvery(types.DISCLOSE_LIKECOMMENT, effects.likeComment),
        takeEvery(types.DISCLOSE_CANCEL_LIKECOMMENT, effects.cancel_likeComment),

        takeEvery(types.DISCLOSE_DELETECOMMENT, effects.deleteComment),


    ]);
}
