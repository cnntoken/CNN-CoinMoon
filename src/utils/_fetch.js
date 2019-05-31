/**
 * fetch 封装，timeout，cancel;
    ========================
    var p = _fetch('https://www.baidu.com',{mode:'no-cors'});
    p.then(function(res) {
        console.log('response:', res);
    }).catch(function(e) {
        console.log('error:', e);
    });
    p.abort(); // 主动终止请求
    ========================
    async () => {
        try {
            const p = $get(
                'https://www.baidu.com',
                {},
                {
                    mode: 'no-cors',
                    // timeout: 1,
                },
            );
            console.log(p);
            // p.abort();
            const res = await p;
            console.log('res:', res);
        } catch (e) {
            console.log('err:', e);
        }
    }
 */
import { $toast } from './index';
import i18n from '@i18n';
import { NetInfo } from 'react-native';
import { getCurrentUser, deviceInfo } from './CNNBridge';

const apiTimeout = 30 * 1000;

const checkNetInfo = async () => {
    let isConnected = await NetInfo.isConnected.fetch();
    return isConnected;
};

export const _fetch = (fetch => (url, { timeout = apiTimeout, ...rest }) => {
    let abort = null;
    // 可被终止（reject）的promise
    const abort_promise = new Promise((resolve, reject) => {
        abort = (msg = 'abort.') => {
            reject(msg);
        };
        if (timeout) {
            setTimeout(() => {
                abort(`timeout：${timeout}ms`);
            }, timeout);
        }
    });
    // 业务API的promise
    const fetch_promise = new Promise((resolve, reject) => {
        let isConnected = checkNetInfo();
        if (!isConnected) {
            $toast(i18n.t('net_error'));
            Promise.reject({
                error_type: 'disconnected',
                msg: i18n.t('net_error'),
            });
        } else {
            fetch(url, rest)
                .then(response => {
                    console.log(
                        `==========*******response ${
                            rest.method
                        } from ${url}*******=======`,
                    );
                    console.log('response: ', response);
                    if (response.status >= 200 && response.status < 300) {
                        console.log('response2json: ', response.json());
                        resolve(response.json());
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    console.log('request fail url:', url);
                    console.log('request fail reason:', error);
                    reject(error);
                });
        }
    });
    // race：返回最快的结果（resolve/reject）
    const promise = Promise.race([fetch_promise, abort_promise]);
    promise.abort = abort;
    // console.log(promise)
    return promise;
})(fetch);

export const generateConfig = async (method, params, config) => {
    let finalConfig;
    config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    const userReducer = await getCurrentUser();
    if (
        !['ios', 'android'].includes(userReducer.account_type) &&
        userReducer.token
    ) {
        config.headers['Authorization'] = `HIN ${userReducer.token}`;
    }
    config.params = {
        ...deviceInfo,
        ...params,
    };
    if (method === 'GET') {
        finalConfig = Object.assign({}, { method: 'GET' }, config);
    } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        const body = JSON.stringify(params);
        finalConfig = Object.assign({}, { method }, { body }, config);
    } else if (method === 'UPLOAD'){
        const formData = new FormData();
        if (!params.length) {
            return { success: false, message: '未选择文件' };
        }
        for (const i of params) {
            const path = i.path;
            const arr = path.split('/');
            const file = {
                uri: path,
                type: 'multipart/form-data',
                name: escape(arr[arr.length - 1]),
                fileType: i.mime,
            };
            formData.append('file', file);
        }
        const {headers,...rest} = config
        finalConfig = {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
            ...rest,
        };
    }
    return finalConfig;
};

export const $get = async (url, params = {}, config = {}) => {
    const finalConfig = await generateConfig('GET', params, config);
    return _fetch(url, finalConfig);
};

export const $post = async (url, params = {}, config = {}) => {
    const finalConfig = await generateConfig('POST', params, config);
    return _fetch(url, finalConfig);
};
export const $delete = async (url, params = {}, config = {}) => {
    const finalConfig = await generateConfig('DELETE', params, config);
    return _fetch(url, finalConfig);
};
export const $upload = async (url, fileArr = [], config = {}) => {
    const finalConfig = await generateConfig('UPLOAD', fileArr, config);
    return _fetch(url, finalConfig);
};