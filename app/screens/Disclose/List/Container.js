import React, {Component} from 'react';
import View from './View';
import {connect} from 'react-redux';

const moment = require('moment');

class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View {...this.props} />;
    }
}

const source = require("../../../images/avatar_default.png");

function mapStateToProps() {
    return {
        list: [
            {
                title: '하지만 스마트폰이 우리 삶에 깊게 들어온 만큼, 그로 인한 어두운 면 역시 부각되고 있습니다.',
                time: moment().format("mm:ss"),
                userName: '匿名',
                source: source,
                images: [
                    'https://facebook.github.io/react-native/docs/assets/favicon.png',
                ]
            }
        ]
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
