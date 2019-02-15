import React, {Component} from 'react';
import {Image} from 'react-native';
import { Header,Left,Right, Body, Text,Button} from 'native-base';
import PropTypes from 'prop-types'
import i18n from 'app/i18n';

class CustomHeader extends Component {
    static propTypes = {
        onCancel: PropTypes.func.isRequired
    }
    render() {
        return (
            <Header transparent>
                <Left style={{flex:1}}>
                    <Button transparent onPress={this.props.onCancel}><Text style={{color:'#333333',fontSize: 16}}>{i18n.t('label_cancel')}</Text></Button>
                </Left>
                <Body  style={{flex:1,
                    // backgroundColor:'#eee',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Image source={require('./img/logo_small.png')} style={{width: 83, height: 45}}/>
                </Body>
                <Right  style={{flex:1}}/>
            </Header>
        );
    }
}

export default CustomHeader;
