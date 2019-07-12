import View from './View';
import {connect} from 'react-redux';
import * as marketDiscussDetailActions from '../actions/discussDetailAction'


function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getDiscussDetail: (...args) => {
            dispatch(marketDiscussDetailActions.getDiscussDetail(...args))
        },
        likeDiscuss: (...args) => {
            dispatch(marketDiscussDetailActions.likeDiscuss(...args))
        },
        cancleLikeDiscuss: (...args) => {
            dispatch(marketDiscussDetailActions.cancleLikeDiscuss(...args))
        },
        discussReply: (...args) => {
            dispatch(marketDiscussDetailActions.discussReply(...args))
        },
        initDiscussDetail: (...args) => {
            dispatch(marketDiscussDetailActions.initDiscussDetail(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
