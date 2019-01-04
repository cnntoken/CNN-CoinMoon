import View from './View';
import { connect } from 'react-redux';

function mapStateToProps({userReducer:{info}}) {
    return {userInfo:info};
}

export default connect(
    mapStateToProps
)(View);
