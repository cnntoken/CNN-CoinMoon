/**
 * @desc 封装axios , 统一日志，添加header_token等
 * */
import axios from 'axios';
import {$toast} from './index';
import i18n from '../i18n';
import {NetInfo} from "react-native";
import {getCurrentUser, deviceInfo} from './CNNBridge';

let instance = axios.create({
    // baseURL: __DEV__ ? 'http://staging.app.cnntoken.io' : 'https://app.cnntoken.io',
    // baseURL: 'http://staging.app.cnntoken.io',
    baseURL: 'https://app.cnntoken.io',
    timeout: 15000,  // 15s
});

// 请求队列：token-标志，cancel-取消函数
const pending = [];
const cancelToken = axios.CancelToken;

export const cancelRequest = (config) => {
    for (const i in pending) {
        if (pending[i].token === `${config.method}:${config.url}`) {
            // 执行取消请求
            pending[i].cancel();
            // 队列中移除该请求
            pending.splice(i, 1)
        }
    }
}

// Add a request interceptor
instance.interceptors.request.use(async (config) => {
    // console.log(config.url);
    try {
        // let isConnected = await NetInfo.isConnected.fetch();
        // // 检测网络状态，如果不是联网状态则给提示

        // if (!isConnected) {
        //     $toast(i18n.t('net_error'));
        //     return Promise.reject({
        //         error_type: 'disconnected',
        //         msg: i18n.t('net_error')
        //     });
        // }

        // 获取当前登录用户信息
        const userReducer = await getCurrentUser();

        // TODO 如果是设备用户，则不添加header token
        if (!['ios', 'android'].includes(userReducer.account_type) && userReducer.token) {
            config.headers['Authorization'] = `HIN ${userReducer.token}`
        }

        config.params = Object.assign(config.params || {}, {...deviceInfo});

        // 发送请求前先取消该请求
        // cancelRequest(config)
        // config.cancelToken = new cancelToken((c)=>{
        //     pending.push({
        //         token: `${config.method}:${config.url}`,
        //         cancel: c
        //     })
        // })

    } catch (e) {
        console.log("设置header Authorization token失败", e);
    }

    console.log(`*************************************** axios request , ${config.method} , ${config.url} : *************************************** \n`, config);

    return config;
}, (error) => {
    console.log('request 失败:', error);
    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    console.log(`*************************************** ${response.config.method} , ${response.config.url} : axios response: *************************************** \n`, response);
    // 完成响应后取消请求，将其从pending队列中移除
    // cancelRequest(response.config);
    return response;
}, function (error) {
    console.log('response 失败:', error);
    return Promise.reject(error);
});

export default instance;
