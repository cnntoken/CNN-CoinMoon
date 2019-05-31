import {put, call, select, all} from 'redux-saga/effects';
import {$toast} from '../../utils'
import * as Types from '../../actions/types'
import * as userService from '../../services/user'
import i18n from '../../i18n';
import {Platform} from "react-native";
import {deviceInfo} from '../../utils/CNNBridge'

// 登出
export function* logout({payload}) {
    let {callback} = payload;
    try {
        // 注册登录设备用户
        let res = yield userService.register({
            "source": Platform.OS,
            "source_uid": deviceInfo.did
        });

        let info = res.data;
        // info.deviceInfo = deviceInfo;
        console.log(info)
        yield put({type: Types.SET_USER_INFO, info});

        $toast(i18n.t('page_login.loginout_ok'));

        callback && callback(info);
    } catch (e) {
        // $toast(i18n.t('page_login.loginout_fail:', e));
        
    }
}

// 发送验证码
export function* sendsms({payload}) {
    try {
        let {params, callback} = payload;
        const res = yield  userService.send_sms(params);
        $toast(i18n.t('send_sms_ok'));
        callback && callback(res);
    } catch (e) {
        console.log(e);
        $toast(i18n.t('send_sms_fail'));
    }
}

// 获取用户详细信息
export function* get_profile({payload}) {
    let {callback} = payload;
    try {
        const res = yield userService.get_profile();
        callback && callback(res)
    } catch (e) {
        // $toast(i18n.t('page_login.loginout_fail:', e));
    }
}

// 更新用户详细信息
export function* update_profile({payload}) {
    let {params, file, user_id, callback} = payload;
    try {
        let upload_res = {};
        if (file) {
            upload_res = yield userService.upload(file);
            params.avatar = upload_res.data.urls.url;
        }
        const res = yield userService.update_profile(user_id, params);

        const info = yield select((state) => {
            const {userReducer: {info}} = state;
            return info
        });

        let data = Object.assign(info, res.data);

        yield put({type: Types.SET_USER_INFO, info: data});
        callback && callback(data);

    } catch (e) {
        callback && callback({
            error: e
        })
    }
}

// 通过手机号，验证码登录或注册
export function* login_or_reg({payload}) {
    let {params, callback} = payload;
    try {
        const res = yield userService.register(params);
        const info = res.data;
        // info.deviceInfo = deviceInfo;
        yield put({type: Types.SET_USER_INFO, info});
        callback && callback(info);
    } catch (e) {
        console.log(e);
        callback && callback({error: e});
    }
}

// 上传图片
export function* upload({payload}) {
    const {files, callback} = payload;
    try {
        let tasks = [];
        // 并行上传图片,使用call(effects)保证顺序
        files.forEach((item) => {
            tasks.push(call(userService.upload, item));
        });
        const results = yield all(tasks);
        if (callback) callback(results);
    } catch (e) {
        if (callback) callback({
            error: e
        });
    }
}
