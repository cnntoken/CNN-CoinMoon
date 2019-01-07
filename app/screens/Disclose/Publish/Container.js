import React, {Component} from 'react';
import Screen from './Screen';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";

const moment = require('moment');

class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Screen {...this.props} />;
    }
}

function mapStateToProps() {
    return {
        // 具体匿名用户
        user: {
            name: '用户名'
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        publish: (...args) => {
            // console.log(args);
            dispatch(disCloseActions.publish(...args))
        },
        upload: (...args) => {
            // console.log(args);
            dispatch(disCloseActions.upload(...args))
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
