/**
 * @desc feed相关接口
 * */

import axios from '@utils/request';

/***
 * @desc 获取feed详情
 * @param id
 * */
export const getFeedDetail = (id) => {
    return axios.get(`/v1/feeds/${id}/`, {
        params: null
    });
};


/***
 * @desc 根据feed ID获取所有的评论列表
 * @param id id
 * @param params 请求参数
 * */
export const getFeedComments = (id, params) => {
    return axios.get(`/v1/feeds/${id}/comments/`, {
        params
    })
};


/***
 * @desc 评论
 * @param params
 * @param data
 * */
export const comment = (params, data) => {
    return axios.post(`/v1/feeds/${params.id}/comments/`, data)
};

/***
 * @desc 删除评论
 * @param params
 * */
export const deleteComment = (params) => {
    return axios.delete(`/v1/feeds/comments/${params.id}/`)
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



/***
 * @desc 举报feed
 * @param params
 * @param data
 * */
export const reports = (params, data) => {
    return axios({
        url: `/v1/feeds/${params.id}/reports/`,
        data: data,
        method: 'post'
    });
};

/***
 * @desc 给评论点赞
 * @param params.id id
 * */
export const likeComment = (params) => {
    return axios({
        url: `/v1/feeds/comments/${params.id}/likes/`,
        method: 'post'
    });
};

/***
 * @desc 给评论点赞
 * @param params.id id
 * */
export const cancel_likeComment = (params) => {
    return axios({
        url: `/v1/feeds/comments/${params.id}/likes/`,
        method: 'delete'
    });
};

