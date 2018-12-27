import React, {Component} from 'react';
import styles from './styles';
import {Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, View, Text,Button, Label} from 'native-base';
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import FocusInput from '../Components/InputFocus'

  
class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    }
    state = {
        info: {},
        isAgree: true
    }
    onChangeEmail = (text)=>{
        const {info} = this.state;
        info.email = text;
        this.setState({
            info: {...info}
        })
    }
    onChangePassword = (text)=>{
        const {info} = this.state;
        info.password = text;
        this.setState({
            info: {...info}
        })
    }
    onChangePassword2 = (text)=>{
        const {info} = this.state;
        info.password2 = text;
        this.setState({
            info: {...info}
        })
    }
    onRegister = ()=>{
        const {info} = this.state;
        console.log(info)
    }
    goBack = ()=>{
        console.log('goback')
        this.props.navigation.pop()
    }
    goLogin = ()=>{
        this.goBack()
    }
    toggleLincense = ()=>{
        this.setState(({isAgree})=>({
            isAgree: !isAgree
        }))
    }
    showLincense = ()=>{
        console.log('show lincense')
    }
    componentDidMount(){
        
    }
    render() {
        const {info,isAgree} = this.state;
        const isBtnDisabled = (info.email && info.password && isAgree) ? false : true;
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <View style={styles.container}>
                    <Text style={styles.label}>注册账户</Text>
                    <KeyboardAvoidingView style={styles.main}>
                        <FocusInput
                            style={styles.item}
                            value={info.email}
                            onChangeText={this.onChangeEmail}
                            placeholder='请输入邮箱地址' 
                            keyboardType='email-address' 
                            textContentType='emailAddress'
                        />
                        <FocusInput
                            style={styles.item}
                            value={info.password}
                            onChangeText={this.onChangePassword}
                            placeholder='请输入密码'
                            kclearButtonMode='while-editing'
                            textContentType='password'
                        />
                        <FocusInput
                            style={styles.item}
                            value={info.password2}
                            onChangeText={this.onChangePassword2}
                            placeholder='请再次输入密码'
                            kclearButtonMode='while-editing'
                            textContentType='password'
                        />
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={[styles.licenseBox,styles.text1]} onPress={this.toggleLincense}>
                                <Image style={styles.agree} source={isAgree ? require('./img/checkbox_checked.png') : require('./img/checkbox_normal.png')} />
                                <Text>点击注册自动同意各项</Text>
                                <TouchableOpacity onPress={this.showLincense}><Text style={[styles.highlight]}>隐私政策</Text></TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                        
                        <Button block full rounded style={[styles.btn, isBtnDisabled && styles.btnDisabled]} disabled={isBtnDisabled} onPress={this.onRegister}>
                            <Text>注 册</Text>
                        </Button>
                    </KeyboardAvoidingView>
                    <View style={[styles.textBox,styles.text2]}>
                        <Text>已有账号，去</Text><TouchableOpacity onPress={this.goLogin}><Text style={styles.highlight}>登录</Text></TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}

export default ViewControl;
