import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

import { 
    View,
    ViewPropTypes,
    StyleSheet,
    Platform,
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

const obj = {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 20,
}
if(Platform.OS !== 'ios'){
    // obj.minHeight = 80
}
const styles = StyleSheet.create({
    footerBox: {
        ...obj,
    }
})