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
}
