import {
    takeEvery,
    all,
} from 'redux-saga/effects';
import {
   DeviceEventEmitter
} from 'react-native';
import * as services from './services';
import * as types from './types';

import {setUserInfo, getCurrentUser} from '@utils/CNNBridge';


const effects = {


    * update_profile({payload}) {
        let {params, file, user_id, callback} = payload;
        try {
            let upload_res = {};
            if (file) {
                upload_res = yield services.upload(file);
                params.avatar = upload_res.data.urls.url;
            }
            let currentUser = yield getCurrentUser();
            const res = yield services.update_profile(user_id, params);
            let data = Object.assign(currentUser, res.data);
            yield setUserInfo(data);
            DeviceEventEmitter.emit('userStateChange', data);
            callback && callback(data);

        } catch (e) {
            callback && callback({
                error: e
            })
        }
    },


};

export default function* watch() {
    yield all([
        takeEvery(types.AUTH_UPDATE_USER, effects.update_profile),
    ]);
}
