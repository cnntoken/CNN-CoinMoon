import React, {Component} from 'react';
import styles from './styles';
import { View, Text,Button} from 'native-base';
import PropTypes from 'prop-types'

  
class ViewControl extends Component {
    static propTypes = {
        disabled:  PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        email: PropTypes.string.isRequired
    }
    render() {
        const { disabled, onSubmit, email } = this.props;
        return (
            <View>
                <Text style={styles.label}>验证邮箱</Text>
                <View>
                    <Text style={{fontSize:16,color:'#333'}}>点击发送验证码按钮，我们将向您的邮箱 {email} 发送验证邮件</Text>
                </View>
                <Button block full rounded style={[styles.btn, disabled && styles.btnDisabled]} disabled={disabled} onPress={onSubmit}>
                    <Text>发送验证码</Text>
                </Button>
            </View>
        );
    }
}

export default ViewControl;
