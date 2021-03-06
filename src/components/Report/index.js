import React, {Component} from 'react';

import {
    Button,
} from '@components/NDLayout';

import {$toast} from "@utils";
import i18n from "@i18n";


import {Col, Row, Grid} from "react-native-easy-grid";

import {
    Text,
    Keyboard,
    Platform,
    Image,
    TextInput,
    View
} from "react-native";

import styles from './styles';
import Modal from "react-native-modal";
import reasons from '@data/reportReason';


const isAndroid = Platform.OS === "android";

class Report extends Component {

    constructor(props) {
        super(props);
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
        this.state = {
            KeyboardShown: false,
            text: '',
            showInput: false,
            mb: 0,
        }
    }

    // 键盘弹出事件响应
    keyboardDidShowHandler(event) {
        if (this.props.isModalVisible && this.props.reasons.indexOf(4) > -1) {
            let mb =
                this.setState({
                    KeyboardShown: true,
                    mb: isAndroid ? 0 : event.endCoordinates.height
                })
        }
    }

    //键盘隐藏事件响应
    keyboardDidHideHandler(event) {
        this.setState({
            KeyboardShown: false,
            mb: 0
        });
    }

    // 强制隐藏键盘
    dissmissKeyboard() {
        Keyboard.dismiss();
    }


    onChangeText = (value) => {
        this.setState({
            text: value
        });
    };

    onSubmit = () => {
        let text = this.state.text;
        if (this.props.onSubmit) {
            this.props.onSubmit(text, () => {
                // $toast('评论成功');
                this.setState({
                    text: '',
                }, () => {
                    this.dissmissKeyboard();
                });
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
        if (nextProps && nextProps.isModalVisible && nextProps.reasons.indexOf(4) > -1 && this._reportInput._root && !this._reportInput._root.isFocused()) {
            setTimeout(() => {
                this._reportInput._root.focus();
            });
        } else {
            this.dissmissKeyboard();
        }
    }

    closeReport = () => {
        if (this.props.closeReport) {
            this.props.closeReport();
        }
    };

    onSelect = (item) => {
        if (this.props.onSelect) {
            this.props.onSelect(item);
        }
    };

    render() {

        let disabled = true;
        let showInput = this.props.reasons.indexOf(4) > -1;

        if (this.props.reasons.length > 0 && !showInput) {
            disabled = false;
        }
        if (showInput) {
            if (this.state.text) {
                disabled = false;
            }
        }

        return <Modal isVisible={this.props.isModalVisible} style={{
            justifyContent: "flex-end",
            marginBottom: this.state.mb,
        }}>
            <View style={styles.modal}>

                <View style={styles.header}>
                    <Grid style={{
                        // display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Col style={{
                            width: 24,
                            marginLeft: 10,
                            // marginTop:16,
                        }}>

                            <Button
                                transparent
                                style={{}} onPress={this.closeReport}>
                                <Image style={{
                                    width: 24,
                                    height: 24,
                                }} source={require('@images/icon_close.png')}/>
                            </Button>

                        </Col>
                        <Col>
                            {/* todo  国际化 */}
                            <Text style={{
                                // flex: 1,
                                // textAlign:'center',
                                marginLeft: 8,
                                color: '#000',
                                fontSize: 16,
                                // width: 100,
                                lineHeight: 23,
                            }}>{i18n.t('report_placeholder')}</Text>
                        </Col>
                    </Grid>
                </View>

                <View style={{
                    marginBottom: 80
                }}>
                    {
                        reasons.map((item, index) => {
                            let selected = this.props.reasons.indexOf(item.value) > -1;
                            return <Button key={index} onPress={this.onSelect.bind(this, item)}
                                           style={selected ? styles.reason_selected : styles.reason}>
                                <Text style={selected ? {
                                    color: '#fff',
                                    fontSize: 16,
                                    height: 20,
                                    lineHeight: 20,
                                } : {
                                    color: '#333',
                                    fontSize: 16,
                                    height: 20,
                                    lineHeight: 20,
                                }}>{item.content}
                                </Text>
                            </Button>
                        })
                    }
                </View>

                <View style={{
                    marginTop: 15,

                }}>

                    <View style={showInput ? {
                        height: 40,
                        marginBottom: 21
                    } : {
                        height: 0,
                    }
                    }>
                        <TextInput
                            ref={(c) => this._reportInput = c}
                            value={this.state.text}
                            onChangeText={this.onChangeText.bind(this)}
                            style={styles.footer_input}/>
                    </View>

                    <View style={styles.footer_btn}>
                        <Grid>
                            <Col/>
                            <Col style={{
                                width: 40,
                            }}>
                                <Button style={{
                                    // width:40,
                                    // backgroundColor:'#eee'
                                }} disabled={disabled} transparent onPress={this.onSubmit} light>
                                    <Text style={disabled ? {
                                        color: '#999999',
                                        fontSize: 16,
                                        lineHeight: 23,
                                    } : {
                                        color: '#408EF5',
                                        fontSize: 16,
                                        lineHeight: 23,
                                    }
                                    }>{i18n.t('report_submit')}</Text>
                                </Button>
                            </Col>
                            <Col/>
                        </Grid>
                    </View>
                </View>
            </View>
        </Modal>;
    }
}

export default Report;
