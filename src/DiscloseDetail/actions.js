import * as types from './types';




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


export const cancel_like = (payload, callback) => {
    return {
        type: types.DISCLOSE_CANCEL_LIKE,
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



export const dislike_discloseId = (payload, callback) => {
    return {
        type: types.DISCLOSE_DISLIKE,
        payload,
        callback
    };
};

export const dislike_userId = (payload, callback) => {
    return {
        type: types.DISCLOSE_DISLIKE_USERID,
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


// 举报feed
export const report = (payload, callback) => {
    return {
        type: types.DISCLOSE_PEPORT,
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

export const cancel_likeComment = (payload, callback) => {
    return {
        type: types.DISCLOSE_CANCEL_LIKECOMMENT,
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
