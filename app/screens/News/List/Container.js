import React, { Component } from 'react';
import View from './View';
import { connect } from 'react-redux';
import * as  feedActions from 'app/actions/feedActions';

function mapStateToProps({feedReducer}) {
    console.log('feedReducer',feedReducer)
    return {...feedReducer};
}
function mapDispatchToProps(dispatch) {
    return {
        getList: (...args)=>dispatch(feedActions.getList(...args))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
