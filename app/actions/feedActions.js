import * as types from './types';

export const getList = (payload,callback)=> {
    return {
        type: types.FEED_GETLIST,
        payload,
        callback
    };
}
export const getDetail = (payload,callback)=> {
    return {
        type: types.FEED_GETDETAIL,
        payload,
        callback
    };
};
export const getCommentList = (payload,callback)=> {
    return {
        type: types.FEED_GETCOMMENTLIST,
        payload,
        callback
    };
}

export const comment = (payload,callback)=> {
    return {
        type: types.FEED_COMMENT,
        payload,
        callback
    };
}
export const like = (payload,callback)=> {
    return {
        type: types.FEED_LIKE,
        payload,
        callback
    };
};

export const likeComment = (payload,callback)=> {
    return {
        type: types.FEED_LIKE_COMMENT,
        payload,
        callback
    };
};

export const deleteComment = (payload,callback)=> {
    return {
        type: types.FEED_DELETE_COMMENT,
        payload,
        callback
    };
};

export const feedLike = (payload,callback)=> {
    return {
        type: types.FEED_LIST_LIKE,
        payload,
        callback
    };
};

export const getListByUserId = (payload,callback)=> {
    return {
        type: types.FEED_LIST_BYUSERID,
        payload,
        callback
    };
};



export const feedItemChange = (payload,callback)=> {
    return {
        type: types.FEED_ITEM_CHANGE,
        payload,
        callback
    };
};