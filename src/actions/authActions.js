import * as types from './types';


export const logout = (payload = {}, callback) => {
    return {
        type: types.AUTH_LOGOUT,
        payload,
        callback
    };
};


// 通过手机号发送验证码
export const seedSMS = (payload, callback) => {
    return {
        type: types.AUTH_SEND_SMD,
        payload,
        callback
    };
};

// 通过手机号，验证码登录，注册
export const loginOrReg = (payload, callback) => {
    return {
        type: types.AUTH_LOGIN_OR_REG,
        payload,
        callback
    };
};

// 上传图片
export const upload = (payload, callback) => {
    return {
        type: types.AUTH_UPLOAD,
        payload,
        callback
    };
};

// 更新用户信息
export const updateUserInfo = (payload, callback) => {
    return {
        type: types.AUTH_UPDATE_USER,
        payload,
        callback
    };
};
