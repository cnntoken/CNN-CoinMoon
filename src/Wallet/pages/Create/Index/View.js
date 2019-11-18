import React, { PureComponent } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    // KeyboardAvoidingView,
    // Platform,
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
    Spinner,
    Button,
    Title,
    InputFocus,
    KeyBoard,
} from '@components/NDLayout';
import {$toast,cnnLogger} from '@utils/index';
import i18n from '@i18n';
import service from '@services/wallet/index';

export default class ViewControl extends PureComponent {
    state = {
        pwd: '',
        pwd2: '',
        canSubmit: false,
        loading: false,
    };
    _allLayouts = {}
    currentTarget = null
    goBack = ()=>{
        if(!this.state.loading){
            this.props.navigation.goBack();
        }
    }
    
    checkPwd = (pwd, pwd2) => {
        pwd = pwd.trim()
        pwd2 = pwd2.trim()
        if(pwd !== pwd2){
            $toast(i18n.t('page_wallet.pwd_eq_invalid'));
            return false;
        }
        if(pwd.length < 8){
            $toast(i18n.t('page_wallet.pwd_len_invalid'));
            return false;
        }
        return pwd;
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
    handleSubmit = async () => {
        if(this.state.loading){
            return false;
        }
        const { pwd, pwd2 } = this.state;
        // 点击创建钱包页面的提交按钮
        cnnLogger('submit_wallet')
        const checked = this.checkPwd(pwd, pwd2)
        if (!checked) {
            $toast(i18n.t('page_wallet.pwd_eq_invalid'))
            // 创建失败
            cnnLogger('create_wallet_failed',{
                reason: 'entered passwords diff',
            })
            return false;
        }
        this.setState({loading: true},()=>{
            
            setTimeout(async()=>{
                try {
                    const mnemonic = await service.createWalletByPassword(checked); // 返回助记词, 传递到备份页面
                    // 创建成功
                    cnnLogger('create_wallet_success')
                    this.props.navigation.navigate('WalletCreateDone', {
                        prevState: this.props.navigation.state,
                        mnemonic,
                    });
                } catch (e) {
                    $toast(String(e));
                    $toast(String(e.stack));
                    console.error(e.stack);
                    $toast(i18n.t('page_wallet.create_wallet_fail'))
                    // 创建失败
                    cnnLogger('create_wallet_failed',{
                        reason: 'get mnemonic err'
                    })
                }
            },150)
        })
        
    };
    render() {
        const { pwd, pwd2, canSubmit, loading } = this.state;
        return (
        
            <Container>
                <Header
                    leftView={
                        <Image
                            source={require('@images/icon_back_black.png')}
                            style={{ width: 12, height: 23 }}
                        />
                    }
                    leftClick={this.goBack}
                    title={ <Title txt={i18n.t('page_wallet.create_wallet')} />}
                />
                {this.state.stack ? <Content><Text>{this.state.stack }</Text></Content> : 
                <Content>
                    <KeyBoard calcScroll2={()=>'bottom'}>
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
                                placeholder={i18n.t('page_wallet.password')}
                                value={pwd}
                                onChangeText={value => this.pwdChange('pwd', value)}
                                handleFocus={this.handleFocus}
                                onLayout={this.handleLayout}
                                
                            />
                            <InputFocus
                                secureTextEntry={true}
                                style={styles.form_pwd}
                                placeholder={i18n.t('page_wallet.re_password')}
                                value={pwd2}
                                onChangeText={value => this.pwdChange('pwd2', value)}
                                handleFocus={this.handleFocus}
                                onLayout={this.handleLayout}
                                
                            />
                            <View style={styles.form_btn_view}>
                                <Button
                                    key={canSubmit}
                                    style={styles.form_btn}
                                    disabled={!canSubmit}
                                    onPress={this.handleSubmit}
                                >
                                    {loading?<Spinner color='#fff' />:<Text style={styles.color_w}>
                                        {i18n.t('label_submit')}
                                    </Text>}
                                </Button>
                            </View>
                        </View>
                    </KeyBoard>
                </Content>}
                
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
        marginBottom: 20,
    },
    form_btn: {
        borderRadius: 16,
        backgroundColor: '#408EF5',
    },
});
