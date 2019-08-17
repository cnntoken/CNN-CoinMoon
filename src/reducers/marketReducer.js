/* Market Reducer
 */
import createReducer from '@lib/createReducer';
import * as types from '../actions/types';

export const initialState ={
    // 自选列表
    mine: {
        list: [],
        page: 1
    },
    // 我的自选ID集合
    mineID: [],
    not_pairID: [],
    is_pairID: [],
    // 所有币种
    all: {
        list: [],
        page: 1,
        sort_key: '-cap',
        no_more: false
    },
    // 搜索列表数据
    search: {
        list: [],
        read_tag: '',
        page: 0
    },
};

export const createMarketReducer = createReducer(initialState, {

    // set rank list
    [types.MARKET_SET_RANKLIST](state=initialState,{list,page,sort_key,no_more}){
        let all = {
            list,
            page,
            sort_key,
            no_more
        }
        state.all = all
        return {...state}
    },

    // set list
    [types.MARKET_SET_LIST](state=initialState, { list,no_more,page }) {
        let mine = {
            list,
            no_more,
            page
        }
        state.mine = mine
        return {...state}
    },
    // 刷新自选列表数据
    [types.MARKET_UPDATE_MINE_DATA](state=initialState,{data}){
        if(!Array.isArray(state.mine.list)) return {...state}
        let newList = []
        state.mine.list.forEach((item)=>{
            let pair_key = `${item.exchange}/${item.fcoin}/${item.tcoin}`
            let new_item = {}
            if(pair_key && data[pair_key]){
                new_item = {...item,...data[pair_key]}
            } else {
                new_item = item
            }
            newList.push(new_item)
        })        
        return {...state,mine:{
            ...state.mine,
            list: newList
        }}
    },
    // append list
    [types.MARKET_APPEND_LIST](state=initialState,{category,list,read_tag='',no_more}){
        let categoryObj = {
            [category]:{
                ...state[category],
                list:[
                    ...state[category].list,
                    ...list
                ],
                no_more
            }
        }
        let mineObj = {}
        if(list.length&&read_tag){
            categoryObj[category].read_tag = read_tag
        }
        if(category === 'mine'){
            let new_mineID = [], new_is_pairID = [], new_not_pairID = []
            list.forEach((item)=>{
                new_mineID.push(item.id)
                if(item.is_pair){
                    new_is_pairID.push(item.id)
                } else {
                    new_not_pairID.push(item.id)
                }
            })
            mineObj.mineID = [...state.mineID,...new_mineID]
            mineObj.is_pairID = [...state.is_pairID,...new_is_pairID]
            mineObj.not_pairID = [...state.not_pairID,...new_not_pairID]
        }
        return {...state,...categoryObj,...mineObj}
    },
    [types.MARKET_SET_SEARCH_LIST](state=initialState,{list,read_tag,no_more,page}){
        // let newSearch = Object.assign({},list,read_tag,no_more,page)
        // newSearch.no_search_res = list.length === 0
        state.search = {
            list,
            read_tag,
            no_more,
            page,
            no_search_res: list.length === 0
        }
        return {...state}
    },
    [types.MARKET_APPEND_SEARCH_LIST](state=initialState,{list,read_tag,no_more,page}){
        state.search = {
            list: [
                ...state.search.list,
                ...list
            ],
            read_tag,
            no_more,
            page,
        }
        return {...state}
    },
    [types.MARKET_INIT_SEARCH_LIST](state=initialState){
        state.search = {
            list: [],
            read_tag: '',
            no_search_res: false
        };
        return {...state}
    },
    // 更新list
    [types.MARKET_UPDATE_MARKET_LIST](state=initialState,{cate,list}){
        let cateObj = {}
        cateObj[cate] = {
            ...state[cate],
            list
        }
        return {...state,...cateObj}
    },
    // 添加自选
    [types.MARKET_ADD_ID](state=initialState, {list, category}) {
        state[category] = list;
        let listObj = {
            [category]: list
        }
        return {...state,...listObj};
    },

    // 取消自选
    [types.MARKET_REMOVE_ID](state, {list, category}) {
        state[category] = list;
        let listObj = {
            [category]: list
        }
        return {...state,...listObj};
    },
});
