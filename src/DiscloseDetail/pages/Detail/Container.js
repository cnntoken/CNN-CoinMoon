import React, {Component} from 'react';
import Page from './View';
import {connect} from 'react-redux';
import * as disCloseActions from "../../actions";
import discloseName from '@services/discloseName';
import {NoticeUpdateNativeList} from '@utils';
import * as Events from '@data/ListChangeEvent';

class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Page {...this.props} />;
    }
}


function mapStateToProps({user}) {
    if (user.id) {
        user.discloseName = discloseName(user.id);
    }
    return {
        user: user,
    };
}

function mapDispatchToProps(dispatch) {
    return {

        getDiscloseDetail: (...args) => {
            dispatch(disCloseActions.getDiscloseDetail(...args));
            NoticeUpdateNativeList(Events.disclose_view_count_add, ...args);
        },

        getDiscloseComments: (...args) => {
            dispatch(disCloseActions.getDiscloseComments(...args));
        },

        commentDisclose: (...args) => {

            dispatch(disCloseActions.commentDisclose(...args));

            NoticeUpdateNativeList(Events.disclose_comment_count_add, ...args);

        },


        likeComment: (...args) => {
            dispatch(disCloseActions.likeComment(...args));
        },

        cancel_likeComment: (...args) => {
            dispatch(disCloseActions.cancel_likeComment(...args));
        },


        // 点赞
        like: (...args) => {


            dispatch(disCloseActions.like(...args));

            NoticeUpdateNativeList(Events.disclose_like, ...args);


        },

        // 取消点赞
        cancel_like: (...args) => {
            dispatch(disCloseActions.cancel_like(...args));

            NoticeUpdateNativeList(Events.disclose_cancel_like, ...args);
        },

        report: (...args) => {
            dispatch(disCloseActions.report(...args))
        },

        deleteComment: (...args) => {
            dispatch(disCloseActions.deleteComment(...args));

            NoticeUpdateNativeList(Events.disclose_comment_count_minus, ...args);

        },

        deleteDisclose: (...args) => {
            dispatch(disCloseActions.deleteDisclose(...args))
        },


    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
