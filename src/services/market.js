/**
 * @desc market相关接口
 * */

// import axios from '@utils/request';
import {$get,$post,$delete} from '@utils/fetch'

const HOST = {
    staging: 'http://staging.app.cnntoken.io',
    online: 'http://app.cnntoken.io'
}
// 自选列表
export const getMineList = (params) => {
    const read_tag = params.read_tag
    const count = params.count
    return $get(`${HOST.online}/v1/self_coins/?read_tag=${read_tag}&count=${count}`)
}
// 币种列表(排行)
export const getCoinList = async({read_tag,count,sort_by}) => {
    return $get(`${HOST.online}/v1/coins/?read_tag=${read_tag}&count=${count}&sort_by=${sort_by}`)
}
// 刷新自选列表数据
export const getDatabyMineID = async(params) => {
    return $get(`${HOST.online}/v1/coins/batch/status/?coin_id=${params.join(',')}`)
}
// market详情
export const getCoinDetail = (params) => {
    return $get(`${HOST.online}/v1/coins/${params}/detail/`)
}
//讨论列表
export const getDiscussList = ({coin_id,read_tag,count}) => {
    return $get(`${HOST.online}/v1/coins/${coin_id}/discussions/?read_tag=${read_tag}&count=${count}`)
}
//market详情页的交易对列表
export const getMarketPairByCoinID = ({read_tag,count,coin_id}) => {
    return $get(`${HOST.online}/v1/coins/${coin_id}/markets/?read_tag=${read_tag}&count=${count}`,)
}
//搜索列表
export const getSearchList = ({key_word,count,read_tag}) => {
    return $get(`${HOST.online}/v1/coins/searches/?read_tag=${read_tag}&key_word=${key_word}&count=${count}`)
}
//发布讨论
export const discussCoin = (params) => {
    return $post(`${HOST.online}/v1/coins/${params.coin_id}/discussions/`,{content:params.content})
}
//点赞讨论
export const likeDisucss = (params) => {
    return $post(`${HOST.online}/v1/discussions/${params}/likes/`)
}
//取消点赞讨论
export const cancelLikeDiscuss = (params) => {
    return $delete(`${HOST.online}/v1/discussions/${params}/likes/`)
}
//删除讨论
export const deleteDiscuss = (params) => {
    return $delete(`${HOST.online}/v1/discussions/${params.id}/`)
}
//讨论详情
export const getDiscussDetail = (params) => {
    let res =  $get(`${HOST.online}/v1/discussions/${params.discuss_id}/?read_tag=${params.read_tag}&count=${params.count}`)
    return res
}
//回复讨论
export const discussReply = (params) => {
    return $post(`${HOST.online}/v1/discussions/${params.discuss_id}/replies/`,{content: params.content})
}
//添加自选
export const addCollection = (params) => {
    return $post(`${HOST.online}/v1/self_coins/`,{coin_id:params})
}
//删除自选
export const removeCollection = (params) => {
    return $delete(`${HOST.online}/v1/self_coins/${params}/`)
}
//历史均价
export const getAvgPriceData = (params) => {
    return $get(`${HOST.online}/v1/coins/${params.id}/graph/`,params)
}
