/* User Reducer
 * app 用户信息中心
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';

const initialState = {
    info: {}
};

export const userReducer = createReducer(initialState, {
    [types.SET_USER_INFO](state, action) {
        return {...state, ...{info: action.info}}
    },
    [types.CLEAR_USER_INFO]() {
        return {info: {}}
    }
});
