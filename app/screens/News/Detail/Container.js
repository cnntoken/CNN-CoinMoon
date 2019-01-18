import React, { Component } from 'react';
import View from './View';
import { connect } from 'react-redux';
import {getDetail, getCommentList, comment, like, likeComment,deleteComment} from 'app/actions/feedActions';
import * as userAction from "app/actions/userAction";

class Container extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <View {...this.props} />;
    }
}

function mapStateToProps({userReducer:{info}}) {
    return {userInfo:info};
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
        likeComment: (...args) => {

            dispatch(likeComment(...args))
            
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
