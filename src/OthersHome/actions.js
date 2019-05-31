import * as types from './types';


export const like = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_LIKE,
        payload,
        onSuccess,
        onFail
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

export const getListByUserId = (payload, onSuccess, onFail) => {
    return {
        type: types.FEED_LIST_BYUSERID,
        payload,
        onSuccess,
        onFail
    };
};

