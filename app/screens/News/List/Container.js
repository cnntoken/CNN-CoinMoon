import React, {Component} from 'react';
import View from './View';
import {connect} from 'react-redux';
import * as  feedActions from 'app/actions/feedActions';
import * as userAction from "app/actions/userAction";


function mapStateToProps({feedReducer, userReducer: {info, dislikeFeed}}) {
    let attributes = info.attributes || {};
    return {
        ...feedReducer,
        userId: attributes.sub,
        dislikeFeed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getList: (...args) => {
            dispatch(feedActions.getList(...args))
        },
        feedLike: (...args) => dispatch(feedActions.feedLike(...args)),
        // 更新用户行为
        updateAction: (...args) => {
            dispatch(userAction.update(...args))
        },
        removeItem: (...args) => {
            // console.log(args);
            dispatch(feedActions.removeItem(...args));
            dispatch(userAction.dislike_feedId(...args));
        },

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
