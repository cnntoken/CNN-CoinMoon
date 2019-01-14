/* User Reducer
 * app 用户信息中心
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';

const initialState = {};

export const feedReducer = createReducer(initialState, {
    [types.FEED_SET_LIST](state, {category,list}) {
        state[category] = list;
        return {...state};
     },
    [types.FEED_APPEND_LIST](state, {list,category}) {
       const oldlist = state[category] || [];
       state[category] = [...oldlist,...list];
       return {...state};
    },
    [types.FEED_PREPEND_LIST](state, {list,category}) {
        // const oldlist = state[category] || [];
        // state[category] = [...list,...oldlist];
        state[category] = list;
        return {...state};
     },
    [types.FEED_REFRESH_LIST](state, {category}) {
        state[category] = [];
        return {...state};
     }
});
