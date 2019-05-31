/**
 * @desc feed相关接口
 * */

import axios from '@utils/request';

/***
 * @desc 获取feed list
 * @param {String} category 列表类型 news|info
 * */
export const getlist = (params) => {
    return axios.get(`/v1/feeds/`, {params: params});
};


/***
 * @desc 点赞
 * @param params.id id
 * */
export const like = (params) => {
    return axios.post(`/v1/feeds/${params.id}/likes/`)
};


/***
 * @desc 取消点赞
 * @param params.id id
 * */
export const cancel_like_feed = (params) => {
    return axios.delete(`/v1/feeds/${params.id}/likes/`)
};
