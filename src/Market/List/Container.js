import View from './View';
import {connect} from 'react-redux';
import * as marketActions from '../../actions/marketActions'

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        getList: (...args) => {
            dispatch(marketActions.getList(...args))
        },
        sortList: (...args) => {
            dispatch(marketActions.sortList(...args))
        },
        addCollection: (...args) => {
            dispatch(marketActions.addCollection(...args))
        },
        removeCollection: (...args) => {
            dispatch(marketActions.removeCollection(...args))
        },
        getDatabyMineID: (...args) => {
            dispatch(marketActions.getDatabyMineID(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
