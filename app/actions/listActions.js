/*
 * Reducer actions related with login
 */
import * as types from './types';

export function getList(page, total) {
    return {
        type: types.GET_LIST,
        page,
        total
    };
}

export function onGetOK(data) {
    return {
        type: types.GET_LIST_OK,
        data:data
    };
}

// export function onLoginResponse(response) {
//     return {
//         type: types.LOGIN_RESPONSE,
//         response
//     };
// }
//
// export function enableLoader() {
//     return {
//         type: types.LOGIN_ENABLE_LOADER
//     };
// }
//
// export function disableLoader() {
//     return {
//         type: types.LOGIN_DISABLE_LOADER
//     };
// }
