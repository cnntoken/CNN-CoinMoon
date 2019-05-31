import View from './View';
import {connect} from 'react-redux';
import * as actions from "../../actions";
import {Component} from "react";
import React from "react";
import NotLogin from "@components/NotLogin";

function mapStateToProps({user}) {
    return {
        user: user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserInfo: (...args) => {
            dispatch(actions.updateUserInfo(...args))
        }
    };
}


class Container extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {user = {}} = this.props;
        // 设备用户展示没有登录
        if (user && user.isLogin) {
            return <View {...this.props}/>
        } else {
            return <NotLogin {...this.props}/>
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
