import React, {Component} from 'react';
import Screen from './Screen';
import {connect} from 'react-redux';
import * as disCloseActions from "../../actions";
import i18n from "@i18n";
import avatars from "@services/constants";
import {getNumByUserId, NoticeUpdateNativeList} from "@utils";
import * as Events from "@src/data/ListChangeEvent";
import {closeRNPage} from "@src/utils/CNNBridge";

class Container extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Screen {...this.props} />;
    }
}

function mapStateToProps({user}) {
    if(user.id){
        let avatarType = getNumByUserId(user.user_id);

        user.discloseAnonymous = i18n.t('disclose.anonymous');
        user.disclose_avatar = avatars[avatarType % 5];
    }
    return {
        user: user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        publish: (...args) => {
            dispatch(disCloseActions.publish(...args));
            closeRNPage();
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
