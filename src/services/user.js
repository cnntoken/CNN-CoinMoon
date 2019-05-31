/**
 * @desc 参考地址：https://github.com/tmrwh/NewsDog/wiki/CNN-Backend-API
 * */

import axios from '../utils/request';

/***
 * @desc  注册，登录接口；
 * @param params
 * */
export const register = (params) => {
    return axios({
        method: 'post',
        url: `/v1/users/`,
        data: params
    });
};

/***
 * @desc  send sms
 * @param params
 * */
export const send_sms = (params) => {
    return axios({
        method: 'post',
        url: `/v1/vcode/`,
        data: params
    });
};


/***
 * @desc  get profile
 * @param user_id
 * */
export const get_profile = (user_id) => {
    return axios({
        method: 'get',
        url: `/v1/users/${user_id}/`,
    });
};


/***
 * @desc  update profile
 * @param user_id
 * @param params
 * */
export const update_profile = (user_id, params) => {
    return axios({
        method: 'put',
        url: `/v1/users/${user_id}/`,
        data: params
    });
};

/***
 * @desc 上传图片
 * @param data
 * */
export const upload = (data) => {
    return axios({
        method: 'post',
        url: `/v1/file/`,
        data: data,
    });
};
