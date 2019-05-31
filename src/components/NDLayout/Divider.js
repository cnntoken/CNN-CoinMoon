import React, {PureComponent} from 'react';

import {
    StyleSheet,
    View,
    PixelRatio,
} from 'react-native'

export default class Divider extends PureComponent {

    render() {
        return (
            <View style={[styles.border, this.props.style]}/>
        )
    }
}

const styles = StyleSheet.create({
    border: {
        // borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        height: 0.5
    }
});
