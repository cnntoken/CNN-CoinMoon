import axios from '@utils/request';
import {$get} from '@utils/_fetch';

export const getExample = params => {
    const obj = {
        ...params,
        status: 'getExample done',
    };
    console.log('obj: ', obj);
    const timeout = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(obj);
            }, 1200);
        });
    };
    return timeout();
    // return axios({
    //     method: 'post',
    //     url: `/v1/users/`,
    //     data: params
    // });
};
// 币种模糊搜索
export const getSearchList = params => {
    console.log('service: ', params);
    return $get('/v1/eth_tokens/searches/',params)
};

// 验证密码正确与否
export const checkPwd = params => {
    console.log('service: ', params);
    const obj = {
        data: 'ok',
    };
    console.log('obj: ', obj);
    const timeout = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (params.pwd === '11111111') {
                    resolve(obj);
                } else {
                    reject('500');
                }
            }, 1200);
        });
    };
    return timeout();
    // return axios({
    //     method: 'post',
    //     url: `/v1/users/`,
    //     data: params
    // });
};

// 文件上传
export const fileUpload = (fileArr, url = '/v1/file/') => {
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
    return axios({
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    });
};
