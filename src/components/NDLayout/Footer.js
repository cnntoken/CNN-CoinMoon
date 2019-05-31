import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

import { 
    View,
    ViewPropTypes,
    StyleSheet,
 } from "react-native";

export default class Footer extends PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
    }
    static defaultProps = {
        style: {}
    }
    render() {
        // console.log('===Footer rerender===')
        return (
            <View style={[styles.footerBox,this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footerBox: {
        // height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // marginBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
    }
})