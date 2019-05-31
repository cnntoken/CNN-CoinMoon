/**
 * @desc feed相关接口
 * */

import axios from '@utils/request';


/***
 * @desc 发布爆料内容
 *@param title 爆料内容
 *@param images 爆料图片地址集合
 *@param userName 发布爆料人的userName
 * */
export const publish = (title, images, user_name) => {
    return axios.post(`/v1/discloses/`, {
        title,
        images,
        user_name
    })
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
