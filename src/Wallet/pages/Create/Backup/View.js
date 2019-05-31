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
    Footer,
    // Underline,
    // List,
    Button,
    Title,
} from '@components/NDLayout';
// import Toast from '@components/Toast/index'
import i18n from '@i18n';

export default class ViewControl extends PureComponent {
    state = {
        mnemonic:
            'pole kiwi ignore occur dolphin leisure sock aisle knock weapon book sand',
    };
    goBack = () => {
        this.props.navigation.pop();
    };
    goWalletBackupDone = () => {
        const { mnemonic } = this.state;
        this.props.navigation.navigate('WalletCreateBackupDone', {
            prevState: this.props.navigation.state,
            mnemonic,
        });
    };

    render() {
        const { mnemonic } = this.state;
        return (
            <Container>
                <Header
                    leftView={
                        <Image
                            source={require('@images/icon_back_black.png')}
                        />
                    }
                    title={() => (
                        <Title txt={i18n.t('page_wallet.backup_mnemonic')} />
                    )}
                />
                <Content>
                    <View style={styles.tips}>
                        <Image source={require('@images/wallet_img_02.png')} />
                        <Title
                            style={styles.tips_title}
                            txt={i18n.t('page_wallet.backup_mnemonic')}
                        />
                        <Text style={styles.tips_txt}>
                            {i18n.t('page_wallet.backup_info_done')}
                        </Text>
                        <View style={styles.words_view}>
                            <Text style={styles.words}>{mnemonic}</Text>
                        </View>
                    </View>
                </Content>
                <Footer>
                    <Button
                        style={styles.btn}
                        onPress={this.goWalletBackupDone}
                    >
                        <Text style={styles.color_w}>
                            {i18n.t('page_wallet.next_step')}
                        </Text>
                    </Button>
                </Footer>
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
        marginTop: 19,
    },
    tips_txt: {
        color: '#333',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 19,
    },
    words_view: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 15,
        marginTop: 19,
        width: '100%',
    },
    words: {
        color: '#408EF5',
        fontSize: 18,
        lineHeight: 25,
    },
    btn: {
        borderRadius: 16,
        backgroundColor: '#408EF5',
        height: 56,
    },
});
