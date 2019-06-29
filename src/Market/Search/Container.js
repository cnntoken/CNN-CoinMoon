import View from './View';
import {connect} from 'react-redux';
import * as marketActions from '../../actions/marketActions'
import * as Types from '../../actions/types'

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        searchCoin: (...args) => {
            dispatch(marketActions.searchCoin(...args))
        },
        initSearchList: () => {
            dispatch({type:Types.MARKET_INIT_SEARCH_LIST})
        },
        addCollection: (...args) => {
            dispatch(marketActions.addCollection(...args))
        },
        removeCollection: (...args) => {
            dispatch(marketActions.removeCollection(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
