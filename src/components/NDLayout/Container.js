import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import {
    ViewPropTypes,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    // Platform,
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


const obj = {
    width: viewWidth,
    flex: 1,
    height: viewHeight,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
}

// if(Platform.OS !== 'ios'){
//     obj.height = viewHeight;
//     // obj.flex = 0
// }

const styles = StyleSheet.create({
    containerBox: obj
})
