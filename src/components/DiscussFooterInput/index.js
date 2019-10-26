import React, {PureComponent} from 'react';

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
} from '@components/NDLayout'
import {goRNPage,goNativePage} from "@utils/CNNBridge";
import { calculateStyleVariable, cnnLogger, isIphoneX} from '@utils/index'

const PX = calculateStyleVariable()
const IsIphoneX = isIphoneX()
const {width: viewportWidth} = Dimensions.get('window');

const isAndroid = Platform.OS === "android";
const computeStyles = (height) => {
    return StyleSheet.create({
        wrap:{
            position: 'absolute',
            width: '100%',
            left:0,
            bottom:0,
        },
        footer: {
            display:'flex',
            flexDirection: 'row',
            position: 'relative',
            height: height,
            alignItems: 'center',
            paddingLeft: 16*PX,
            paddingRight:0,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            borderTopWidth: 1*PX,
            borderTopColor: '#E6E6E6'
        },
        footer_focus: {
            alignItems: 'flex-start',
            // height: height,
            paddingTop: 10*PX,
            paddingBottom: 10*PX,
            backgroundColor: '#fff',
            justifyContent: 'flex-end'
        },
        left_box: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 3
        },
        left_box_focus: {
            paddingRight: 15*PX,
            height: 105*PX,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
            // backgroundColor: 'blue',
            // justifyContent: 'center',
            // alignItems: 'center'
        },
        publish_bar: {
            flexDirection: 'row',
            // marginTop: 9*PX,
            // flex: 1,
            height: 25*PX,
            width: 200*PX,
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
        },
        bottom_publish: {
            marginLeft: 10*PX,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: 80*PX,
            backgroundColor: '#fff'
        },
        num_limit: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: 80*PX,
        },
        num_limit_text: {
            color: '#DC143C'
        },
        right_box:{
            height: 49*PX,
            // flex: 1,
            width: 100*PX
        },
        footer_input: {
            height: 33*PX,
            flex:4,
            borderWidth: .5*PX,
            paddingTop:8*PX,
            paddingBottom:8*PX,
            paddingLeft: 15*PX,
            paddingRight: 15*PX,
            borderRadius: 16*PX,
            borderColor: '#ccc',
            backgroundColor: '#F5F5F5',
        },
        input_focus: {
            height: 75*PX,
            width: viewportWidth - 30*PX,
            borderRadius: 5*PX,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        reply_btn: {
            flex: 1
        },
        select_btn: {
            flex: 3,
        },
        add_btn:{
            paddingLeft: 5*PX,
            paddingRight: 5*PX,
            // paddingTop
            alignItems: 'center',
            backgroundColor: '#408EF5',
            borderRadius: 0
        },
        add_text: {
            color: '#fff',
            fontSize: 15*PX
        },
        cancel_btn:{
            paddingLeft: 5*PX,
            paddingRight: 5*PX,
            alignItems: 'center',
            backgroundColor: '#cccccc',
            borderRadius: 0
        },
        cancel_text: {
            color: '#fff',
            fontSize: 15*PX
        }
    });
};

class DiscussFooterInput extends PureComponent {

    constructor(props) {
        super(props);
        this.keyboardShowListener = null;
        this.keyboardHideListener = null;
        this.state = {
            selected: props.selected,
            isFocused: false,
            KeyboardShown: false,
            footerHeight: 49*PX,
            text: '',
            textCount: 0,
            commenting: false,
        }
    }

    // 键盘弹出事件响应
    keyboardShowHandler = (event) => {
            let height = isAndroid ? 130*PX : event.endCoordinates.height + (IsIphoneX ? 100*PX : 130*PX)
            this.setState({
                isFocused: true,
                KeyboardShown: true,
                footerHeight: height,
            });
    }

    //键盘隐藏事件响应
    keyboardHideHandler = (event) => {
            this.setState({
                isFocused: false,
                KeyboardShown: false,
                footerHeight: 49*PX,
            });
            this.props.resetActivecomment()
    }

    // 强制隐藏键盘
    dissmissKeyboard = () => {
        Keyboard.dismiss();
    }

    onFocus = (item) => {
        let {user} = this.props
        if(!user.isLogin){
            // cnnLogger('show_login_page',{
            //     from:'个人中心',
            //     trigger:'report'
            // });
            goNativePage({
                moduleName: 'stark_login',
            })
            return
        }
        this.setState({
            isFocused: true,
            KeyboardShown: true
        })
        if (this.props.onFocus) {
            this.props.onFocus(item);
        }
    };

    onBlur = (item) => {
        this.setState({
            isFocused: false,
            KeyboardShown: false
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
            $toast(i18n.t('page_market_detail.exceed_limit'))
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
                $toast(i18n.t('page_market_detail.discuss_success'));
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
        if(isAndroid){
            this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShowHandler);
            this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHideHandler);
        } else {
            this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShowHandler);
            this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHideHandler);
        }

    }

    componentWillUnmount = () => {
        //卸载键盘弹出事件监听
        if (this.keyboardShowListener != null) {
            this.keyboardShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardHideListener != null) {
            this.keyboardHideListener.remove();
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps && nextProps.activeComment && !this.state.isFocused) {
            this._input.focus();
        }
        // } else if(!nextProps.KeyboardShown){
        //     this.dissmissKeyboard()
        // }
        if(nextProps.selected !== this.state.selected){
            this.setState({
                selected: nextProps.selected
            })
        }
    }
    removeCollection = () => {
        const { user,coin_id, type } = this.props
        if(!user.isLogin){
            goNativePage({
                moduleName: 'stark_login',
            });
        } else {
            this.setState({
                selected: !this.state.selected
            })
            this.props.removeCollection(coin_id,-1,type)
        }
    }
    addCollection = () => {
        const { user, coin_id, type } = this.props
        if(!user.isLogin){
            goNativePage({
                moduleName: 'stark_login',
            });
        } else {
            this.setState({
                selected: !this.state.selected
            })
            this.props.addCollection(coin_id,-1,type)
        }
    }


    render() {
        let {KeyboardShown, footerHeight, text,isFocused,textCount} = this.state;
        let {activeComment, placeholder} = this.props;
        let styles = computeStyles(footerHeight);
        return <View style={styles.wrap}>
                <View style={[styles.footer, KeyboardShown && styles.footer_focus]}>
                    <View style={[styles.left_box,isFocused && styles.left_box_focus]}>
                        <TextInput
                            // maxLength={140}
                            textAlignVertical={isFocused?'top':'center'}
                            multiline={true}
                            ref={(c) => this._input = c}
                            value={text}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChangeText={this.onChangeText}
                            style={[styles.footer_input,isFocused && styles.input_focus]}
                            placeholderTextColor='#999999'
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
                                    <View style={styles.num_limit}><Text>{textCount}</Text><Text style={textCount>140?styles.num_limit_text:{}}>/140</Text></View>
                                    <Button style={styles.bottom_publish} onPress={()=>this.onComment(activeComment)}><Text>{i18n.t('page_market_detail.publish_discuss')}</Text></Button>
                                </View>
                        }
                    </View>
                    {
                        !this.props.showSelectAction || isFocused ? null
                        :   <View style={styles.right_box}>
                                <View style={styles.select_btn}>
                                        {
                                            this.state.selected ?
                                                <Button style={styles.cancel_btn} onPress={this.removeCollection}><Text style={styles.add_text}>{i18n.t('page_market_detail.remove_collection')}</Text></Button>
                                            :   <Button style={styles.add_btn} onPress={this.addCollection}><Text style={styles.cancel_text}>{i18n.t('page_market_detail.add_collection')}</Text></Button>
                                        }
                                </View>
                            </View>
                    }
                    </View>
        </View>
    }
}

export default DiscussFooterInput;
