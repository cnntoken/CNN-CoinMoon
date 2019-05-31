/* User Reducer
 * app 用户信息中心
 */
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import discloseName from '../services/discloseName';

const initialState = {
    info: {},
    // 客户端被用户点击不感兴趣的feed
    dislikeFeed: {},
    dislikeFeedUser: {},
    // 客户端被用户点击不感兴趣的爆料
    dislikeDiscloseList: [],
    dislikeUserList: []
};

export default createReducer(initialState, {

    [types.SET_USER_INFO](state, action) {
        try {

            // 为了适配之前的数据格式
            action.info.picture = action.info.avatar;
            action.info.id = action.info.user_id;
            if(!action.info.name){
                action.info.name = discloseName(action.info.user_id);
            }
            action.info.nickname = action.info.name;
            action.info.isLogin = action.info.account_type === "sms";
            action.info.icon = action.info.avatar ? {uri: action.info.avatar} : require('../images/avatar_default.png');

        } catch (e) {
            console.log(e);
        }
        return {...state, ...{info: action.info}};
    },

});
