import * as types from './types';

// 发布爆料
export const publish = (payload, callback) => {
    return {
        type: types.DISCLOSE_PUBLISH,
        payload,
        callback
    };
};

// 上传图片
export const upload = (payload, callback) => {
    return {
        type: types.DISCLOSE_UPLOAD,
        payload,
        callback
    };
};
