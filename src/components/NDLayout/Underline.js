import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { 
    View,
    ViewPropTypes,
    StyleSheet,
    // Dimensions,
    // Platform,
    PixelRatio,
} from "react-native";

export default class Underline extends PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
    }
    static defaultProps = {
        style: {}
    }
    render() {
        return (
            <View style={[styles.underlineBox,this.props.style]} />
        )
    }
}

const styles = StyleSheet.create({
    underlineBox: {
        backgroundColor: '#E6E6E6',
        height: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    }
})