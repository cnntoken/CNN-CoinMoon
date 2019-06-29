
import {
    takeEvery,
    all,
    call,
} from 'redux-saga/effects';

import * as services from './services'
import * as types from './types';


const effects = {


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

    // 根据userID 获取用户列表
    * getListByUserId({payload}) {
        const {params, callback} = payload;
        try {
            const res = yield call(services.getlist, params);
            callback && callback({data: res.data});
        } catch (e) {
            // console.log(e);
            callback && callback({
                error: e
            });
        }
    }

};

export default function* watch() {
    yield all([

        takeEvery(types.FEED_LIKE, effects.like),
        takeEvery(types.FEED_LIST_CANCEL_LIKE, effects.cancel_like_Feed),
        takeEvery(types.FEED_LIST_BYUSERID, effects.getListByUserId),


    ]);
}
