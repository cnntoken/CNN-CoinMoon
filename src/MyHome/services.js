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

/***
 * @desc 获取爆料列表list
 * @param params
 * */
export const getlist = (params) => {
    let url = `/v1/discloses/`;
    return axios.get(url, {
        params: params
    });
};


/***
 * @desc 根据某个用户id获取该用户爆料的内容列表
 * @param params
 * */
export const getListByUserId = (params) => {
    let url = `${url}/disclose/getListByUserId/${params.userId}`;
    return axios.get(url, params);
};


/***
 * @desc 点赞爆料
 * @param id 爆料id
 * */
export const like = (id) => {
    let url = `/v1/discloses/${id}/likes/`;
    return axios.post(url);
};
/***
 * @desc 取消点赞
 * @param id 爆料id
 * */
export const cancel_like = (id) => {
    let url = `/v1/discloses/${id}/likes/`;
    return axios.delete(url);
};

/***
 * @desc 删除爆料，仅能删除自己发布的爆料
 * @param id 爆料id
 * */
export const deleteDisclose = (id) => {
    let url = `/v1/discloses/${id}/`;
    return axios.delete(url);
};

/***
 * @desc 获取爆料详情
 * @param id 爆料id
 * */
export const getDiscloseDetail = (id) => {
    return axios.get(`/v1/discloses/${id}/`);
};


/***
 * @desc 根据爆料ID获取所有的爆料评论列表
 * @param id 爆料id
 * @param params 请求参数
 * @param params.limit 请求多少条
 * @param params.LastEvaluatedKey  上次请求返回的LastEvaluatedKey字段
 * */
export const getDiscloseComments = (id, params) => {
    let url = `/v1/discloses/${id}/comments/`;
    return axios.get(url, {params});
};


/***
 * @desc 评论爆料，或者回复评论
 * @param params
 * @param data
 * */
export const commentDisclose = (params, data) => {
    let url = `/v1/discloses/${params.id}/comments/`;
    return axios.post(url, data);
};


/***
 * @desc 点赞评论
 * @param id 评论id
 * @param  cancel 是否取消 如果带该参数，则递减
 * @param  field  需要递增或递减的字段
 * */
export const likeComment = (params) => {
    let url = `v1/discloses/comments/${params.id}/likes/`;
    return axios.post(url);
};

export const cancel_likeComment = (params) => {
    let url = `v1/discloses/comments/${params.id}/likes/`;
    return axios.delete(url);
};

/***
 * @desc 删除评论 仅有自己能删除自己发布的评论
 * @param id 评论id
 * */
export const deleteComment = (params) => {
    let url = `/v1/discloses/comments/${params.id}/`;
    return axios.delete(url);
};


export const dislike_discloseId = (id) => {
    let url = `/v1/discloses/${id}/dislikes/`;
    return axios.post(url);
};

export const dislike_userId = (id) => {
    let url = `/v1/discloses//dislikes/`;
    return axios.post(url);
};

/***
 * @desc 举报feed
 * @param params
 * @param data
 * */
export const reports = (params, data) => {
    return axios({
        url: `/v1/discloses/${params.id}/reports/`,
        data: data,
        method: 'post'
    });
};
