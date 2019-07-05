import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    View,
    ViewPropTypes,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native";
// import KeyBoard from './KeyBoard';
const {width: viewWidth,height: viewHeight} = Dimensions.get('window');

export default class Modal extends PureComponent {
    static propTypes = {
        styleBody: ViewPropTypes.style,
        styleContent: ViewPropTypes.style,
        isVisible: PropTypes.bool,
        closeMask: PropTypes.func,

    }
    static defaultProps = {
        styleBody: {},
        styleContent: ViewPropTypes.style,
        isVisible: false,
    }
    onPress = ()=>{
        console.log('onpress')
        const {closeMask} = this.props;
        typeof closeMask === 'function' && closeMask()
    }
    render() {
        const {children,styleBody,styleContent} = this.props
        return (
            <View style={[styles.modalBody, styleBody]}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <View style={[styles.modalContent,styleContent]}>
                        {/* <KeyBoard enabled> */}
                            <TouchableWithoutFeedback>
                                {children}
                            </TouchableWithoutFeedback>
                        {/* </KeyBoard> */}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    modalBody: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
    }
})