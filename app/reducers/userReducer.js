/* User Reducer
 * app 用户信息中心
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';

const initialState = {
    info: {},

    // 客户端被用户点击不感兴趣的爆料
    dislikeDiscloseList: [],
};

export const userReducer = createReducer(initialState, {
    [types.SET_USER_INFO](state, action) {
        return {...state, ...{info: action.info}}
    },
    [types.CLEAR_USER_INFO]() {
        return {info: {}}
    },

    // 添加不感兴趣的discloseID
    [types.APPEND_DISLIKE_DISCLOSEID](state, {payload: {item}}) {
        state["dislikeDiscloseList"] = [...state["dislikeDiscloseList"], item._id];
        return {...state};
    },
});
