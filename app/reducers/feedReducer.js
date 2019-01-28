/* User Reducer
 * app 用户信息中心
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';

const initialState = {};

export const feedReducer = createReducer(initialState, {
    [types.FEED_SET_LIST](state, {category, list, hasMore}) {
        state[category] = list;
        state[`${category}_hasMore`] = hasMore;
        return {...state};
    },
    [types.FEED_APPEND_LIST](state, {list, category, hasMore}) {
        const oldlist = state[category] || [];
        state[category] = [...oldlist, ...list];
        state[`${category}_hasMore`] = hasMore;
        return {...state};
    },
    [types.FEED_PREPEND_LIST](state, {list, category, hasMore}) {
        // const oldlist = state[category] || [];
        // state[category] = [...list,...oldlist];
        state[category] = list;
        state[`${category}_hasMore`] = hasMore;
        return {...state};
    },
    [types.FEED_REFRESH_LIST](state, {category}) {
        state[category] = [];
        state[`${category}_hasMore`] = true;
        return {...state};
    },

    [types.FEED_LIST_LIKE](state, payload) {
        const {category, params, updateUserActionId, asyncList} = payload.payload;
        state[category].forEach((item) => {
            if (item._id === params._id) {
                // 先在界面上更改点赞行为
                if (updateUserActionId) {
                    item.userAction._id = params.userAction._id;
                } else if (asyncList) {
                    item.userAction = params.userAction;
                    item.likeNum = params.likeNum
                } else {
                    let actionValue = item.userAction.actionValue;
                    item.userAction.actionValue = !actionValue;
                    item.likeNum = !actionValue ? Number(item.likeNum) + 1 : Number(item.likeNum) - 1;
                }
            }
        });
        state[category] = [...state[category]];
        return {...state};
    },

});
