import React, {Component} from 'react';
import styles from './styles';
import {Alert} from 'react-native';
import {Container, Content, Form, View, Text, Button} from 'native-base';
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import FocusInput from '../Components/InputFocus'
import {$toast} from 'app/utils'
import i18n from 'app/i18n';

// import {login} from '../service'

class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        onLogin: PropTypes.func.isRequired,
        // setUserInfo: PropTypes.func.isRequired,
    }
    state = {
        info: {}
    }
    onChangeEmail = (text) => {
        const {info} = this.state;
        info.email = text;
        this.setState({
            info: {...info}
        })
    }
    onChangePassword = (text) => {
        const {info} = this.state;
        info.password = text;
        this.setState({
            info: {...info}
        })
    };
    check = () => {
        const {info} = this.state;
        if (!/\w+@\w+\.\w+/.test(info.email)) {
            $toast('邮箱格式不对');
            return false
        }
        if (!info.password || info.password.length < 8) {
            $toast('密码不能少于8位');
            return false
        }
        return true;
    };
    onLogin = async () => {
        if (!this.check()) {
            return false
        }
        const {info} = this.state;
        // todo 国际化
        $toast('正在登录, 请稍后!!!');
        this.props.onLogin({email: info.email, password: info.password}, (e) => {
            if (e) {
                if (e.code === 'UserNotConfirmedException') {
                    Alert.alert(
                        'Notice',
                        e.message,
                        [
                            {text: '去验证', onPress: () => this.goVerify(info.email)},
                            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                        ],
                        {cancelable: false}
                    )
                } else {
                    $toast(`登录失败: ${e.message}`)
                }
            } else {
                // todo 国际化
                $toast('登录成功');
                let prevState = this.props.navigation.getParam('prevState');
                if (prevState) {
                    this.props.navigation.navigate(prevState.routeName, prevState.params)
                } else {
                    this.goBack()
                }

            }
        });
    }
    goRegister = () => {
        this.props.navigation.navigate('Register')
    }
    goVerify = (email) => {
        this.props.navigation.navigate('Verify', {email})
    }
    goBack = () => {
        console.log('goback')
        this.props.navigation.pop()
    }

    render() {
        const {info} = this.state;
        const isBtnDisabled = (info.email && info.password) ? false : true;
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <Content style={styles.container}>
                    <Text style={styles.label}>{i18n.t('label_please_login')}</Text>
                    <Form>
                        <FocusInput
                            style={styles.item}
                            value={info.email}
                            onChangeText={this.onChangeEmail}
                            placeholder={i18n.t('page_login.email')}
                            keyboardType='email-address'
                            textContentType='emailAddress'
                        />
                        <FocusInput
                            style={styles.item}
                            value={info.password}
                            secureTextEntry={true}
                            onChangeText={this.onChangePassword}
                            placeholder={i18n.t('page_login.password')}
                            kclearButtonMode='while-editing'
                            textContentType='password'
                        />
                    </Form>
                    <Button block full rounded style={[styles.loginBth, isBtnDisabled && styles.loginBthDisabled]}
                            disabled={isBtnDisabled}
                            onPress={this.onLogin}><Text>{i18n.t('label_login')}</Text></Button>
                    <View style={styles.registerBtn}>
                        <Button transparent onPress={this.goRegister}><Text
                            style={styles.register}>{i18n.t('page_login.email_register')}</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ViewControl;
