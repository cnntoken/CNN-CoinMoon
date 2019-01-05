import React, {Component} from 'react';
import Page from './View';
import {connect} from 'react-redux';

const moment = require('moment');

class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Page {...this.props} />;
    }
}

const source = require("../../../images/avatar_default.png");

function mapStateToProps() {
    return {
        list: [
            {
                title: '하지만 스마트폰이 우리 삶에 깊게 들어온 만큼, 그로 인한 어두운 면 역시 부각되고 있습니다.',
                createdAt: moment().format("mm:ss"),
                userName: '匿名',
                source: source,
                viewNum: 1234,
                commentsNum: 1234,
                likeNum: 1234,
                dislikeNum: 1234,
                images: [
                    {
                        uri: 'https://s3.ap-south-1.amazonaws.com/a.fslk.co/disperseshare-test-hi.png',
                    },
                    {
                        uri: 'https://s3.ap-south-1.amazonaws.com/a.fslk.co/disperseshare-test-ta.png',
                    },
                    {
                        uri: 'https://s3.ap-south-1.amazonaws.com/a.fslk.co/disperseshare-test-te.png'
                    }
                ]
            },
            {
                title: '하지만 스마트폰이 우리 삶에 깊게 들어온 만큼, 그로 인한 어두운 면 역시 부각되고 있습니다.',
                time: moment().format("mm:ss"),
                userName: '匿名',
                source: source,
                num1: 1234,
                num2: 1234,
                num3: 1234,
                num4: 1234,
                images: [
                    {
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                    },
                    {
                        uri: 'http://img.hb.aicdn.com/3f488166d89c1c933e01efb3c7b1ba8d03c1f467c6239-8QXmaI_fw658',
                    },
                    {
                        uri: 'http://img.hb.aicdn.com/2ef0972e721f55fa0b176eca9c56c1909cf86c41496141-z4MJmr_fw658'
                    },
                    {
                        uri: 'http://img.hb.aicdn.com/90f0e0780b767a82885bafdf9526ee0224642f803befd8-qDYNht_fw658'
                    }
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
