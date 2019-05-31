import * as types from './types';

export const getDetail = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_GETDETAIL,
        payload,
        onSuccess,
        onFail
    };
};

export const getCommentList = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_GETCOMMENTLIST,
        payload,
        onSuccess,
        onFail
    };
};

export const comment = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_COMMENT,
        payload,
        onSuccess,
        onFail
    };
}
export const like = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_LIKE,
        payload,
        onSuccess,
        onFail
    };
};

export const likeComment = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_LIKE_COMMENT,
        payload,
        onSuccess,
        onFail
    };
};

export const cancel_likeComment = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_CANCEL_LIKE_COMMENT,
        payload,
        onSuccess,
        onFail
    };
};

export const deleteComment = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_DELETE_COMMENT,
        payload,
        onSuccess,
        onFail
    };
};

export const like_feed = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_LIST_LIKE,
        payload,
        onSuccess,
        onFail
    };
};



// 举报feed
export const report = (payload, callback) => {
    return {
        type: types.FEED_PEPORT,
        payload,
        callback
    };
};


// 取消点赞
export const cancel_like_Feed = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_LIST_CANCEL_LIKE,
        payload,
        onSuccess,
        onFail
    };
};

