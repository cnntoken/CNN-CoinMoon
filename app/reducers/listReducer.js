/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    datas: []
};

export const listReducer = createReducer(initialState, {

    [types.GET_LIST_OK](state, action) {
        console.log(action.data);
        return {
            ...state,
            datas: action.data
            // username: action.username,
            // password: action.password
        };
    }

});
