// import React, { Component } from 'react';
import View from './View';
import { connect } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';

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
        onLogin: (un, pwd) => dispatch(loginActions.requestLogin(un, pwd))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
