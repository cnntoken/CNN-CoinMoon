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
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
                        style={styles.leftView}
                        onPress={leftClick}
                    >
                        {leftView}
                    </TouchableOpacity>
                    {(title && typeof title === 'function' && title()) || (
                        <Text style={styles.title}>{title}</Text>
                    )}
                    <TouchableOpacity
                        style={styles.rightView}
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
        // paddingTop: 10,
        paddingBottom: 10,
    },
    headerBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        // backgroundColor: '#ccc',
        ...Platform.select({
            ios: {
                // paddingTop: 45,
                // height: 64,
            },
            android: {
                // height: 56,
            },
        }),
    },
    leftView: {
        // width: 30,
        // paddingVertical: 8,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#eee',
    },
    rightView: {
        // width: 30,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
