import React, {Component} from 'react';
import styles from './styles';
import { View, Text,Button} from 'native-base';
import PropTypes from 'prop-types'
import FocusInput from '../Components/InputFocus'

  
class ViewControl extends Component {
    static propTypes = {
        disabled:  PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired
    }
    state = {
        code: ''
    }
    onChange = (text)=>{
        this.setState({
            code: text
        })
    }
    onSubmit = ()=>{
        this.props.onSubmit(this.state.code)
    }
    render() {
        const { disabled } = this.props;
        const { code } = this.state;
        return (
            <View>
                <Text style={styles.label}>请输入验证码</Text>
                <FocusInput
                    style={{marginTop:33}}
                    value={code}
                    onChangeText={this.onChange}
                    placeholder='请输入验证码' 
                    keyboardType='email-address' 
                    textContentType='emailAddress'
                 />
                <Button block full rounded style={[styles.btn,styles.codebtn, disabled && styles.btnDisabled]} disabled={disabled} onPress={this.onSubmit}>
                    <Text>发送验证码</Text>
                </Button>
            </View>
        );
    }
}

export default ViewControl;
