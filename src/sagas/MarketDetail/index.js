import {takeEvery, all} from 'redux-saga/effects';
import * as types from '../../actions/types';
import * as marketDetailSaga from './marketDetailSaga'

export default function* watch() {
    yield all([
        // 行情
        takeEvery(types.MARKET_GET_COIN_DETAIL,marketDetailSaga.getCoinDetail),
        takeEvery(types.MARKET_GET_DISCUSS_LIST,marketDetailSaga.getDiscussList),
        
        takeEvery(types.MARKET_GET_MARKET_PAIR_LIST_BY_COINID,marketDetailSaga.getMarketPairByCoinID),
        takeEvery(types.MARKET_GET_AVG_PRICE_DATA,marketDetailSaga.getAvgPriceData),
        takeEvery(types.MARKET_LIKE_DISCUSS,marketDetailSaga.likeDiscuss),
        takeEvery(types.MARKET_CALCEL_LIKE_DISCUSS,marketDetailSaga.cancelLikeDiscuss),
        takeEvery(types.MARKET_DELETE_DISCUSS,marketDetailSaga.deleteDiscuss),
        takeEvery(types.MARKET_GET_DISCUSS_DETAIL,marketDetailSaga.getDiscussDetail),
        takeEvery(types.MARKET_DISCUSS_COIN,marketDetailSaga.discussCoin),
        takeEvery(types.MARKET_DISCUSS_REPLY,marketDetailSaga.discussReply),
        takeEvery(types.MARKET_ADD_COLLECTION,marketDetailSaga.addCollection),
        takeEvery(types.MARKET_REMOVE_COLLECTION,marketDetailSaga.removeCollection),
    ]);
}
