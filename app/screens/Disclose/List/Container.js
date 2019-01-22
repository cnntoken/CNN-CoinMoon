import React, {Component} from 'react';
import Page from './View';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";
import * as userAction from "../../../actions/userAction";


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
            "icon": attributes.picture
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getList: (...args) => {
            dispatch(disCloseActions.getList(...args))
        },
        like: (...args) => {
            dispatch(disCloseActions.like(...args))
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
