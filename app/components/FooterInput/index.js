import React, {Component} from 'react';
import {
    Input,
    Button,
    Item,
    Form,
    Footer
} from "native-base";
import {$toast} from "app/utils";
import i18n from "app/i18n";

import {Col, Row, Grid} from "react-native-easy-grid";
import {
    Text,
    Keyboard,
    Dimensions,
    Platform,
    Image,
    StyleSheet
} from "react-native";

const computeStyles = (height) => {
    return StyleSheet.create({

        // footer_focus: {
        //     alignItems: 'flex-start',
        //     // paddingTop: 12,
        //     height: height + 25,
        //     // borderWidth: 1,
        //     // borderColor: '#408EF5',
        //     // backgroundColor: '#eee',
        //     // marginBottom: height,
        // },

        footer: {
            height: height,
            // marginTop:8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        },

        footer_focus: {
            display: 'flex',
            alignItems: 'flex-start',
            height: height,
            backgroundColor: '#fff',
        },

        footer_grid: {
            display: 'flex',
            height: 49,
            backgroundColor: '#fff',
        },
        footer_form: {
            marginLeft: 16,
            // marginTop: 8
        },
        footer_label: {
            color: '#666666',
            fontSize: 16
        },
        footer_item: {
            borderRadius: 8,
            backgroundColor: '#F5F5F5',
            height: 33,
        },
        footer_input: {
            height: 33,
        },
        footer_col_label: {
            width: 36,
            height: 33,
            marginLeft: 16,
            marginRight: 16,
            lineHeight: 23,
            fontSize: 16,
            display: 'flex',
            alignItems: 'center'
        },
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
            text: ''
        }
    }

    // 键盘弹出事件响应
    keyboardDidShowHandler(event) {
        if (!this.props.isModalVisible) {
            this.setState({
                KeyboardShown: true,
                footerHeight: event.endCoordinates.height + 70
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

    // onFocusout = () => {
    //     if (this.props.onFocusout) {
    //         this.props.onFocusout();
    //     }
    // };

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
        // if (!text) {
        //     $toast('请输入评论内容');
        // }
        if (this.props.onComment) {
            this.props.onComment(item, text, () => {
                // $toast('评论成功');
                this.setState({
                    text: ''
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
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.activeComment && !this._input._root.isFocused()) {
            this._input._root.focus();
        } else {
            this.dissmissKeyboard();
        }
    }


    render() {
        let {KeyboardShown, footerHeight, text} = this.state;
        let {activeComment, placeholder, user, isAnonymity} = this.props;
        let styles = computeStyles(footerHeight);

        let source = require('app/images/avatar_default.png');

        if (isAnonymity) {
            source = user.avatar;
        }
        if (!isAnonymity && user && user.picture) {
            source = {uri: user.picture}
        }

        return <Footer style={[styles.footer, KeyboardShown && styles.footer_focus]}>
            <Grid style={styles.footer_grid}>
                {
                    KeyboardShown ? <Row style={{
                        marginTop: 8,
                        marginBottom: 8,
                    }}>
                        <Col style={{width: 36}}>
                            <Image style={{
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
                            }}>{!isAnonymity ? user.nickname : user.name}</Text>
                        </Col>
                    </Row> : null
                }
                <Row style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Col>
                        <Form style={styles.footer_form}>
                            <Item rounded style={styles.footer_item}>
                                <Input
                                    ref={(c) => this._input = c}
                                    value={text}
                                    onFocus={this.onFocus.bind(this)}
                                    onBlur={this.onBlur.bind(this)}
                                    onChangeText={this.onChangeText.bind(this)}
                                    style={styles.footer_input}
                                    placeholder={placeholder}/>
                            </Item>
                        </Form>
                    </Col>
                    <Col style={styles.footer_col_label}>
                        <Button block transparent light
                                style={{height: 33}}
                                onPress={this.onComment.bind(this, activeComment)}
                        >
                            <Text style={styles.footer_label}>{i18n.t('comment.publish')}</Text>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Footer>;
    }
}

export default FooterInput;
