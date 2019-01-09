import View from './View';
import { connect } from 'react-redux';
import * as disCloseActions from "../../../actions/disCloseActions";
import * as Types from 'app/actions/types'
function mapStateToProps({userReducer:{info}}) {
    return {userInfo:info};
}


function mapDispatchToProps(dispatch) {
    return {
        refreshInfo:()=>{
            dispatch({type: Types.AUTH_REFRESH})
        },
        upload: (...args) => {
            console.log(args);
            dispatch(disCloseActions.upload(...args))
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
