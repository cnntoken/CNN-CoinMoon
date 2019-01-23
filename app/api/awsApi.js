import {API} from 'aws-amplify';

const getBaseConfig = ()=>{
    return {
        response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
    }
}

const $API = (method, url, config)=>{
    return new Promise((resolve,reject)=>{
        API[method]('starkApi', url, config).then((response)=>{
            console.log('================== api response ==================',url)
            console.log(response)
            const data = response.data;
            if(data.code === 200){
                resolve(data.result)
            }else{
                reject(data.result)
            }
        }).catch((err)=>{
            console.log('================== api err ==================',url)
            console.log(err)
            reject(err)
        });
    })
};

export const $get = (url, params = {}) => {
    const config = getBaseConfig();
    config.queryStringParameters = params;
    return $API('get', url, config)
};

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

