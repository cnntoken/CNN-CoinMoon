import React, {Component} from 'react';
import styles from './styles';
import {Image, TouchableOpacity, DeviceEventEmitter, View, Text} from 'react-native';

import areas from '../data/phone_area';
import CustomHeader from '../components/Header'
import FocusInput from '../components/InputFocus'
import {$toast} from '../utils'
import i18n from '../i18n';
import Picker from 'react-native-picker';
import {closeRNPage, goRNPage, setUserInfo} from '../utils/CNNBridge'


class ViewControl extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
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
        this.setState(({isAgree}) => ({
            isAgree: !isAgree
        }))
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
                    $toast(i18n.t('page_login.login_success'));
                    setUserInfo(data).then(() => {
                        this.goBack();
                        // 重新登陆后更新各频道列表中的数据
                        DeviceEventEmitter.emit('userStateChange', data);
                    });
                }
                // 登录失败
                else {
                    $toast(i18n.t('page_login.login_fail'));
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

    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }

    render() {
        const {isAgree, phone, code, countdown} = this.state;

        return (
            <View>
                <CustomHeader
                    onLeftClick={this.goBack}
                    style={{backgroundColor: '#fff'}}
                    leftView={<Text style={styles.cancel}>{i18n.t('label_cancel')}</Text>}
                    titleView={<Image source={require('../images/logo_small.png')} style={{width: 74, height: 40}}/>}
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

                    {/* 其他登录方式 */}
                    {/*<View style={styles.loginByOthers}>*/}
                    {/*<Text style={styles.line}/>*/}
                    {/*<Text style={styles.line_text}>Sign in with</Text>*/}
                    {/*<Text style={styles.line}/>*/}
                    {/*</View>*/}

                    {/*<View style={styles.loginByOthersBtns}>*/}
                    {/*<TouchableOpacity>*/}
                    {/*<Image style={styles.fb}*/}
                    {/*source={require('app/images/icon_fb.png')}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity>*/}
                    {/*<Image style={styles.googlePlus}*/}
                    {/*source={require('app/images/icon_google+.png')}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View>*/}


                </View>
            </View>
        );
    }

}

export default ViewControl;
