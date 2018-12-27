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
        navigation: PropTypes.object.isRequired
    }
    state = {
        stage: 'send',
        sendBtnDisabled: false,
        submitBtnDisabled: false
    }
    onSend = ()=>{
        console.log('go send verify code')
        this.setState({
            stage: 'submit'
        })
    }
    onSubmit = ()=>{
        console.log('submit verify code')
        this.setState({
            stage: 'done'
        })
    }
    goBack = ()=>{
        console.log('goback')
        this.props.navigation.pop()
    }
    goSettings = ()=>{
        console.log('go settings')
    }
    goBrowse = ()=>{
        console.log('go goBrowse')
    }
    render() {
        const {stage,sendBtnDisabled,submitBtnDisabled} = this.state;
        return (
            <Container>
                <CustomHeader onCancel={this.goBack}/>
                <View style={styles.container}>
                    {stage === 'send' && <Send onSubmit={this.onSend} disabled={sendBtnDisabled}/>}
                    {stage === 'submit' && <Submit onSubmit={this.onSubmit} disabled={submitBtnDisabled}/>}
                    {stage === 'done' && <Done onBrowse={this.goBrowse} onSet={this.goSettings}/>}
                </View>
            </Container>
        );
    }
}

export default ViewControl;
