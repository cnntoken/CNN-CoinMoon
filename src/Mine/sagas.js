import {
    takeEvery,
    all,
    call,
} from 'redux-saga/effects';

import * as services from './services'
import * as types from './types';
import {getNumByUserId} from '@utils';
import discloseName from '@services/discloseName';
import avatars from "@services/constants";
// import i18n from '@i18n';
// import {setUserInfo} from '@utils/CNNBridge';


const effects = {


    // 根据用户ID获取列表
    * getList({payload}) {

        const {params, onSuccess, onFail} = payload;
        try {
            const res = yield call(services.getlist, params);

            let length = res.data.length;
            // read_tag为最后一条item的id
            let read_tag = res.data[length - 1] ? res.data[length - 1].id : '';
            let hasMore = true;
            // 如果返回的数据列表为空，则标识没有更多数据了
            if (res.data && res.data.length === 0) {
                hasMore = false;
            }

            res.data.forEach((item) => {
                let avatarType = getNumByUserId(item.user.id);
                item.source = avatars[avatarType % 5];
                item.userName = discloseName(item.user_id);
            });

            let list = res.data;

            onSuccess && onSuccess({list, hasMore, read_tag});

        } catch (e) {
            console.log(e);
            if (onFail) onFail(e);
        }
    },

    // 点赞爆料
    * like({payload}) {
        const {id, params, callback} = payload;
        try {
            // yield put({type: Types.DISCLOSE_ITEM_CHANGE, params});
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
            // yield put({type: Types.DISCLOSE_ITEM_CHANGE, params});
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


};

export default function* watch() {
    yield all([

        takeEvery(types.DISCLOSE_GETLIST, effects.getList),
        takeEvery(types.DISCLOSE_LIKE, effects.like),
        takeEvery(types.DISCLOSE_CANCEL_LIKE, effects.cancel_like),
        takeEvery(types.DISCLOSE_DELETEDISCLOSE, effects.deleteDisclose),

    ]);
}
