import * as Types from '../app/actions/types';
import * as  services from './user';
import {NetInfo, Platform} from 'react-native';
import {getStoredState} from 'redux-persist';
import storage from 'redux-persist/es/storage';
let DeviceInfo = require('react-native-device-info').default;
class AppService {

    constructor() {
        this.reduxStore = null;
        this.init();
    }

    init() {

    }

    // 注册匿名用户
    async reg_anonymous_user() {
        try {
            let uid = await DeviceInfo.getUniqueID();
            let res = await services.register({
                "source": Platform.OS,
                "source_uid": uid
            });
            res.data.deviceInfo = await services.getDeviceInfo();
            this.reduxStore.dispatch({type: Types.SET_USER_INFO, info: res.data});
        } catch (e) {
            console.log(e);
        }
    }

    async prepare(store) {
        this.reduxStore = store;
        try {
            // 去缓存里拿用户信息，没必要每次都去更新用户信息，仅在没有拿到用户信息的时候才去注册匿名用户
            let userInfo = await getStoredState({
                key: 'root',
                storage: storage
            });
            let info = userInfo.userReducer.info;
            // 如果获取不到用户
            if (!info.user_id) {
                await this.reg_anonymous_user();
            }
        } catch (e) {
            // 如果没有拿到缓存的信息，则需要注册个匿名用户
            await this.reg_anonymous_user();
        }
    }
}

export default new AppService();
