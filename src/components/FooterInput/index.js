import React, {Component} from 'react';

import {$toast} from "@utils";
import i18n from "@i18n";
import {Col, Row, Grid} from "react-native-easy-grid";
import {View, TextInput, TouchableOpacity, PixelRatio} from "react-native";
import {Container} from '@components/NDLayout';
import FastImage from 'react-native-fast-image';
import {
    Text,
    Keyboard,
    Image,
    StyleSheet
} from "react-native";

const computeStyles = (height) => {
    console.log(height);
    return StyleSheet.create({
        footer: {
            height: height,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderTopWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
            borderTopColor: '#E6E6E6',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            // maxHeight: 49,
        },

        footer_focus: {
            // display: 'flex',
            alignItems: 'flex-start',
            // height: height,
            bottom: height - 34,
            backgroundColor: '#fff',
            height: 75,
            // maxHeight: 75,
        },

        footer_grid_userInfo: {
            // marginTop: 9,
            // marginBottom: 9,
            alignItems: 'center',
            // backgroundColor: '#eee'
        },

        footer_grid: {
            display: 'flex',
            alignItems: 'center',
            height: 49,
            backgroundColor: '#fff',
            marginVertical: 8,
        },
        footer_form: {
            marginLeft: 16,
            // marginTop: 8
        },
        footer_label: {
            color: '#666666',
            fontSize: 16,
            textAlign: 'center',
            width: 32,
            lineHeight: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        footer_input: {
            backgroundColor: '#F5F5F5',
            height: 33,
            // textAlignVertical: 'center',
            fontSize: 12,
            // lineHeight: 33,
            // width: '100%',
            // marginHorizontal: 16,
            marginLeft: 20,
            borderRadius: 12,
            paddingVertical: 0,
            paddingHorizontal: 12
        },
        footer_col_label: {
            // backgroundColor: '#F5F5F5',
            width: 64,
            height: 49,
            // paddingHorizontal:16,
            // paddingLeft: 16,
            lineHeight: 23,
            // marginHorizontal: 8,
            fontSize: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        submit_btn: {
            height: 33,
        }

    });
};

class FooterInput extends Component {

    constructor(props) {
        super(props);
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
        this.state = {
            activeComment: null,
            KeyboardShown: false,
            footerHeight: 49,
            text: '',
            commenting: false
        }
    }

    // 键盘弹出事件响应
    keyboardDidShowHandler(event) {
        if (!this.props.isModalVisible) {
            this.setState({
                KeyboardShown: true,
                footerHeight: event.endCoordinates.height
            });
        }
    }

    //键盘隐藏事件响应
    keyboardDidHideHandler(event) {
        if (!this.props.isModalVisible) {
            this.setState({
                KeyboardShown: false,
                footerHeight: 49
            });
        }
    }

    // 强制隐藏键盘
    dissmissKeyboard() {
        Keyboard.dismiss();
    }


    onFocus = (item) => {
        if (this.props.onFocus) {
            this.props.onFocus(item);
        }
    };

    onBlur = (item) => {
        if (this.props.onBlur) {
            this.props.onBlur(item);
        }
    };

    onChangeText = (value) => {
        this.setState({
            text: value
        });
    };

    onComment = (item) => {

        let text = this.state.text;

        if (!text) {
            $toast(i18n.t('comment.isNull'));
            return;
        }
        if (this.state.commenting) {
            return;
        }

        if (this.props.onComment) {

            this.setState({
                commenting: true
            });

            this.props.onComment(item, text, () => {
                this.setState({
                    text: '',
                    commenting: false
                })
            }, () => {
                this.setState({
                    // text: '',
                    commenting: false
                })
            });
        }
    };

    componentDidMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler.bind(this));
        //监听键盘隐藏事件
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler.bind(this));
    }

    componentWillUnmount() {
        //卸载键盘弹出事件监听
        if (this.keyboardDidShowListener !== null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardDidHideListener !== null) {
            this.keyboardDidHideListener.remove();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.activeComment && !this._input.isFocused()) {
            this._input.focus();
        } else {
            this.dissmissKeyboard();
        }
    }


    render() {
        let {KeyboardShown, footerHeight, text} = this.state;
        let {activeComment, placeholder, user, isAnonymity} = this.props;
        let styles = computeStyles(footerHeight);

        let source = require('@images/avatar_default.png');

        if (isAnonymity && user) {
            source = user.disclose_avatar
        }

        if (!isAnonymity && user && user.picture) {
            source = user.icon
        }



        return <Container style={{
            position: 'relative'
        }}>
            <View style={[styles.footer, KeyboardShown && styles.footer_focus]}>

                {
                    KeyboardShown ? <Grid style={styles.footer_grid_userInfo}>
                        <Col style={{width: 36}}>
                            <FastImage style={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                marginLeft: 16,
                            }} source={source}/>
                        </Col>
                        <Col>
                            <Text style={{
                                fontSize: 12,
                                color: '#999999',
                                lineHeight: 16,
                            }}>{!isAnonymity ? user.nickname : user.discloseName}</Text>
                        </Col>
                    </Grid> : null
                }
                <Grid style={styles.footer_grid}>
                    <Col>
                        <TextInput
                            ref={(c) => this._input = c}
                            value={text}
                            onFocus={this.onFocus.bind(this)}
                            onBlur={this.onBlur.bind(this)}

                            onChangeText={this.onChangeText.bind(this)}
                            style={styles.footer_input}
                            placeholder={placeholder}/>
                    </Col>

                    <Col style={styles.footer_col_label}>
                        <TouchableOpacity
                            style={styles.submit_btn}
                            onPress={this.onComment.bind(this, activeComment)}
                        >
                            <Text style={styles.footer_label}>{i18n.t('comment.publish')}</Text>
                        </TouchableOpacity>
                    </Col>
                </Grid>

            </View>
        </Container>;
    }
}

export default FooterInput;
