import {API} from 'aws-amplify';

const getBaseConfig = () => {
    return {}
}

const $API = (method, url, config) => {
    return new Promise((resolve, reject) => {
        API[method]('cnn-stark', url, config).then((response) => {
            if (response.code === 200) {
                resolve(response.result)
            } else {
                reject(response.result)
            }
        }).catch((err) => {
            reject(err)
        });
    })
}

export const $get = (url, params = {}) => {
    const config = getBaseConfig()
    config.queryStringParameters = params;
    return $API('get', url, config)
}

export const $post = (url, params = {}) => {
    const config = getBaseConfig()
    config.body = params;
    return $API('post', url, config)
}

export const $put = (url, params = {}) => {
    const config = getBaseConfig()
    config.body = params;
    return $API('put', url, config)
}

export const $delete = (url, params = {}) => {
    const config = getBaseConfig()
    config.body = params;
    return $API('del', url, config)
};

// export const $upload = (url, params = {}) => {
//     const config = {
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//         },
//         body: params
//     };
//     return $API('post', url, config)
// };

