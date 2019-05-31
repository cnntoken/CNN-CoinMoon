import { $toast } from './index';
import i18n from '@i18n';
import { NetInfo } from 'react-native';
import { getCurrentUser, deviceInfo } from './CNNBridge';

const timeoutSeconds = 100;
const generateConfig = async (method, params = {}, config = {}) => {
    let finalConfig;
    config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    let userReducer = await getCurrentUser()
    if (userReducer.token) {
        config.headers['Authorization'] = `HIN ${userReducer.token}`
    }
    config.params = {
        ...deviceInfo,
        ...params,
    };
    if (method === 'GET') {
        finalConfig = Object.assign({}, { method: 'GET' }, config);
    } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        let body = JSON.stringify(params);
        finalConfig = Object.assign({}, { method }, { body }, config);
    }
    return finalConfig;
};

const requestTimeout = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('request timeout');
        }, timeoutSeconds * 1000);
    });
};

const checkNetInfo = async () => {
    let isConnected = await NetInfo.isConnected.fetch();
    return isConnected;
};

const generateRequest = (method, url, config) => {
    let p1 = new Promise(async (resolve, reject) => {
        console.log(
            `========*****request ${method}******========`,
            url,
            config,
        );
        fetch(url, config)
            .then(response => response.json())
            .then(responseJson => {
                console.log(
                    `==========*******response ${method} from ${url}*******=======`,
                    responseJson,
                );
                resolve(responseJson);
            })
            .catch(error => {
                console.log('request fail url:', url);
                console.log('request fail reason:', error);
                reject(error);
            });
    });
    let p2 = requestTimeout();
    let isConnected = checkNetInfo();
    if (!isConnected) {
        $toast(i18n.t('net_error'));
        return Promise.reject({
            error_type: 'disconnected',
            msg: i18n.t('net_error'),
        });
    } else {
        return Promise.race([p1, p2]);
    }
};

export const $get = async (url, params = {}, config = {}) => {
    let finalConfig = await generateConfig('GET', params, config);
    return generateRequest('GET', url, finalConfig);
};
export const $post = async (url, params = {}, config = {}) => {
    let finalConfig = await generateConfig('POST', params, config);
    return generateRequest('POST', url, finalConfig);
};
export const $delete = async (url, params = {}, config = {}) => {
    let finalConfig = await generateConfig('DELETE', params, config);
    return generateRequest('DELETE', url, finalConfig);
};

export const $upload = async (url, fileArr, config={headers:{}}) => {
    const formData = new FormData();
    if (!fileArr.length) {
        return { success: false, message: '未选择文件' };
    }
    for (const i of fileArr) {
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
    console.log('files: ', formData.getAll('file'));
    const {headers,...rest} = config
    const finalConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...headers,
        },
        body: formData,
        ...rest,
    };
    const userReducer = await getCurrentUser();
    if (
        !['ios', 'android'].includes(userReducer.account_type) &&
        userReducer.token
    ) {
        finalConfig.headers['Authorization'] = `HIN ${userReducer.token}`;
    }
    return generateRequest('POST', url, finalConfig);
};
