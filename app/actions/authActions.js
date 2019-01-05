import * as types from './types';

export const login = (payload,callback)=> {
    return {
        type: types.AUTH_LOGIN,
        payload,
        callback
    };
}
export const register = (payload,callback)=> {
    return {
        type: types.AUTH_REGISTER,
        payload,
        callback
    };
}
export const logout = (payload={},callback)=> {
    return {
        type: types.AUTH_LOGOUT,
        payload,
        callback
    };
}
export const verify = (payload,callback)=> {
    return {
        type: types.AUTH_VERIFY,
        payload,
        callback
    };
}
export const resend = (payload,callback)=> {
    return {
        type: types.AUTH_RESEND,
        payload,
        callback
    };
}