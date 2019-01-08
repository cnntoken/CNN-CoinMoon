import React, {Component} from 'react';
import Page from './View';
import {connect} from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";



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
        getList: (...args) => {
            dispatch(disCloseActions.getList(...args))
        },
        like: (...args) => {
            dispatch(disCloseActions.like(...args))
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
