/**
 *  Redux saga class init
 */
import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import * as types from '../../actions/types';
import * as marketSaga from './marketSaga'

export default function* watch() {
    yield all([
        // 行情
        takeEvery(types.MARKET_GET_COIN_DETAIL,marketSaga.getCoinDetail),
        takeEvery(types.MARKET_GET_LIST,marketSaga.getList),
        takeEvery(types.MARKET_GET_LIST_BY_MINE_ID,marketSaga.getDatabyMineID),
        takeEvery(types.MARKET_GET_DISCUSS_LIST,marketSaga.getDiscussList),
        takeEvery(types.MARKET_GET_MARKET_PAIR_LIST_BY_COINID,marketSaga.getMarketPairByCoinID),
        takeEvery(types.MARKET_GET_AVG_PRICE_DATA,marketSaga.getAvgPriceData),
        takeEvery(types.MARKET_LIKE_DISCUSS,marketSaga.likeDiscuss),
        takeEvery(types.MARKET_CALCEL_LIKE_DISCUSS,marketSaga.cancelLikeDiscuss),
        takeEvery(types.MARKET_DELETE_DISCUSS,marketSaga.deleteDiscuss),
        takeEvery(types.MARKET_GET_DISCUSS_DETAIL,marketSaga.getDiscussDetail),
        takeEvery(types.MARKET_DISCUSS_COIN,marketSaga.discussCoin),
        takeEvery(types.MARKET_DISCUSS_REPLY,marketSaga.discussReply),
        takeEvery(types.MARKET_ADD_COLLECTION,marketSaga.addCollection),
        takeEvery(types.MARKET_REMOVE_COLLECTION,marketSaga.removeCollection),
    ]);
}
