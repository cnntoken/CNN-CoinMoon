import React, {Component} from 'react';
import NotLogin from './NotLogin';
import Main from './Main';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";
import * as userAction from "../../../actions/userAction";
import avatars from "../../../services/constants";
import {getNumByUserId} from "../../../utils";
// import Page from "../../Disclose/Detail/Container";


function mapStateToProps({userReducer: {info}}) {
    let attributes = info.attributes || {};
    return {
        user: {
            "id": attributes.sub,
            "name": attributes['custom:disclose_name'],
            "nickname": attributes['nickname'],
            "picture": attributes.picture,
            "avatar": avatars[getNumByUserId(attributes.sub || '0')]
        },
        userInfo: info
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
    constructor(props) {
        super(props);
    }


    render() {
        const {user = {}} = this.props;
        if (user && user.id) {
            return <Main {...this.props}/>
        } else {
            return <NotLogin {...this.props}/>
        }
    }
}

// class Container extends Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return <Page {...this.props} />;
//     }
// }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
