import React, {Component} from 'react';
import Page from './View';
import {connect} from 'react-redux';
import * as disCloseActions from "app/actions/disCloseActions";
import * as userAction from "app/actions/userAction";
import avatars from "app/services/constants";
import {getNumByUserId} from "app/utils";

// const moment = require('moment');


class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Page {...this.props} />;
    }
}


function mapStateToProps({userReducer: {info}}) {
    let attributes = info.attributes || {};
    return {
        user: {
            "id": attributes.sub,
            "name": attributes['custom:disclose_name'],
            "nickname": attributes['nickname'],
            "picture": attributes.picture,
            "avatar": avatars[getNumByUserId(attributes.sub || '0') % 5]
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDiscloseDetail: (...args) => {
            console.log(args);
            dispatch(disCloseActions.getDiscloseDetail(...args))
        },
        getDiscloseComments: (...args) => {
            dispatch(disCloseActions.getDiscloseComments(...args))
        },
        commentDisclose: (...args) => {
            dispatch(disCloseActions.commentDisclose(...args))
        },
        likeComment: (...args) => {
            dispatch(disCloseActions.likeComment(...args))
        },
        like: (...args) => {
            dispatch(disCloseActions.like(...args))
        },
        deleteComment: (...args) => {
            dispatch(disCloseActions.deleteComment(...args))
        },
        deleteDisclose: (...args) => {
            dispatch(disCloseActions.deleteDisclose(...args))
        },
        // 查询用户行为
        getActions: (...args) => {
            dispatch(userAction.getActions(...args));
        },
        // 更新用户行为
        updateAction: (...args) => {
            dispatch(userAction.update(...args))
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
