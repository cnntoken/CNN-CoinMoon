import React, {PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types'
import {StyleSheet} from 'react-native';
import {Button} from "native-base";

// import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14
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
        borderRadius: 40
    },
    text: {
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
        if (typeof big !== 'undefined' && big !== false) {
            customStyle = stylesBig;
        }
        return (
            <View style={[customStyle.wrap, style]}>
                {
                    this.props.goBack ? <Button transparent onPress={() => {
                        this.props.goBack()
                    }}>
                        <Image style={{
                            width: 18,
                            height: 18,
                            marginRight: 5,
                        }} source={require('app/images/icon_back_white.png')}/>

                    </Button> : null
                }
                <Image source={{uri: info.avatar} || require('app/images/avatar_default.png')}
                       style={customStyle.avatar}/>
                <Text style={customStyle.text}>{info.nickname || '一只蚂蚁'}</Text>
            </View>
        );
    }
}


export default UserAvatar;

