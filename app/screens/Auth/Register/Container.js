// import React, { Component } from 'react';
import View from './View';
import { connect } from 'react-redux';
import * as  authActions from 'app/actions/authActions';

// class Container extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return <View {...this.props} />;
//     }
// }

function mapStateToProps() {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onRegister: (...args) => dispatch(authActions.register(...args))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
