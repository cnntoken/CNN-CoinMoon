import React, {Component} from 'react';
import styles from './styles';
import { Container, Content, Form,View, Text,Button} from 'native-base';
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import FocusInput from '../Components/InputFocus'

  
class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    }
    state = {
        info: {}
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
    onLogin = ()=>{
        const {info} = this.state;
        console.log(info)
    }
    goRegister = ()=>{
        this.props.navigation.navigate('Register')
    }
    goBack = ()=>{
        console.log('goback')
        this.props.navigation.pop()
    }
    render() {
        const { info} = this.state;
        const isBtnDisabled = (info.email && info.password) ? false : true;
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <Content style={styles.container}>
                    <Text style={styles.label}>请登录</Text>
                    <Form>
                        <FocusInput
                            style={styles.item}
                            value={info.email}
                            onChangeText={this.onChangeEmail}
                            placeholder='邮箱' 
                            keyboardType='email-address' 
                            textContentType='emailAddress'
                        />
                        <FocusInput
                            style={styles.item}
                            value={info.password}
                            onChangeText={this.onChangePassword}
                            placeholder='密码' 
                            kclearButtonMode='while-editing'
                            textContentType='password'
                        />
                    </Form>
                    <Button block full rounded style={[styles.loginBth, isBtnDisabled && styles.loginBthDisabled]} disabled={isBtnDisabled} onPress={this.onLogin}><Text>登录</Text></Button>
                    <View style={styles.registerBtn}>
                        <Button transparent onPress={this.goRegister}><Text style={styles.register}>邮箱注册</Text></Button>
                    </View>
                    
                </Content>
            </Container>
        );
    }
}

export default ViewControl;
