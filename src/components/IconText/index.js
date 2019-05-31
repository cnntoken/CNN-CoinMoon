import React, {PureComponent} from 'react';
// import { Text,Button,View } from 'native-base';
import {Image, Text, View} from 'react-native';
import {Button} from '@components/NDLayout';
import styles from './styles';


const iconType = {
    view: require('@images/icon_view.png'),
    comment_small: require('@images/icon_comment_small.png'),
    comment_big: require('@images/icon_comment_big.png'),
    like_small: require('@images/icon_like_small.png'),
    like_big: require('@images/icon_like_big.png'),
    liked_small: require('@images/icon_liked_small.png'),
    liked_big: require('@images/icon_liked_big.png'),
    time: require('@images/icon_time.png')
};

export default class IconText extends PureComponent {
    onPress = () => {
        this.props.onPress && this.props.onPress()
    };
    renderView = () => {
        const {type, text, style, vertical} = this.props;
        const baseStyle = vertical ? styles.verticalBox : styles.horizontalBox;
        const textStyle = vertical ? styles.verticalText : styles.horizontalText;
        return <View style={[baseStyle, style]}>
            <Image source={iconType[type]}/>
            <Text style={textStyle}>{text}</Text>
        </View>
    };

    render() {
        const {normal, style} = this.props;
        if (normal) {
            return this.renderView()
        }
        return <Button transparent light onPress={this.onPress} style={[{height: null}, style]}>
            {this.renderView()}
        </Button>
    }
}

