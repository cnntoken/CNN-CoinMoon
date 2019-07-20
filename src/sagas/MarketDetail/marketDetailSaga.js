import {put, call, select} from 'redux-saga/effects';
import * as Types from '../../actions/types';
import * as services from '../../services/market';
import { adapterResponse } from '@utils/adapterResponse'
import {$toast} from '@utils/index'
import i18n from '@i18n';

//获取详情
export function* getCoinDetail({payload, onSuccess, onFail}){
    try{
        const res = yield call(services.getCoinDetail,payload)
        let finalRes
        if(res.is_pair){
            finalRes = yield adapterResponse([res],['change','volume','high_24','low_24','price_USD'])
        } else {
            finalRes = [res]
        }
        yield put({type: Types.MARKET_SET_COIN_DETAIL, res: finalRes[0]})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
        $toast(i18n.t('net_error'));
    }
}

// 获取第三方接口的数据，拼入后端返回的数据中
 const  getRemoteRes = async (data) => {
    let indexArr = [], resArr = []
    data.forEach((item,index)=>{
        if(item.is_pair){
            indexArr.push(index)
            resArr.push(item)
        }
    })
    let remoteRes = await adapterResponse(resArr,['change','price_USD'])
    //用第三方数据替换掉原来的数据
    indexArr.forEach((item,index)=>{
        data[item] = remoteRes[index]
    })
    return data
}
// 获取列表
export function* getList({payload, onSuccess, onFail}) {
    let { category, isLoadmore, sort_by, read_tag} = payload;
    try {
        let res = {data:{}},total
        if(category === 'mine'){
            let temp_res = yield call(services.getMineList, payload);
            let list =  yield getRemoteRes(temp_res)
            res = {data:{list}}
        } else if(category === 'all'){
            let list  = yield call(services.getCoinList, payload)
            res = {data:{list}}
        } else if(category === 'search'){
            let data = yield call(services.getSearchList, payload)
            let list = yield getRemoteRes(data)
            res = {data:{list}}
        }
        total = res.data.list.length||0
        read_tag = total && res.data.list[total-1].id || ''
        if(isLoadmore){
            yield put({type: Types.MARKET_APPEND_LIST,category,list:res.data.list,read_tag,sort_by})
        } else {
            yield put({type: Types.MARKET_SET_LIST, category, list: res.data.list,read_tag,sort_by});
        }
        onSuccess && onSuccess();
    } catch (e) {
        onFail && onFail(e);
        console.log(e);
    }
}
// export function* getDatabyMineID({payload, onSuccess, onFail}) {
//     try{
//         const res = yield call(services.getDatabyMineID, payload)
//         yield put({type: Types.MARKET_UPDATE_MINE_DATA,data: res})
//         onSuccess && onSuccess()
//     }catch(e){
//         onFail && onFail()
//         console.log(e)
//     }
// }
export function* getDiscussList({payload, onSuccess, onFail}) {
    try{
        const { isLoadmore } = payload
        const res = yield call(services.getDiscussList, payload)
        let read_tag = payload.read_tag
        if(res.length){
            read_tag = res[res.length - 1].id
        }
        if(isLoadmore){
            yield put({type: Types.MAARKET_APPEND_DISCUSS_LIST,list:res,read_tag})
        } else {
            yield put({type: Types.MARKET_SET_DISCUSS_LIST,list:res,read_tag:read_tag})
        }
        onSuccess && onSuccess(res.length)
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* likeDiscuss({payload, onSuccess, onFail}) {
    try{
        yield call(services.likeDisucss,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}

export function* cancelLikeDiscuss({payload, onSuccess, onFail}) {
    try{
        yield call(services.cancelLikeDiscuss,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* deleteDiscuss({payload, onSuccess, onFail}){
    try{
        yield call(services.deleteDiscuss,payload)
        let discussList = yield select((state)=>{
            return state.discussList
        })
        let list = discussList.list
        let read_tag = discussList.read_tag || ''
        // 如果是最后一条discuss，重置read_tag
        if(payload.index == discussList.list[discussList.list.length-1] ){
            read_tag = discussList.list[payload.index-1].id || ''
        }
        list.splice(payload.index,1)
        yield put({type: Types.MARKET_SET_DISCUSS_LIST,list:list,read_tag})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* getDiscussDetail({payload, onSuccess, onFail}) {
    try{
        const res = yield call(services.getDiscussDetail,payload)
        yield put({type: Types.MARKET_SET_DISCUSS_DETAIL,discuss_id:payload.discuss_id,info:res})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}

//针对货币发布讨论
export function* discussCoin({payload, onSuccess, onFail}) {
    try{
        const res = yield call(services.discussCoin,payload)
        const discussList = yield select((state)=>{
            return state.discussList
        })
        let list = discussList.list
        let read_tag = discussList.read_tag
        list.unshift(res)
        yield put({type: Types.MARKET_SET_DISCUSS_LIST,list:list,read_tag})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
//回复某条讨论
export function* discussReply({payload, onSuccess, onFail}) {
    try{
        const res = yield call(services.discussReply,payload)
        const discussList = yield select((state)=>{
            return state.discussList
        })
        let list = discussList.list
        let newItem = list[payload.discussIndex]
        newItem = {
            ...newItem,
            replies:[
                res,
                ...newItem.replies
            ],
            reply_count: newItem.reply_count + 1
        }
        list.splice(payload.discussIndex,1,newItem)
        yield put({type: Types.MARKET_UPDATE_DISCUSS_LIST,payload:{list:list}})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}

export function* getMarketPairByCoinID({payload,onSuccess,onFail}) {
    let { isLoadmore } = payload;
    try{
        const list = yield call(services.getMarketPairByCoinID,payload)
        const data = yield getRemoteRes(list)
        let read_tag = ''
        if(data && data.length){
            read_tag = data[data.length-1].id
        }
        if(isLoadmore){
            yield put({type: Types.MARKET_APPEND_MARKET_PAIR_LIST_BY_COINID,list:data,read_tag})
        } else {
            yield put({type: Types.MARKET_SET_MARKET_PAIR_LIST_BY_COINID,read_tag,list:data})
        }
        let total = data.length||0
        let no_more = total < payload.count ? true : false
        onSuccess && onSuccess(no_more)
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* getAvgPriceData({payload,onSuccess,onFail}){
    try{
        const res = yield call(services.getAvgPriceData,payload)
        yield put({type: Types.MARKET_SET_AVG_PRICE_DATA,id:payload.id,data:res.quotes})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail()
        console.log(e)
    }
}
export function* addCollection({payload,onSuccess,onFail}){
    try{
        yield call(services.addCollection,payload)
        if(payload.type == 'coin_market_pair'){
            let list = yield select((state)=>{
                return state.coin_market_pair_list.list
            })
            let newItem = list[payload.index]
            newItem.selected = true
            list.splice(payload.index,1,newItem)
            yield put({type: Types.MARKET_UPDATE_MARKET_LIST,list})
        } else if(payload.type == 'coinDetail'){
            let detail = yield select((state)=>{
                return state.coinDetail
            })
            let newDetail = detail
            newDetail.selected = true
            yield put({type: Types.MARKET_SET_COIN_DETAIL,res: newDetail})
        }
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* removeCollection({payload,onSuccess,onFail}){
    try{
        yield call(services.removeCollection,payload)
        if(payload.type == 'coin_market_pair'){
            let list = yield select((state)=>{
                return state.coin_market_pair_list.list
            })
            let newItem = list[payload.index]
            newItem.selected = false
            list.splice(payload.index,1,newItem)
            yield put({type: Types.MARKET_UPDATE_MARKET_LIST,list})
        } else if(payload.type == 'coinDetail'){
            let detail = yield select((state)=>{
                return state.coinDetail
            })
            let newDetail = detail
            newDetail.selected = false
            yield put({type: Types.MARKET_SET_COIN_DETAIL,res: newDetail})
        }
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}






