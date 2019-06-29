import View from './View';
import {connect} from 'react-redux';
import * as  actions from '../../actions';
import {Component} from "react";
import React from "react";
import hocUserStateChange from "@src/components/HocUserStateChange";

function mapStateToProps(state, props) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: (...args) => dispatch(actions.logout(...args))
    };
}

class Container extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {user = {}} = this.props;
        return <View {...this.props}/>
        // 设备用户展示没有登录
        // if (user && user.isLogin) {
        //     return <View {...this.props}/>
        // } else {
        //     return <NotLogin {...this.props}/>
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(hocUserStateChange(Container));
