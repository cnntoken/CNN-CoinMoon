/**
 *  Redux saga class init
 */
import {takeEvery, all} from 'redux-saga/effects';
import * as types from '../../actions/types';
import * as marketDiscussDetailSaga from './marketDiscussDetailSaga'

export default function* watch() {
    yield all([
        // 讨论
        // takeEvery(types.MARKET_GET_DISCUSS_LIST,marketDiscussDetailSaga.getDiscussList),
        takeEvery(types.MARKET_LIKE_DISCUSS,marketDiscussDetailSaga.likeDiscuss),
        takeEvery(types.MARKET_CALCEL_LIKE_DISCUSS,marketDiscussDetailSaga.cancelLikeDiscuss),
        // takeEvery(types.MARKET_DELETE_DISCUSS,marketDiscussDetailSaga.deleteDiscuss),
        takeEvery(types.MARKET_GET_DISCUSS_DETAIL,marketDiscussDetailSaga.getDiscussDetail),
        // takeEvery(types.MARKET_DISCUSS_COIN,marketDiscussDetailSaga.discussCoin),
        takeEvery(types.MARKET_DISCUSS_REPLY,marketDiscussDetailSaga.discussReply),
    ]);
}
