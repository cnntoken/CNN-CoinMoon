import React, {Component} from 'react';
import View from './View';
import {connect} from 'react-redux';
import * as listActions from 'app/actions/listActions';


class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        datas: state.listReducer.datas ? state.listReducer.datas : []
    }

}

function mapDispatchToProps(dispatch) {
    return {
        // 获取列表页面的数据
        getList: (page, total) => {
            return dispatch(listActions.getList(1, 3))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
