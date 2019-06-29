import React, {Component} from 'react';
import NotLogin from '@components/NotLogin';
import Mine from '@components/Mine';
import {connect} from 'react-redux';
import {adaptUserInfo, cloneByJson} from '@utils';

import {
    DeviceEventEmitter
} from 'react-native';
import hocUserStateChange from "@src/components/HocUserStateChange";
// import View from "react-native";


function mapStateToProps({user}) {
    return {
        user: user,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    componentDidMount() {

        this.observer = DeviceEventEmitter.addListener('userStateChange', (e) => {
            this.setState({
                user: adaptUserInfo({...cloneByJson(e)})
            });
        })

    }

    componentWillUnmount() {
        this.observer.remove();
    }


    render() {
        let {user = {}} = this.state;
        // 设备用户展示没有登录
        if (user && user.isLogin) {
            return <Mine user={user}/>
        } else {
            return <NotLogin {...this.props}/>
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(hocUserStateChange(Container));
