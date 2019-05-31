import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import {
    View,
    ViewPropTypes,
    StyleSheet,
} from "react-native";
export default class Content extends PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
    }
    static defaultProps = {
        style: {}
    }

    render() {
        return (
            <View style={[styles.contentBox, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    contentBox: {
        flex: 1,
    }
})