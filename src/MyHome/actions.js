import * as types from './types';





export const getList  = (payload, callback) => {
    return {
        type: types.DISCLOSE_GETLIST,
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



