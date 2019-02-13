import * as types from './types';


//  查询用户行为集合
export const getActions = (payload, callback) => {
    return {
        type: types.USERACTION_GETACTION,
        payload,
        callback
    };
};


// 更新行为
export const update = (payload, callback) => {
    return {
        type: types.USERACTION_UPDATE,
        payload,
        callback
    };
};

// 更新行为
export const report = (payload, callback) => {
    return {
        type: types.USERACTION_REPORT,
        payload,
        callback
    };
};

// 不再展示爆料ID
export const dislike_discloseId = (payload, callback) => {
    return {
        type: types.APPEND_DISLIKE_DISCLOSEID,
        payload,
        callback
    };
};

// 不再展示feed
export const dislike_feedId = (payload, callback) => {
    return {
        type: types.APPEND_DISLIKE_FEEDID,
        payload,
        callback
    };
};
