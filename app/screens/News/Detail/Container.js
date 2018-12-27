import React, { Component } from 'react';
import View from './View';
import { connect } from 'react-redux';

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
function mapDispatchToProps() {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
