import * as types from './types';

// 登录
export const logout = (payload, callback) => {
    return {
        type: types.AUTH_LOGOUT,
        payload,
        callback
    };
};
