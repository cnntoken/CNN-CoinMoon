import React, { PureComponent } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    // TextInput,
    // PixelRatio,
} from 'react-native';

import {
    Container,
    Header,
    Content,
    // Footer,
    // Underline,
    // List,
    Button,
    Title,
    InputFocus,
} from '@components/NDLayout';
import Toast from '@components/Toast/index';
import i18n from '@i18n';

export default class ViewControl extends PureComponent {
    state = {
        pwd: '',
        pwd2: '',
        canSubmit: false,
    };
    goBack = () => {
        this.props.navigation.pop();
    };
    checkPwd = (pwd, pwd2) => {
        return pwd === pwd2;
    };
    pwdChange = (key, value) => {
        let { pwd, pwd2 } = this.state;
        if (key === 'pwd') {
            pwd = value;
        }
        if (key === 'pwd2') {
            pwd2 = value;
        }
        let canSubmit = true;
        if (['', undefined].includes(pwd) || ['', undefined].includes(pwd2)) {
            canSubmit = false;
        }
        this.setState({
            [key]: value,
            canSubmit,
        });
    };
    handleSubmit = () => {
        const { pwd, pwd2 } = this.state;
        if (!this.checkPwd(pwd, pwd2)) {
            Toast.show(i18n.t('page_register.pwd_eq_invalid'));
            return false;
        }
        console.log('handleSubmit: ', pwd);
        this.props.navigation.navigate('WalletCreateDone', {
            prevState: this.props.navigation.state,
        });
    };
    render() {
        const { pwd, pwd2, canSubmit } = this.state;
        return (
            <Container>
                <Header
                    leftView={
                        <Image
                            source={require('@images/icon_back_black.png')}
                        />
                    }
                    title={() => (
                        <Title txt={i18n.t('page_wallet.create_wallet')} />
                    )}
                />
                <Content>
                    <View style={styles.tips}>
                        <Image source={require('@images/wallet_img_tip.png')} />
                        <View style={styles.tips_view}>
                            <Text style={styles.tips_t}>
                                {i18n.t('page_wallet.create_tips')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <InputFocus
                            secureTextEntry={true}
                            style={styles.form_pwd}
                            placeholder={i18n.t('page_register.password')}
                            value={pwd}
                            onChangeText={value => this.pwdChange('pwd', value)}
                        />
                        <InputFocus
                            secureTextEntry={true}
                            style={styles.form_pwd}
                            placeholder={i18n.t('page_register.re_password')}
                            value={pwd2}
                            onChangeText={value =>
                                this.pwdChange('pwd2', value)
                            }
                        />
                        <View style={styles.form_btn_view}>
                            <Button
                                key={canSubmit}
                                style={styles.form_btn}
                                disabled={!canSubmit}
                                onPress={this.handleSubmit}
                            >
                                <Text style={styles.color_w}>
                                    {i18n.t('label_submit')}
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    color_w: {
        color: '#fff',
        fontSize: 18,
    },
    tips: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 15,
        paddingLeft: 12,
        paddingRight: 12,
    },
    tips_view: {
        backgroundColor: '#FFE019',
        borderRadius: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 8,
        marginTop: 5,
        width: '100%',
    },
    tips_t: {
        color: '#333',
        fontSize: 11,
        textAlign: 'center',
    },
    form: {
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
    },
    form_pwd: {
        marginBottom: 10,
        width: '100%',
        fontSize: 16,
    },
    form_btn_view: {
        marginTop: 20,
        height: 56,
        width: '100%',
        overflow: 'hidden',
    },
    form_btn: {
        borderRadius: 16,
        backgroundColor: '#408EF5',
    },
});
