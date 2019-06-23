import React, { PureComponent } from 'react'
import { 
    Image,
    Text,
    View,
    StyleSheet,
    // TextInput,
    // PixelRatio,
 } from "react-native";

import {
    Container,
    Header,
    Content,
    Footer,
    // Underline,
    // List,
    Button,
    Title,
} from '@components/NDLayout'
// import Toast from '@components/Toast/index'
import i18n from '@i18n';
import {cnnLogger} from '@utils/index';

export default class ViewControl extends PureComponent {
    
    goWalletBackup = ()=>{
        // 点击备份助记词
        cnnLogger('click_backup',{
            page: 'create index'
        })
        const {mnemonic} = this.props.navigation.state.params
        this.props.navigation.navigate('WalletCreateBackup', {
            prevState: this.props.navigation.state,
            mnemonic,
        });
    }
    handleLater = ()=>{
        console.log('handleLater: ')
        this.props.navigation.navigate('WalletMain', {
            prevState: this.props.navigation.state,
        });
    }
    render() {
        return (
            <Container>
                <Header 
                    leftClick={this.handleLater}
                    leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                                style={{ width: 12, height: 23 }}
                            />}
                    rightView={<Text style={styles.header_right}>{i18n.t('page_wallet.later_backup')}</Text>}
                    rightClick={this.handleLater}

                />
                <Content>
                    <View style={styles.tips}>
                        <Image
                            source={require('@images/wallet_img_01.png')}
                        />
                        <Title style={styles.tips_title} txt={i18n.t('page_wallet.backup_mnemonic')} />
                        <Text style={styles.tips_txt}>{i18n.t('page_wallet.backup_info_start')}</Text>
                    </View>
                </Content>
                <Footer style={styles.footer}>
                    <View style={styles.notice}>
                        <Image 
                            source={require('@images/icon_tip.png')}
                        />
                        <Text style={styles.notice_t}>{i18n.t('page_wallet.backup_warn')}</Text>
                    </View>
                    <View style={styles.btn_view}>
                        <Button style={styles.btn} onPress={this.goWalletBackup}>
                            <Text style={styles.color_w}>{i18n.t('page_wallet.backup_mnemonic')}</Text>
                        </Button>
                    </View>
                </Footer>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    color_w: {
        color: '#fff',
        fontSize: 18,
    },
    header_right: {
        color: '#408EF5',
        fontSize: 16,
    },
    tips: {
        paddingTop: 17,
        paddingLeft: 24,
        paddingRight: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tips_title: {
        color: '#333',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 8,
    },
    tips_txt: {
        color: '#333',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 19,
    },
    footer: {
        flexDirection: 'column',
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 17,
    },
    notice_t: {
        color: '#666',
        fontSize: 13,
        marginLeft: 5,
    },
    btn_view: {
        height: 56,
        width: '100%',
    },
    btn: {
        borderRadius: 16,
        backgroundColor: '#408EF5',
    }
});