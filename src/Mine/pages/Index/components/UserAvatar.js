import React, {PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types'
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#eee'
    },
    text: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 8
    }
});

const stylesBig = StyleSheet.create({
    wrap: {
        width: 80,
        alignItems: 'center',
        // marginBottom: 20
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#eee"
    },
    text: {
        fontSize: 15,
        color: '#333',
        marginTop: 8,
        width: 280,
        textAlign: 'center'
    }
});

class UserAvatar extends PureComponent {
    static propTypes = {
        info: PropTypes.object.isRequired
    };


    render() {
        const {info, big, style} = this.props;
        let customStyle = styles;
        if (typeof big !== 'undefined' && big !== false) {
            customStyle = stylesBig;
        }
        return (
            <View style={[customStyle.wrap, style]}>
                <FastImage source={info.avatar ? {uri: info.avatar} : require('@images/avatar_default.png')}
                       style={customStyle.avatar}/>
                <Text style={customStyle.text}>{info.nickname || '一只蚂蚁'}</Text>
            </View>
        );
    }
}


export default UserAvatar;

