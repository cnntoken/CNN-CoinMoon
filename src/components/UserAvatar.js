import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types'
import {StyleSheet} from 'react-native';
import {isIOS} from '@utils';
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

class UserAvatar extends Component {
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
                {
                    isIOS ? <FastImage
                            source={info.avatar ? {
                                uri: info.avatar,
                                cache: FastImage.cacheControl.web
                            } : require('@images/avatar_default.png')}
                            style={customStyle.avatar}/>
                        :
                        <Image
                            source={info.avatar ? {
                                uri: info.avatar
                            } : require('@images/avatar_default.png')}
                            style={customStyle.avatar}/>
                }

                <Text style={customStyle.text}>{info.nickname || ''}</Text>
            </View>
        );
    }
}


export default UserAvatar;

