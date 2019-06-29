import View from './View';
import {connect} from 'react-redux';

import * as marketDetailActions from '../../actions/marketDetailAction'

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        getCoinDetail: (...args) => {
            dispatch(marketDetailActions.getCoinDetail(...args))
        },
        getDiscussList: (...args) => {
            dispatch(marketDetailActions.getDiscussList(...args))
        },
        getMarketPairList: (...args) => {
            dispatch(marketDetailActions.getMarketPairList(...args))
        },
        getAvgPriceData: (...args) => {
            dispatch(marketDetailActions.getAvgPriceData(...args))
        },
        likeDiscuss: (...args) => {
            dispatch(marketDetailActions.likeDiscuss(...args))
        },
        cancleLikeDiscuss: (...args) => {
            dispatch(marketDetailActions.cancleLikeDiscuss(...args))
        },
        deleteDiscuss: (...args) => {
            dispatch(marketDetailActions.deleteDiscuss(...args))
        },
        discussCoin: (...args) => {
            dispatch(marketDetailActions.discussCoin(...args))
        },
        discussReply: (...args) => {
            dispatch(marketDetailActions.discussReply(...args))
        },
        addCollection: (...args) => {
            dispatch(marketDetailActions.addCollection(...args))
        },
        removeCollection: (...args) => {
            dispatch(marketDetailActions.removeCollection(...args))
        },
        updateDiscussList: (...args) => {
            dispatch(marketDetailActions.updateDiscussList(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
