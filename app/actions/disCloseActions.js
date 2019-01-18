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


export const getList  = (payload, callback) => {
    return {
        type: types.DISCLOSE_GETLIST,
        payload,
        callback
    };
};

export const getListByUserId  = (payload, callback) => {
    return {
        type: types.DISCLOSE_GETLISTBYUSERID,
        payload,
        callback
    };
};

export const like = (payload, callback) => {
    return {
        type: types.DISCLOSE_LIKE,
        payload,
        callback
    };
};

export const deleteDisclose = (payload, callback) => {
    return {
        type: types.DISCLOSE_DELETEDISCLOSE,
        payload,
        callback
    };
};

export const getDiscloseDetail = (payload, callback) => {
    return {
        type: types.DISCLOSE_GETDISCLOSEDETAIL,
        payload,
        callback
    };
};

export const  getDiscloseComments= (payload, callback) => {
    return {
        type: types.DISCLOSE_GETDISCLOSECOMMENTS,
        payload,
        callback
    };
};

export const commentDisclose = (payload, callback) => {
    return {
        type: types.DISCLOSE_COMMENTDISCLOSE,
        payload,
        callback
    };
};

export const likeComment = (payload, callback) => {
    return {
        type: types.DISCLOSE_LIKECOMMENT,
        payload,
        callback
    };
};

export const deleteComment = (payload, callback) => {
    return {
        type: types.DISCLOSE_DELETECOMMENT,
        payload,
        callback
    };
};
