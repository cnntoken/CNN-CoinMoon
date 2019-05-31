import * as types from './types';


// 更新用户信息
export const updateUserInfo = (payload, callback) => {
    return {
        type: types.AUTH_UPDATE_USER,
        payload,
        callback
    };
};

