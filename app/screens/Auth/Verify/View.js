import React, {Component} from 'react';
import styles from './styles';
import { Container, View} from 'native-base';
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import Send from './Send'
import Submit from './Submit'
import Done from './Done'


class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        onSend2email: PropTypes.func.isRequired,
        onSubmitCode: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            // stage: 'send',
            stage: 'submit',
            sendBtnDisabled: false,
            submitBtnDisabled: false,
            email: props.navigation.getParam('email', '')
        }
    }
    onSend = ()=>{
        const {email} = this.state;
        console.log('go send verify code')
        this.props.onSend2email({email},()=>{
            this.setState({
                stage: 'submit'
            })
        })
    }
    onSubmit = (code)=>{
        const {email} = this.state;
        console.log('submit verify code')
        this.props.onSubmitCode({email,code},()=>{
            this.setState({
                stage: 'done'
            })
        })
    }
    goBack = ()=>{
        console.log('goback')
        this.props.navigation.pop()
    }
    // goSettings = ()=>{
    //     console.log('go settings')
    // }
    // goBrowse = ()=>{
    //     console.log('go goBrowse')
    // }
    goLogin = ()=>{
        this.goBack()
    }
    render() {
        const {stage,sendBtnDisabled,submitBtnDisabled,email} = this.state;
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <View style={styles.container}>
                    {stage === 'send' && <Send onSubmit={this.onSend} disabled={sendBtnDisabled} email={email}/>}
                    {stage === 'submit' && <Submit onSubmit={this.onSubmit} disabled={submitBtnDisabled}/>}
                    {stage === 'done' && <Done onSubmit={this.goLogin}/>}
                </View>
            </Container>
        );
    }
}

export default ViewControl;
