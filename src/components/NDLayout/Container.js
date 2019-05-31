import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import {
    SafeAreaView,
    ViewPropTypes,
    StyleSheet,
    Dimensions,
} from "react-native";
const {height: viewHeight,width: viewWidth} = Dimensions.get('window')


export default class Container extends PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
    }
    static defaultProps = {
        style: {}
    }

    render() {
        return (
            <SafeAreaView style={[styles.containerBox, this.props.style]}>
                {this.props.children}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerBox: {
        height: viewHeight,
        width: viewWidth,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})