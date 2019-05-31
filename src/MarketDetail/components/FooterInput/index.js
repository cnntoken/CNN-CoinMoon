import React, {Component} from 'react';

import {$toast} from "@utils/index";
import i18n from "@i18n";
import {
    Text,
    Keyboard,
    View,
    Platform,
    StyleSheet,
    TextInput,
    Dimensions
} from "react-native";
import {
    Button,
    Footer
} from '@components/NDLayout'
import {goRNPage} from "@utils/CNNBridge";

const {width: viewportWidth} = Dimensions.get('window');

const isAndroid = Platform.OS === "android";

const computeStyles = (height) => {
    return StyleSheet.create({
        footer: {
            height: height,
            // marginTop:8,
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight:0,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
        },
        footer_focus: {
            alignItems: 'flex-start',
            // height: height,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#fff',
            justifyContent: 'flex-end'
        },
        left_box: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 3
        },
        left_box_focus: {
            paddingRight: 15,
            height: 105,
            flexDirection: 'column',
            flex: 2,
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
            // backgroundColor: 'blue',
            // justifyContent: 'center',
            // alignItems: 'center'
        },
        publish_bar: {
            flexDirection: 'row',
            marginTop: 9,
            flex: 1,
            height: 25,
            width: 200,
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
        },
        bottom_publish: {
            marginLeft: 10,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: 80,
            backgroundColor: '#fff'
        },
        num_limit: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: 80,
        },
        right_box:{
            height: 49,
            flex: 1,
        },
        footer_input: {
            height: 33,
            flex:4,
            borderWidth: .5,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 16,
            borderColor: '#ccc',
            backgroundColor: '#F5F5F5'
            // height: 33,
            // // textAlignVertical:'bottom'
            // // fontSize:12,
            // lineHeight:33
        },
        input_focus: {
            height: 75,
            width: viewportWidth - 30,
            borderRadius: 5,
            alignItems: 'flex-start'
        },
        reply_btn: {
            flex: 1
        },
        select_btn: {
            flex: 3,
        },
        add_btn:{
            paddingLeft: 11,
            paddingRight: 11,
            // paddingTop
            alignItems: 'center',
            backgroundColor: '#408EF5',
            borderRadius: 0
        },
        add_text: {
            color: '#fff',
            fontSize: 15
        },
        cancel_btn:{
            paddingLeft: 11,
            paddingRight: 11,
            alignItems: 'center',
            backgroundColor: '#E6E6E6',
            borderRadius: 0
        },
        cancel_text: {
            color: '#fff',
            fontSize: 15
        }
    });
};

class FooterInput extends Component {

    constructor(props) {
        super(props);
        this.keyboardWillShowListener = null;
        this.keyboardWillHideListener = null;
        this.state = {
            selected: props.selected,
            isFocused: false,
            activeComment: null,
            KeyboardShown: false,
            footerHeight: 49,
            text: '',
            textCount: 0,
            commenting: false
        }
    }

    // 键盘弹出事件响应
    keyboardWillShowHandler = (event) => {
        if (!this.props.isModalVisible) {
            this.setState({
                KeyboardShown: true,
                footerHeight: isAndroid ? 90 : event.endCoordinates.height + 90
            });
        }
    }

    //键盘隐藏事件响应
    keyboardWillHideHandler = (event) => {
        if (!this.props.isModalVisible) {
            this.setState({
                KeyboardShown: false,
                footerHeight: 49
            });
            this.props.resetActivecomment()
        }
    }

    // 强制隐藏键盘
    dissmissKeyboard = () => {
        Keyboard.dismiss();
    }

    onFocus = (item) => {
        let {user} = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            })
            return
        }
        this.setState({
            isFocused: true
        })
        if (this.props.onFocus) {
            this.props.onFocus(item);
        }
    };

    onBlur = (item) => {
        this.setState({
            isFocused: false
        })
        if (this.props.onBlur) {
            this.props.onBlur(item);
        }
    };

    onChangeText = (value) => {
        this.setState({
            text: value,
            textCount: value.length
        });
    };

    onComment = (item) => {
        let text = this.state.text;
        if (!text) {
            $toast(i18n.t('comment.isNull'));
            return;
        }
        if(text.length>140){
            $toast('超出字数限制')
            return 
        }
        if (this.state.commenting) {
            return;
        }
        if (this.props.onComment) {
            this.setState({
                commenting: true
            });
            this.props.onComment(item, text, () => {
                $toast('评论成功');
                this._input.blur();
                this.setState({
                    text: '',
                    commenting: false,
                    textCount: 0,
                    isFocused: false,
                    KeyboardShown: false
                })
            });
        }
    };

    componentDidMount = () => {
        //监听键盘弹出事件
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShowHandler);
        //监听键盘隐藏事件
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHideHandler);
    }

    componentWillUnmount = () => {
        //卸载键盘弹出事件监听
        if (this.keyboardWillShowListener != null) {
            this.keyboardWillShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardWillHideListener != null) {
            this.keyboardWillHideListener.remove();
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps && nextProps.activeComment && !this.state.isFocused) {
            this._input.focus();
        } else {
            this.dissmissKeyboard();
        }
    }
    removeCollection = () => {
        const { user,coin_id } = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            });
        } else {
            this.setState({
                selected: !this.state.selected
            })
            this.props.removeCollection(coin_id)
        }
    }
    addCollection = () => {
        const { user, coin_id } = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            });
        } else {
            this.setState({
                selected: !this.state.selected
            })
            this.props.addCollection(coin_id)
        }
    }


    render() {
        let {KeyboardShown, footerHeight, text,isFocused,textCount} = this.state;
        let {activeComment, placeholder} = this.props;
        let styles = computeStyles(footerHeight);
        return <Footer style={[styles.footer, KeyboardShown && styles.footer_focus]}>
                    <View style={[styles.left_box,isFocused && styles.left_box_focus]}>
                        <TextInput
                            // maxLength={140}
                            multiline={true}
                            ref={(c) => this._input = c}
                            value={text}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChangeText={this.onChangeText}
                            style={[styles.footer_input,isFocused && styles.input_focus]}
                            placeholder={placeholder}/>
                        {
                            !isFocused ?
                                <Button block transparent light
                                        style={styles.reply_btn}
                                        onPress={()=>this.onComment(activeComment)}
                                >
                                    <Text style={styles.footer_label}>{i18n.t('comment.publish')}</Text>
                                </Button>
                            :   <View style={styles.publish_bar}>
                                    <View style={styles.num_limit}><Text >{textCount}/140</Text></View>
                                    <Button style={styles.bottom_publish} onPress={()=>this.onComment(activeComment)}><Text>发布</Text></Button>
                                </View>
                        }
                    </View>
                    {
                        !this.props.showSelectAction || isFocused ? null
                        :   <View style={styles.right_box}>
                                <View style={styles.select_btn}>
                                        {
                                            this.state.selected ?
                                                <Button style={styles.cancel_btn} onPress={this.removeCollection}><Text style={styles.add_text}>取消自选</Text></Button>
                                            :   <Button style={styles.add_btn} onPress={this.addCollection}><Text style={styles.cancel_text}>添加自选</Text></Button>
                                        }
                                </View>
                            </View>
                    }
        </Footer>;
    }
}

export default FooterInput;
