import React, {Component} from 'react';
import NotLogin from './NotLogin';
import Main from './Main';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";
import * as userAction from "../../../actions/userAction";

function mapStateToProps({userReducer: {info}}) {
    return {
        userInfo: info,
        user: {
            "id": info.attributes.sub,
            "name": info.attributes['custom:disclose_name'],
            "icon": info.attributes.picture
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getList: (...args) => {
            dispatch(disCloseActions.getListByUserId(...args))
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

class Container extends Component {
    // static navigationOptions = ({ navigation })=>{
    //     console.log(`Container Component`)
    //     console.log(navigation)
    //     return {
    //         tabBarLabel: Math.random() + 'fjafi'
    //     }
    // }
    render() {
        const {userInfo} = this.props;
        if (userInfo.attributes && userInfo.attributes.sub) {
            return <Main {...this.props}/>
        } else {
            return <NotLogin {...this.props}/>
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
