import React, {Component} from 'react';
import Screen from './Screen';
import {connect} from 'react-redux';

class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Screen {...this.props} />;
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
