import React, {Component} from 'react';
import {
    Input,
    Button,
    Item,
    Form,
    Footer
} from "native-base";
import {$toast} from "app/utils";


import {Col, Grid} from "react-native-easy-grid";
import {
    Text, Keyboard,
    Dimensions,
    Platform,
    StyleSheet
} from "react-native";

const computeStyles = (height) => {
    return StyleSheet.create({
        footer_focus: {
            // borderWidth: 1,
            // borderColor: '#408EF5',
            // backgroundColor: '#fff',
            // marginBottom: height,
        },
        footer: {
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        },
        footer_grid: {
            display: 'flex',
            alignItems: 'center',
            height: 33,
            // paddingTop: 15,
            backgroundColor: '#fff',
        },
        footer_form: {
            // width:viewportWidth - 80
            marginLeft: 16,
            // height: 33
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
            marginLeft: 16,
            marginRight: 16,
            // display: 'flex',
            // alignItems: 'center'
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
            footerHeight: 50,
            text: ''
        }
    }

    // 键盘弹出事件响应
    keyboardDidShowHandler(event) {
        console.log(event);
        console.log(event.endCoordinates.height);
        this.setState({
            KeyboardShown: true,
            footerHeight: event.endCoordinates.height + 20
        });
    }

    //键盘隐藏事件响应
    keyboardDidHideHandler(event) {
        this.setState({
            KeyboardShown: false,
            footerHeight: 40
        });
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
            $toast('请输入评论内容');
        }
        if (this.props.onComment) {
            this.props.onComment(item, text, () => {
                $toast('评论成功');
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

    // componentDidUpdate(prevProps){
    //     if(this.props.activeComment !== prevProps.activeComment){
    //         if(this.props.activeComment){
    //             if(!this._input._root.isFocused()){
    //                 this._input._root.focus();
    //             }
    //         }else{
    //             this.dissmissKeyboard();
    //         }
    //     }
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.activeComment && !this._input._root.isFocused()) {
            this._input._root.focus();
        } else {
            this.dissmissKeyboard();
        }
    }


    render() {
        let {KeyboardShown, footerHeight, text} = this.state;
        let {activeComment} = this.props;
        let styles = computeStyles(footerHeight);
        return <Footer style={[styles.footer, KeyboardShown && styles.footer_focus]}>
            <Grid style={styles.footer_grid}>
                <Col>
                    <Form style={styles.footer_form}>
                        <Item rounded style={styles.footer_item}>
                            <Input
                                ref={(c) => this._input = c}
                                value={text}
                                onFocus={this.onFocus.bind(this, activeComment)}
                                onBlur={this.onBlur.bind(this, activeComment)}
                                onChangeText={this.onChangeText.bind(this)}
                                style={styles.footer_input}
                                placeholder=''/>
                        </Item>
                    </Form>
                </Col>
                <Col style={styles.footer_col_label}>
                    <Button block transparent light
                            onPress={this.onComment.bind(this, activeComment)}
                    >
                        <Text style={styles.footer_label}>评论</Text>
                    </Button>
                </Col>
            </Grid>
        </Footer>;
    }
}

export default FooterInput;
