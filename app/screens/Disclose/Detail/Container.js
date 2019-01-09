import React, {Component} from 'react';
import Page from './View';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";

const moment = require('moment');


class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Page {...this.props} />;
    }
}

function mapStateToProps() {
    return {
        user: {
            "id": "3ecd2ff0-f731-4faf-be97-f5e76abf69e7",
            "name": 'liguwe',
            "icon": ''
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDiscloseDetail: (...args) => {
            console.log(args);
            dispatch(disCloseActions.getDiscloseDetail(...args))
        },
        getDiscloseComments: (...args) => {
            dispatch(disCloseActions.getDiscloseComments(...args))
        },
        commentDisclose: (...args) => {
            dispatch(disCloseActions.commentDisclose(...args))
        },
        likeComment: (...args) => {
            dispatch(disCloseActions.likeComment(...args))
        },
        like: (...args) => {
            dispatch(disCloseActions.like(...args))
        },
        deleteComment: (...args) => {
            dispatch(disCloseActions.deleteComment(...args))
        },
        deleteDisclose: (...args) => {
            dispatch(disCloseActions.deleteDisclose(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
