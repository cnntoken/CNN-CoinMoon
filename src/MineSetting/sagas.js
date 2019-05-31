import {
    takeEvery,
    all,
} from 'redux-saga/effects';

import * as types from './types';

import {setUserInfo} from '@utils/CNNBridge';
import {DeviceEventEmitter} from "react-native";


const effects = {


    // 登出 , 将用户信息清空即可
    * logout({payload}) {
        try {
            let {callback} = payload;
            yield setUserInfo({});
            if (callback) callback();
            DeviceEventEmitter.emit('userStateChange', {});

        } catch (e) {
            console.log(e);
        }
    },


};

export default function* watch() {
    yield all([
        takeEvery(types.AUTH_LOGOUT, effects.logout),
    ]);
}
