import {
    takeEvery,
    all,
} from 'redux-saga/effects';

import * as types from './types';

import {deviceInfo, getCurrentUser, setUserInfo} from '@utils/CNNBridge';
import {DeviceEventEmitter, Platform} from "react-native";
import * as userService from "@src/services/user";
import i18n from "@src/i18n";
import {$toast} from '@utils';


const effects = {

    // 登出
   * logout({payload}) {
        let {callback} = payload;
        try {
            // 注册登录设备用户
            let res = yield userService.register({
                "source": Platform.OS,
                "source_uid": deviceInfo.android_id
            });

            let info = res.data;

            let currentUser = yield getCurrentUser();

            let data = Object.assign(currentUser, info);

            yield setUserInfo(data);

            DeviceEventEmitter.emit('userStateChange', data);

            $toast(i18n.t('page_login.loginout_ok'));

            callback && callback(info);

        } catch (e) {

            // $toast(i18n.t('page_login.loginout_fail:', e));

        }
    }


};

export default function* watch() {
    yield all([
        takeEvery(types.AUTH_LOGOUT, effects.logout),
    ]);
}
