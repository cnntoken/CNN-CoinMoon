/* Market Reducer
 */
import createReducer from '@lib/createReducer';
import * as types from '../actions/types';

export const initialState ={
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
    coinDetail: null
};

export const createMarketDetailReducer = createReducer(initialState, {

    // 更新list
    [types.MARKET_UPDATE_MARKET_LIST](state,{list}){
        state.coin_market_pair_list = {
            ...state.coin_market_pair_list,
            list
        }
        return {...state}
    },
    //coin 详情
    [types.MARKET_SET_COIN_DETAIL](state=initialState,{res}){
        let coinDetail = res
        return {...state,coinDetail}
    },
    // 添加自选
    [types.MARKET_ADD_ID](state=initialState, {list, category}) {
        state[category] = list;
        return {...state};
    },

    // 取消自选
    [types.MARKET_REMOVE_ID](state=initialState, {list, category}) {
        state[category] = list;
        return {...state};
    },

    // 讨论列表
    [types.MARKET_SET_DISCUSS_LIST](state=initialState, {list,read_tag=''}) {
        let discussList = {
            list,
            read_tag
        }
        return {...state,discussList}
    },
    // append discuss list
    [types.MAARKET_APPEND_DISCUSS_LIST](state=initialState,{list,read_tag=''}){
        let discussList = {
            list: [
                ...state.discussList.list,
                ...list
            ],
            read_tag
        }
        return {...state,discussList}
    },
    //讨论详情
    [types.MARKET_SET_DISCUSS_DETAIL](state=initialState,{discuss_id,info}){
        let discussDetail = {
            discuss_id,
            info
        }
        return {...state,discussDetail}
    },
    //更新讨论列表
    [types.MARKET_UPDATE_DISCUSS_LIST](state=initialState,{payload:{list}}){
        let discussList = {
            list,
            read_tag: state.discussList.read_tag
        }
        return {...state,discussList}
    },
    [types.MARKET_SET_MARKET_PAIR_LIST_BY_COINID](state=initialState,{list,read_tag}){
        let coin_market_pair_list = {
            list,
            read_tag
        }
        return {...state,coin_market_pair_list}
    },
    [types.MARKET_APPEND_MARKET_PAIR_LIST_BY_COINID](state=initialState,{list,read_tag}){
        let coin_market_pair_list = {
            ...state.coin_market_pair_list,
            list: [
                ...state.coin_market_pair_list.list,
                ...list
            ],
            read_tag,
        }
        return {...state,coin_market_pair_list}   
    },
    // [types.MARKET_SET_AVG_PRICE_DATA](state,{id,data}){
    //     state.avgPrice = {
    //         id,
    //         data
    //     }
    //     return {...state}
    // }
});
