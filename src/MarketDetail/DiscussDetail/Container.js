import View from './View';
import {connect} from 'react-redux';
import * as marketDetailActions from '../../actions/marketDetailAction'


function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getDiscussDetail: (...args) => {
            dispatch(marketDetailActions.getDiscussDetail(...args))
        },
        likeDiscuss: (...args) => {
            dispatch(marketDetailActions.likeDiscuss(...args))
        },
        cancleLikeDiscuss: (...args) => {
            dispatch(marketDetailActions.cancleLikeDiscuss(...args))
        },
        discussReply: (...args) => {
            dispatch(marketDetailActions.discussReply(...args))
        },
        initDiscussDetail: (...args) => {
            dispatch(marketDetailActions.initDiscussDetail(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
