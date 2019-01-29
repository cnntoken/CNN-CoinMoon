import React, {Component} from 'react';
import Main from './Main';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";
import * as userAction from "../../../actions/userAction";
import avatars from "../../../services/constants";
import {getNumByUserId} from "../../../utils";
import * as feedActions from "../../../actions/feedActions";


function mapStateToProps({userReducer: {info}}) {
    let attributes = info.attributes || {};
    return {
        user: {
            "id": attributes.sub,
            "name": attributes['custom:disclose_name'],
            "nickname": attributes['nickname'],
            "picture": attributes.picture,
            "avatar": avatars[getNumByUserId(attributes.sub || '0')]
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getList: (...args) => {
            dispatch(feedActions.getListByUserId(...args))
        },

        // 更新用户行为
        updateAction: (...args) => {
            dispatch(userAction.update(...args))
        },

        feedLike: (...args) => dispatch(feedActions.feedLike(...args)),

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
