import * as types from './types';

export const getRankList = (payload, onSuccess, onFail) => {
    return {
        type: types.MARKET_GET_RANKLIST,
        payload,
        onSuccess,
        onFail
    }
}
export const sortRankList = (payload, onSuccess, onFail) => {
    return {
        type: types.MARKET_SORT_RANKLIST,
        payload,
        onSuccess,
        onFail
    }
}
export const getList = (payload, onSuccess, onFail) => {
    return {
        type: types.MARKET_GET_LIST,
        payload,
        onSuccess,
        onFail
    };
};
export const getDataByPairKey = (payload, onSuccess, onFail) => {
    return {
        type: types.MARKET_GET_LIST_BY_PAIR_KEY,
        payload,
        onSuccess,
        onFail
    }
}
export const sortList = (payload, onSuccess, onFail) => {
    return {
        type: types.MARKET_SORT_LIST,
        payload,
        onSuccess,
        onFail
    }
}
export const searchCoin = (payload, onSuccess, onFail) => {
    return {
        type: types.MARKET_SEARCH_COIN,
        payload,
        onSuccess,
        onFail
    }
}
export const initSearchList = (payload, onSuccess, onFail) => {
    return {
        type: types.MARKET_INIT_SEARCH_LIST,
        onSuccess,
        onFail
    }
}
// export const getMarketPairList = (payload, onSuccess, onFail) => {
//     return {
//         type: types.MARKET_GET_MARKET_PAIR_LIST_BY_COINID,
//         payload,
//         onSuccess,
//         onFail
//     }
// }
// export const getDiscussDetail = (payload, onSuccess, onFail) => {
//     return {
//         type: types.MARKET_GET_DISCUSS_DETAIL,
//         payload,
//         onSuccess,
//         onFail
//     }
// }
// export const likeDiscuss = (payload,onSuccess,onFail) => {
//     return {
//         type: types.MARKET_LIKE_DISCUSS,
//         payload,
//         onSuccess,
//         onFail
//     }
// }
// export const cancleLikeDiscuss = (payload,onSuccess,onFail) => {
//     return {
//         type: types.MARKET_CALCEL_LIKE_DISCUSS,
//         payload,
//         onSuccess,
//         onFail
//     }
// }
// export const deleteDiscuss = (payload,onSuccess,onFail) => {
//     return {
//         type: types.MARKET_DELETE_DISCUSS,
//         payload,
//         onSuccess,
//         onFail
//     }
// }
// export const discussCoin = (payload,onSuccess,onFail) => {
//     return {
//         type: types.MARKET_DISCUSS_COIN,
//         payload,
//         onSuccess,
//         onFail
//     }
// }
// export const discussReply = (payload,onSuccess,onFail) => {
//     return{
//         type: types.MARKET_DISCUSS_REPLY,
//         payload,
//         onSuccess,
//         onFail
//     }
// }
export const addCollection = (payload,onSuccess,onFail) => {
    return {
        type: types.MARKET_ADD_COLLECTION,
        payload,
        onSuccess,
        onFail
    }
}

export const removeCollection = (payload,onSuccess,onFail) => {
    return {
        type: types.MARKET_REMOVE_COLLECTION,
        payload,
        onSuccess,
        onFail
    }
}

