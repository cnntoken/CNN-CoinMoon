import React, {Component} from 'react';
import styles from './styles';
import {Container} from 'native-base';
import {Text, View} from "react-native";
import PropTypes from 'prop-types'
import CustomHeader from '../Components/Header'
import Send from './Send'
import Submit from './Submit'
import Done from './Done'
import Modal from "react-native-modal";
import i18n from 'app/i18n';


class ViewControl extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        onSend2email: PropTypes.func.isRequired,
        onSubmitCode: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            stage: props.navigation.getParam('stage') || 'send',
            sendBtnDisabled: false,
            submitBtnDisabled: false,
            email: props.navigation.getParam('email'),
            // 用于控制是否展示提示输入邮箱验证码的弹层
            showSentCodeTip: !!props.navigation.getParam('stage'),
        };
        console.log(this.state,'1234567890');
    }

    onSend = () => {
        const {email} = this.state;
        console.log('go send verify code');
        this.props.onSend2email({email}, () => {
            this.setState({
                stage: 'submit'
            })
        })
    };
    onSubmit = (code) => {
        const {email} = this.state;
        // console.log('submit verify code');
        this.props.onSubmitCode({email, code}, () => {
            this.setState({
                stage: 'done'
            })
        })
    };
    goBack = () => {
        this.props.navigation.pop();
    };
    // goSettings = ()=>{
    //     console.log('go settings')
    // }
    // goBrowse = ()=>{
    //     console.log('go goBrowse')
    // }

    goLogin = () => {
        this.props.navigation.navigate('Login');
    };


    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                showSentCodeTip: false,
            })
        }, 2000);
    };

    render() {

        let {stage, sendBtnDisabled, submitBtnDisabled, email, showSentCodeTip} = this.state;
        return (
            <Container>

                <CustomHeader onCancel={this.goBack}/>

                <View style={styles.container}>
                    {stage === 'send' && <Send onSubmit={this.onSend} disabled={sendBtnDisabled} email={email}/>}
                    {stage === 'submit' && <Submit onSubmit={this.onSubmit}
                                                   disabled={submitBtnDisabled}
                                                   showSentCodeTip={showSentCodeTip}/>}
                    {stage === 'done' && <Done onSubmit={this.goLogin}/>}
                </View>

                <View>
                    <Modal isVisible={showSentCodeTip}
                           backdropOpacity={0.3}
                    >
                        <View style={{
                            backgroundColor: "#FCFCFC",
                            padding: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 12,
                        }}>
                            <Text style={{
                                color: '#030303',
                                fontSize: 18,
                                lineHeight: 25
                            }}>{i18n.t('page_verify.verify_modal_tip')}</Text>
                        </View>
                    </Modal>
                </View>
            </Container>
        );
    }
}

export default ViewControl;
