import React, { Component } from 'react';
import Page from './View';
import { connect } from 'react-redux';

class Container extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Page {...this.props} />;
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
