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
        getRankList: (...args) => {
            dispatch(marketActions.getRankList(...args))  
        },
        sortRankList: (...args) => {
            dispatch(marketActions.sortRankList(...args))
        },
        // sortList: (...args) => {
        //     dispatch(marketActions.sortList(...args))
        // },
        addCollection: (...args) => {
            dispatch(marketActions.addCollection(...args))
        },
        removeCollection: (...args) => {
            dispatch(marketActions.removeCollection(...args))
        },
        getDataByPairKey: (...args) => {
            dispatch(marketActions.getDataByPairKey(...args))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
