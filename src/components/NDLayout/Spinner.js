import React, {PureComponent} from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'

export default class Spinner extends PureComponent {

    render() {
        let size = this.props.size || 'small';
        let color = this.props.color || '#888888';
        return (
            <View style={[styles.container, styles.horizontal, this.props.style]}>
                <ActivityIndicator size={size} color={color}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
