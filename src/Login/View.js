import React, {Component} from 'react';
import styles from './styles';
import {Image, TouchableOpacity, DeviceEventEmitter, View, Text, ScrollView} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import areas from '../data/phone_area';
import Header from '@components/NDLayout/Header'
import FocusInput from '../components/InputFocus'
import {$toast, cnnLogger} from '../utils'
import i18n from '../i18n';
import Picker from 'react-native-picker';
import {closeRNPage, goRNPage, setUserInfo} from '../utils/CNNBridge'


class ViewControl extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            event: props.event || {},
            info: {},
            isAgree: true,
            phone: '',
            code: '',
            countdown: 0,
            selectedArea: '82', //韩国的手机区号
        };
    }

    showLincense = (policy) => {
        goRNPage({
            moduleName: 'stark_policy',
            params: {
                policy
            }
        })

    };

    toggleLincense = () => {
        const {isAgree} = this.state;
        if(!isAgree){
            cnnLogger('click_agree_btn')
        }
        this.setState({isAgree: !isAgree});
    };


    onChangeInput = (type, text) => {
        if (type === 'phone') {
            this.setState({
                phone: text
            })
        }
        if (type === 'code') {
            this.setState({
                code: text
            })
        }
    };

    startCountDown() {
        this.interval = setInterval(() => {
            if (this.state.countdown <= 0) {
                clearInterval(this.interval);
                return;
            }
            let count = this.state.countdown - 1;
            this.setState({
                countdown: count
            })
        }, 1000);

    }

    checkPhone = () => {
        const {phone} = this.state;
        if (!/\d{1,15}/.test(phone)) {
            $toast(i18n.t('phone_invalid_tip'));
            return false
        }
        return true;
    };

    checkCode = () => {
        const {phone} = this.state;
        if (!/\d{6}/.test(phone)) {
            $toast(i18n.t('code_invalid_tip'));
            return false
        }
        return true;
    };


    // 发送验证码
    seedSMS = () => {

        cnnLogger('click_get_code',this.state.event);

        const {phone, selectedArea} = this.state;

        if (!this.checkPhone()) {
            return;
        }

        this.setState({
            countdown: 10
        }, () => {
            this.startCountDown();
        });

        this.props.seedSMS({
            params: {
                "account_type": "sms",
                "account_id": String(selectedArea + phone)
            },
            callback: () => {

            }
        })
    };


    goBack = () => {
        Picker.hide();
        cnnLogger('click_back_on_login',this.state.event);
        closeRNPage();
    };

    // 手机号注册登录
    onLogin = () => {


        if (this.isBtnDisabled()) {
            return false;
        }
        if (!this.checkPhone() || !this.checkCode()) {
            return;
        }
        cnnLogger('click_login',this.state.event);
        const {phone, code, selectedArea} = this.state;
        $toast(i18n.t('page_login.loging'));
        this.props.onLogin({
            params: {
                "source": 'sms',
                "source_uid": String(selectedArea + phone),
                "phone": String(selectedArea + phone),
                "code": code,
            },
            callback: (data) => {
                // 登录成功
                if (!data.error) {
                    cnnLogger('login_success',this.state.event);
                    $toast(i18n.t('page_login.login_success'));
                    setUserInfo(data).then(() => {
                        //
                        // let {from, data} = this.props;
                        // if (from) {
                        //     goRNPage({
                        //         moduleName: from,
                        //         params: {
                        //             data: data
                        //         }
                        //     });
                        // } else {
                        //     this.goBack();
                        // }

                        this.goBack();
                        // 重新登陆后更新各频道列表中的数据
                        DeviceEventEmitter.emit('userStateChange', data);
                    });
                }
                // 登录失败
                else {
                    cnnLogger('login_failed',this.state.event);
                    setTimeout(() => {
                        $toast(i18n.t('page_login.login_fail'));
                    }, 2000);
                }
            }
        });
    };

    onValueChange(value: string) {
        // console.log(value);
        this.setState({
            selectedArea: value
        });
    }

    pickerArea = () => {
        Picker.init({
            pickerData: areas,
            pickerConfirmBtnText: i18n.t('confirm'),
            pickerCancelBtnText: i18n.t('cancel'),
            pickerTitleText: i18n.t('plsSelect'),
            selectedValue: [82],
            pickerConfirmBtnColor: [64, 142, 245, 1],
            pickerCancelBtnColor: [237, 23, 39, 1],
            onPickerConfirm: data => {
                this.setState({
                    selectedArea: data[0]
                })
            },
            onPickerCancel: data => {
                // console.log(data);
            },
            onPickerSelect: data => {
                // console.log(data);
            }
        });
        Picker.show();
    };

    isBtnDisabled = () => {
        const {isAgree, phone, code} = this.state;

        return (!(phone && code && isAgree));

    }
    componentDidMount(){
        cnnLogger('show_login_page',this.state.event)
    }
    componentWillUnmount() {

        this.interval && clearInterval(this.interval);
    }

    render() {
        const {isAgree, phone, code, countdown} = this.state;

        return (
            <ScrollView>
                <Header
                    leftClick={this.goBack}
                    style={{backgroundColor: '#fff'}}
                    leftView={<Text style={styles.cancel}>{i18n.t('label_cancel')}</Text>}
                    title={<Image source={require('../images/logo_small.png')} style={{width: 74, height: 40}}/>}
                />

                <View style={styles.container}>

                    <Text style={styles.label}>{i18n.t('label_please_login')}</Text>

                    <View style={styles.form}>

                        <FocusInput
                            style={[styles.item, styles.item_phone]}
                            value={phone}
                            onChangeText={this.onChangeInput.bind(this, 'phone')}
                            placeholder={i18n.t('login_input_phone_tip')}
                            keyboardType='numeric'
                            textContentType='telephoneNumber'
                            clearButtonMode='while-editing'
                        />

                        <FocusInput
                            style={styles.item}
                            value={code}
                            onChangeText={this.onChangeInput.bind(this, 'code')}
                            placeholder={i18n.t('login_phone_msg_code')}
                            keyboardType='numeric'
                            textContentType='telephoneNumber'
                        />

                        <View style={styles.picker_con}>
                            <TouchableOpacity style={styles.picker_btn} onPress={this.pickerArea} title>
                                <Text style={styles.picker_text}>{'+' + this.state.selectedArea}</Text>
                            </TouchableOpacity>
                        </View>


                        {/* 获取验证码 */}
                        <View style={styles.getCode_con}>
                            {
                                countdown <= 0 ? <TouchableOpacity style={styles.getCode} onPress={this.seedSMS}>
                                    <Text>{i18n.t('get_phone_code_tip')}</Text>
                                </TouchableOpacity> : <Text>{countdown}S</Text>
                            }
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity style={[styles.licenseBox, styles.text1]}
                                              onPress={this.toggleLincense}>

                                <Image style={styles.agree}
                                       source={isAgree ? require('../images/checkbox_checked.png') : require('../images/checkbox_normal.png')}/>

                                <TouchableOpacity onPress={() => this.showLincense('privacy')}>
                                    <Text style={[styles.highlight]}> {i18n.t('page_register.license1')}</Text>
                                </TouchableOpacity>

                                <Text>, </Text>

                                <TouchableOpacity onPress={() => this.showLincense('user-terms')}>
                                    <Text style={[styles.highlight]}> {i18n.t('page_register.license3')}</Text>
                                </TouchableOpacity>

                                <Text> {i18n.t('page_register.license2')}</Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 登录按钮 */}
                    <TouchableOpacity style={[styles.loginBth, this.isBtnDisabled() && styles.loginBthDisabled]}
                                      onPress={this.onLogin}>
                        <Text style={styles.loginText}>{i18n.t('label_login')}</Text>
                    </TouchableOpacity>

                    <KeyboardSpacer topSpacing={30}/>

                </View>
            </ScrollView>
        );
    }
}

export default ViewControl;
