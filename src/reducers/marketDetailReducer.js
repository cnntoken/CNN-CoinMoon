/* Market Reducer
 */
import createReducer from '@lib/createReducer';
import * as types from '../actions/types';

export const initialState ={
    // 自选列表
    mine: {
        list: null,
    },
    // 我的自选ID集合
    mineID: [],
    // 所有币种
    all: {
        list: null,
        sort_by: '-market_cap',
    },
    // 搜索列表数据
    search: {
        list: [],
        read_tag: ''
    },
    discussList: {
        list: null,
        read_tag: ''
    },
    discussDetail:{
        discuss_id: '',
        info:{},
    },
    coin_market_pair_list:{
        list:null,
        read_tag: ''
    },
    // coin详情
    coinDetail: {}
};

export const createMarketReducer = createReducer(initialState, {

    // set list
    [types.MARKET_SET_LIST](state, {category, list, read_tag='',sort_by}) {
        state[category] = {
            ...state[category],
            list: list,
            read_tag,
        };
        if(category === 'all'){
            state[category].sort_by = sort_by
        } else if(category === 'mine'){
            let new_mineID = [], new_is_pairID = [], new_not_pairID = []
            list.forEach((item)=>{
                new_mineID.push(item.id)
                if(item.is_pair){
                    new_is_pairID.push(item.id)
                } else {
                    new_not_pairID.push(item.id)
                }
            })
            state.mineID = new_mineID
            state.is_pairID = new_is_pairID
            state.not_pairID = new_not_pairID
        }
        return {...state};
    },
    // 刷新自选列表数据
    [types.MARKET_UPDATE_MINE_DATA](state,{data}){
        if(!Array.isArray(state.mine.list)) return {...state}
        let newList = []
        state.mine.list.forEach((item)=>{
            if(item.is_pair && data[item.id]){
                item.CNNOWN_price_USD = data[item.id].price_USD
                item.CNNOWN_price_KRW = data[item.id].price_KRW
                item.CNNOWN_change = data[item.id].change
            } else if(!item.is_pair&&data[item.id]){
                item.price_USD = data[item.id].price_USD
                item.price_KRW = data[item.id].price_KRW
                item.change = data[item.id].change
            }
            newList.push(item)
        })        
        state.mine = {
            ...state.mine,
            list: newList
        }
        return {...state}
    },
    // append list
    [types.MARKET_APPEND_LIST](state,{category,list,read_tag='',}){
        state[category] = {
            ...state[category],
            list: [
                ...state[category].list,
                ...list
            ],
            read_tag,
        }
        return {...state}
    },
    [types.MARKET_INIT_SEARCH_LIST](state){
        state.search = {
            list: [],
            read_tag: ''
        }
        return {...state}
    },
    //coin 详情
    [types.MARKET_SET_COIN_DETAIL](state,{res}){
        state.coinDetail = res
        return {...state}
    },
    // 添加自选
    [types.MARKET_ADD_ID](state, {list, category}) {
        state[category] = list;
        return {...state};
    },

    // 取消自选
    [types.MARKET_REMOVE_ID](state, {list, category}) {
        state[category] = list;
        return {...state};
    },

    // 讨论列表
    [types.MARKET_SET_DISCUSS_LIST](state, {list,read_tag}) {
        state.discussList = {
            list,
            read_tag
        }
        return {...state}
    },
    // append discuss list
    [types.MAARKET_APPEND_DISCUSS_LIST](state,{list,read_tag=''}){
        state.discussList = {
            list: [
                ...state.discussList.list,
                ...list
            ],
            read_tag
        }
        return {...state}
    },
    //讨论详情
    [types.MARKET_SET_DISCUSS_DETAIL](state,{discuss_id,info}){
        state.discussDetail = {
            discuss_id,
            info
        }
        return {...state}
    },
    //初始化讨论详情
    [types.MARKET_INIT_DISCUSS_DETAIL](state){
        state.discussDetail={
            discuss_id: '',
            info: {}
        }
        return {...state}
    },
    [types.MARKET_SET_MARKET_PAIR_LIST_BY_COINID](state,{list,read_tag}){
        state.coin_market_pair_list = {
            list,
            read_tag
        }
        return {...state}
    },
    [types.MARKET_APPEND_MARKET_PAIR_LIST_BY_COINID](state,{list,read_tag}){
        state.coin_market_pair_list = {
            ...state.coin_market_pair_list,
            list: [
                ...state.coin_market_pair_list.list,
                ...list
            ],
            read_tag,
        }
        return {...state}   
    },
    [types.MARKET_SET_AVG_PRICE_DATA](state,{id,data}){
        state.avgPrice = {
            id,
            data
        }
        return {...state}
    }
});
