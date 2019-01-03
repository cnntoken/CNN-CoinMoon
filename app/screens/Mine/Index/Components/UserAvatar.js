import React, {PureComponent} from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types'
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    wrap:{
       flexDirection:'row',
       alignItems: 'center'
    },
    avatar: {
        width: 28,
        height: 28
    },
    text:{
        fontSize: 14,
        color: '#fff',
        marginLeft: 8
    }
});

const stylesBig = StyleSheet.create({
    wrap:{
        width: 80,
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80
    },
    text:{
        fontSize: 15,
        color: '#333',
        marginTop: 8
    }
});

class UserAvatar extends PureComponent {
    static propTypes = {
        info: PropTypes.object.isRequired
    }
    render() {
        const {info, big, style} = this.props;
        let customStyle = styles;
        if(typeof big !== 'undefined' && big !== false){
            customStyle = stylesBig;
        }
        return (
            <View style={[customStyle.wrap,style]}>
                <Image source={info.avatar || require('app/images/icon_settings.png')} style={customStyle.avatar}/>
                <Text style={customStyle.text}>{info.nickname || '一只蚂蚁'}</Text>
            </View>
        );
    }
}


export default UserAvatar;

