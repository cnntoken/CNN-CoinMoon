import View from './View';
import {connect} from 'react-redux';
import * as  authActions from '../actions/authActions';

function mapStateToProps(state) {
    return {...state};
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
