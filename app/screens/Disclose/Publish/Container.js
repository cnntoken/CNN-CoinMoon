import React, {Component} from 'react';
import Screen from './Screen';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";
import avatars from "../../../services/constants";
import {getNumByUserId} from "../../../utils";

const moment = require('moment');

class Container extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Screen {...this.props} />;
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
            "avatar": avatars[getNumByUserId(attributes.sub || '0')]
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        publish: (...args) => {
            console.log(args);
            dispatch(disCloseActions.publish(...args))
        },
        upload: (...args) => {
            console.log(args);
            dispatch(disCloseActions.upload(...args))
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
