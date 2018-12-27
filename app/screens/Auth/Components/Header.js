import React, {Component} from 'react';
import {Image} from 'react-native';
import { Header,Left,Right, Body, Text,Button} from 'native-base';
import PropTypes from 'prop-types'


class CustomHeader extends Component {
    static propTypes = {
        onCancel: PropTypes.func.isRequired
    }
    render() {
        return (
            <Header transparent>
                <Left>
                    <Button transparent onPress={this.props.onCancel}><Text style={{color:'#333333',fontSize: 16}}>取消</Text></Button>
                </Left>
                <Body>
                    <Image source={require('./img/logo_small.png')} style={{width: 83, height: 45}}/>
                </Body>
                <Right/>
            </Header>
        );
    }
}

export default CustomHeader;
