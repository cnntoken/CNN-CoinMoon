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
