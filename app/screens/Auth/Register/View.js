import React, {Component} from 'react';
import styles from './styles';
import {Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import { Container,View, Text,Button} from 'native-base';
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import FocusInput from '../Components/InputFocus'
import {$toast} from 'app/utils'
import i18n from 'app/i18n';
  
class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        onRegister: PropTypes.func.isRequired
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
    check = ()=>{
        const {info} = this.state;
        if(!/\w+@\w+\.\w+/.test(info.email)){
            $toast('邮箱格式不对')
            return false
        }
        if(!info.password || info.password.length < 8){
            $toast('密码不能少于8位')
            return false
        }
        if(info.password !== info.password2){
            $toast('密码不一致')
            return false
        }
        return true;
    }
    onRegister = ()=>{
        if(this.check()){
            console.log('all right')
            const {info} = this.state;
            this.props.onRegister({email: info.email, password: info.password},()=>{
                this.goBack()
            });
            $toast('正在提交, 请稍后!!!')
        }
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
                    <Text style={styles.label}>{i18n.t('page_register.register_account')}</Text>
                    <KeyboardAvoidingView style={styles.main}>
                        <FocusInput
                            style={styles.item}
                            value={info.email}
                            onChangeText={this.onChangeEmail}
                            placeholder={i18n.t('page_register.email')} 
                            keyboardType='email-address' 
                            textContentType='emailAddress'
                        />
                        <FocusInput
                            style={styles.item}
                            value={info.password}
                            secureTextEntry={true}
                            onChangeText={this.onChangePassword}
                            placeholder={i18n.t('page_register.password')}
                            kclearButtonMode='while-editing'
                            textContentType='password'
                        />
                        <FocusInput
                            style={styles.item}
                            value={info.password2}
                            secureTextEntry={true}
                            onChangeText={this.onChangePassword2}
                            placeholder={i18n.t('page_register.re_password')}
                            kclearButtonMode='while-editing'
                            textContentType='password'
                        />
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={[styles.licenseBox,styles.text1]} onPress={this.toggleLincense}>
                                <Image style={styles.agree} source={isAgree ? require('./img/checkbox_checked.png') : require('./img/checkbox_normal.png')} />
                                <Text>{i18n.t('page_register.license')}</Text>
                                {/* <TouchableOpacity onPress={this.showLincense}><Text style={[styles.highlight]}>隐私政策</Text></TouchableOpacity> */}
                            </TouchableOpacity>
                        </View>
                        
                        <Button block full rounded style={[styles.btn, isBtnDisabled && styles.btnDisabled]} disabled={isBtnDisabled} onPress={this.onRegister}>
                            <Text>{i18n.t('page_register.register')}</Text>
                        </Button>
                    </KeyboardAvoidingView>
                    <View style={[styles.textBox,styles.text2]}>
                        <TouchableOpacity onPress={this.goLogin}><Text style={styles.highlight}>{i18n.t('page_register.go_login')}</Text></TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}

export default ViewControl;
