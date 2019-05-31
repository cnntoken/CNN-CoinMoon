import React, {Component} from 'react';
import View from './View';
import {connect} from 'react-redux';
import {NoticeUpdateNativeList} from '@utils';
import * as Events from '@data/ListChangeEvent';

import * as feedActions from "../../actions";


class Container extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <View {...this.props} />;
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {

    return {

        getInfo: (...args) => {
            dispatch(feedActions.getDetail(...args));
            NoticeUpdateNativeList(Events.feed_view_count_add, ...args);
        },


        getCommentList: (...args) => {
            dispatch(feedActions.getCommentList(...args));
        },

        // 发送评论接口
        comment: (...args) => {
            dispatch(feedActions.comment(...args));
            NoticeUpdateNativeList(Events.feed_comment_count_add, ...args);
        },

        deleteComment: (...args) => {
            // 发送删除评论接口
            dispatch(feedActions.deleteComment(...args));
            NoticeUpdateNativeList(Events.feed_comment_count_minus, ...args);

        },


        likeComment: (...args) => {
            dispatch(feedActions.likeComment(...args));

        },

        cancel_likeComment: (...args) => {
            dispatch(feedActions.cancel_likeComment(...args))
        },



        report: (...args) => {
            // 发送举报接口
            dispatch(feedActions.report(...args));
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
