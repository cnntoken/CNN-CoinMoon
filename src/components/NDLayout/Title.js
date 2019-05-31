import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
    Text,
    StyleSheet,
    // Dimensions,
    // Platform,
    // PixelRatio,
} from "react-native";
export default class Title extends PureComponent {
    static propTypes = {
        style: Text.propTypes.style,
        txt: PropTypes.string,
    }
    static defaultProps = {
        style: {},
        txt: 'default Title'
    }
    render() {
        return (
            <Text style={[styles.titleBox, this.props.style]}>{this.props.txt}</Text>
        )
    }
}

const styles = StyleSheet.create({
    titleBox: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 20,
    }
})