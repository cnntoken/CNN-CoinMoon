import React, { Component } from 'react';
import View from './View';
import { connect } from 'react-redux';
import {getDetail} from 'app/actions/feedActions';
class Container extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <View {...this.props} />;
    }
}

function mapStateToProps() {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        getInfo: (...args) => dispatch(getDetail(...args))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
