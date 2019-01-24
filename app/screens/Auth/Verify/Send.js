import React, {Component} from 'react';
import styles from './styles';
import { View, Text,Button} from 'native-base';
import PropTypes from 'prop-types'
import i18n from 'app/i18n';
  
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
                <Text style={styles.label}>{i18n.t('page_verify.email_verify')}</Text>
                <View>
                    <Text style={{fontSize:16,color:'#333'}}>{i18n.t('page_verify.email_verify_text',{email})}</Text>
                </View>
                <Button block full rounded style={[styles.btn, disabled && styles.btnDisabled]} disabled={disabled} onPress={onSubmit}>
                    <Text>{i18n.t('page_verify.email_verify_send')}</Text>
                </Button>
            </View>
        );
    }
}

export default ViewControl;
