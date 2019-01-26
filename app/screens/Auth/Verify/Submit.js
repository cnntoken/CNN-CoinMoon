import React, {Component} from 'react';
import styles from './styles';
import {View, Text, Button} from 'native-base';
import PropTypes from 'prop-types'
import FocusInput from '../Components/InputFocus'

import i18n from 'app/i18n';

class ViewControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        }
    }

    static propTypes = {
        disabled: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired
    };
    onChange = (text) => {
        this.setState({
            code: text
        })
    };
    onSubmit = () => {
        if (this.state.code) {
            this.props.onSubmit(this.state.code)
        }
    };


    render() {
        const {disabled, showSentCodeTip} = this.props;
        const {code} = this.state;

        return (
            <View>
                <Text style={styles.label}>{i18n.t('page_verify.code_input')}</Text>
                <FocusInput
                    style={{marginTop: 33}}
                    value={code}
                    onChangeText={this.onChange}
                    placeholder={i18n.t('page_verify.code_input_placeholder')}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                />
                <Button block full rounded style={[styles.btn, styles.codebtn, disabled && styles.btnDisabled]}
                        disabled={disabled} onPress={this.onSubmit}>
                    <Text>{i18n.t('label_submit')}</Text>
                </Button>
            </View>
        );
    }
}

export default ViewControl;
