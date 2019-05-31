import View from './View';
import {connect} from 'react-redux';
import * as  authActions from '../actions/authActions';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: (...args) => {
            dispatch(authActions.loginOrReg(...args))
        },

        seedSMS: (...args) => {
            dispatch(authActions.seedSMS(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
