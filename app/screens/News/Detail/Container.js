import React, {Component} from 'react';
import View from './View';
import {connect} from 'react-redux';
import {getDetail, getCommentList, comment, like, likeComment, deleteComment} from 'app/actions/feedActions';
import * as userAction from "app/actions/userAction";
import * as feedActions from "../../../actions/feedActions";
import avatars from "../../../services/constants";
import {getNumByUserId} from "../../../utils";


class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View {...this.props} />;
    }
}

function mapStateToProps({userReducer: {info}}) {
    let attributes = info.attributes || {};
    return {
        userInfo: info,
        user: {
            "id": attributes.sub,
            "icon": attributes.picture ? {uri: attributes.picture} : require('app/images/avatar_default.png'),
            "name": attributes['custom:disclose_name'],
            "nickname": attributes['nickname'],
            "picture": attributes.picture,
        }
    };
}

function mapDispatchToProps(dispatch) {

    return {

        getInfo: (...args) => dispatch(getDetail(...args)),
        getCommentList: (...args) => dispatch(getCommentList(...args)),
        comment: (...args) => dispatch(comment(...args)),
        deleteComment: (...args) => dispatch(deleteComment(...args)),


        // 查询用户行为
        getActions: (...args) => {
            dispatch(userAction.getActions(...args));
        },
        // 更新用户行为
        updateAction: (...args) => {
            dispatch(userAction.update(...args))
        },

        like: (...args) => {
            dispatch(like(...args))
        },

        feedLike: (...args) => dispatch(feedActions.feedLike(...args)),
        feedItemChange: (...args) => dispatch(feedActions.feedItemChange(...args)),

        likeComment: (...args) => {
            dispatch(likeComment(...args))
        },

        report: (...args) => {
            dispatch(userAction.report(...args))
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
