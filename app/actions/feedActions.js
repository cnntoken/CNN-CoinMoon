import * as types from './types';

export const getList = (payload, onSuccess, onFail)=> {
    return {
        type: types.FEED_GETLIST,
        payload,
        onSuccess,
        onFail
    };
}
export const getDetail = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_GETDETAIL,
        payload,
        onSuccess,
        onFail
    };
};
export const getCommentList = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_GETCOMMENTLIST,
        payload,
        onSuccess,
        onFail
    };
}

export const comment = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_COMMENT,
        payload,
        onSuccess,
        onFail
    };
}
export const like = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_LIKE,
        payload,
        onSuccess,
        onFail
    };
};

export const likeComment = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_LIKE_COMMENT,
        payload,
        onSuccess,
        onFail
    };
};

export const deleteComment = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_DELETE_COMMENT,
        payload,
        onSuccess,
        onFail
    };
};

export const feedLike = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_LIST_LIKE,
        payload,
        onSuccess,
        onFail
    };
};

export const getListByUserId = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_LIST_BYUSERID,
        payload,
        onSuccess,
        onFail
    };
};



export const feedItemChange = (payload,onSuccess, onFail)=> {
    return {
        type: types.FEED_ITEM_CHANGE,
        payload,
        onSuccess,
        onFail
    };
};


export const removeItem = (payload)=> {
    return {
        type: types.FEED_ROMEVE_ITEM,
        payload
    };
};
