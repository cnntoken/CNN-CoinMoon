import React, {Component} from 'react';
import Main from './Main';
import {connect} from 'react-redux';
import * as feedActions from "../../actions";

import {NoticeUpdateNativeList} from '@utils';
import * as Events from '@data/ListChangeEvent';

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {

        getList: (...args) => {
            dispatch(feedActions.getListByUserId(...args));
        },

        // 点赞
        like_feed: (...args) => {
            dispatch(feedActions.like(...args));
            NoticeUpdateNativeList(Events.feed_like, ...args);

        },

        // 取消点赞
        cancel_like_Feed: (...args) => {
            dispatch(feedActions.cancel_like_Feed(...args));
            NoticeUpdateNativeList(Events.feed_cancel_like, ...args);
        },
    };
}

class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Main {...this.props}/>;
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
