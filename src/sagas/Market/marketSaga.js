import {put, call, select} from 'redux-saga/effects';
import * as Types from '../../actions/types';
import * as services from '../../services/market';
import { adapterResponse } from '@utils/adapterResponse'

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
        read_tag = total && res.data.list[total-1].read_tag || ''
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
//刷新自选列表
export function* getDatabyMineID({payload, onSuccess, onFail}) {
    try{
        let IDObj = yield select((state) => {
            return {
                mineList: state.mine.list,
                not_pairID: state.not_pairID
            }
        })
        // const resPair = yield getRemoteRes(IDObj.mineList)
        // const resPairObj = resPair.map((item)=>{return {[item.id]:item}})
        const resNotPair = yield call(services.getDatabyMineID,IDObj.not_pairID)
        yield put({type: Types.MARKET_UPDATE_MINE_DATA,data: {...resNotPair}})
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail()
        console.log(e)
    }
}
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
        onSuccess && onSuccess()
        let list = yield select((state)=>{
            return state.discussList.list
        })
        list.splice(payload.index,1)
        yield put({type: Types.MARKET_SET_DISCUSS_LIST,list:list})
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
        yield call(services.discussCoin,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
//回复某条讨论
export function* discussReply({payload, onSuccess, onFail}) {
    try{
        yield call(services.discussReply,payload)
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
        onSuccess && onSuccess()
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
        //TODO 判断返回状态
        const res = yield call(services.addCollection,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}
export function* removeCollection({payload,onSuccess,onFail}){
    try{
        //TODO 判断返回状态
        console.log('?????????????',payload);

        const res = yield call(services.removeCollection,payload)
        onSuccess && onSuccess()
    }catch(e){
        onFail && onFail(e)
        console.log(e)
    }
}





