import {
    takeEvery,
    all,
    call,
} from 'redux-saga/effects';

import * as services from './services'
import * as types from './types';
import {getNumByUserId} from '@utils';
import avatars from "@services/constants";
import i18n from '@i18n';
import {closeRNPage} from "@src/utils/CNNBridge";

const effects = {

    // 发布保存
    * publish({payload}) {
        const {title, files, user_name, callback} = payload;
        try {
            let images = [];
            if (files && files.length > 0) {

                let tasks = [];
                // 并行上传图片,使用call(effects)保证顺序
                files.forEach((item) => {
                    tasks.push(call(services.upload, item));
                });

                const results = yield all(tasks);

                results.forEach((item) => {
                    images.push(item.data.urls.url);
                });


            }

            const res = yield call(services.publish, title, images, user_name);

            let avatarType = getNumByUserId(res.data.user.id);
            res.data.source = avatars[avatarType % 5];
            res.data.userName = i18n.t('disclose.anonymous');

            // todo 添加到列表里面
            // yield put({
            //     type: Types.DISCLOSE_LIST_UNSHIFT, data: res.data
            // });

            // yield closeRNPage();

            if (callback) callback(res.data);

        } catch (e) {
            console.log('publish fail');
            if (callback) callback({error: e.message});
        }
    },
};

export default function* watch() {
    yield all([
        takeEvery(types.DISCLOSE_PUBLISH, effects.publish),
    ]);
}
