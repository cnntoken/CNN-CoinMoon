/**
 * @desc feed相关接口
 * */

import axios from '@utils/request';

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
