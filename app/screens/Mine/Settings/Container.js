import View from './View';
import { connect } from 'react-redux';
import * as  authActions from 'app/actions/authActions';

function mapStateToProps({userReducer:{info}}) {
    return {userInfo:info};
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: (...args) => dispatch(authActions.logout(...args))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
