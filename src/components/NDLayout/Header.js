import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NavigationService from '@services/NavigationService';

import {
    View,
    ViewPropTypes,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

export default class Header extends PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
        styleBar: ViewPropTypes.style,
        leftView: PropTypes.element,
        leftClick: PropTypes.func,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
        rightView: PropTypes.element,
        rightClick: PropTypes.func,
    };
    static defaultProps = {
        style: {},
        styleBar: {},
        leftView: (
            <Image
                source={require('@images/icon_back_white.png')}
                style={{ width: 12, height: 23 }}
            />
        ),
        leftClick: () => {
            // console.log('leftclick')
            NavigationService.goBack();
        },
        title: '',
        rightView: <View style={{ width: 12, height: 23 }} />,
        rightClick: () => {},
    };
    render() {
        const {
            style,
            styleBar,
            leftView,
            leftClick,
            title,
            rightView,
            rightClick,
        } = this.props;
        return (
            <View style={[styles.headerBox, style]}>
                <View style={[styles.headerBar, styleBar]}>
                    <TouchableOpacity
                        style={[styles.btnView,styles.leftView]}
                        onPress={leftClick}
                    >
                        {leftView}
                    </TouchableOpacity>
                    <View style={styles.titleView}>
                        {typeof title === 'string' ? <Text style={styles.title}>{title}</Text> : typeof title === 'function'?title():title}
                    </View>
                    <TouchableOpacity
                        style={[styles.btnView, styles.rightView]}
                        onPress={rightClick}
                    >
                        {rightView}
                    </TouchableOpacity>
                </View>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 44
    },
    btnView: {minWidth:50,alignSelf:'stretch',alignItems:'center',display:'flex',justifyContent:'center'},
    headerBar: {minHeight: Platform.OS === 'ios' ? 44 : 56, flexDirection: 'row', alignItems: 'center',width:'100%'},
    leftView: {paddingLeft:16,alignItems:'flex-start'},
    rightView: {paddingRight:16,alignItems:'flex-end'},
    titleView:{flex:1, alignItems:'center', justifyContent:'center'},
    title: { fontWeight: '500',color: '#000',fontSize: 18},
});