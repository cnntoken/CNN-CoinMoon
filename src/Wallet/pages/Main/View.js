import React, { PureComponent } from 'react';
// import AnimatedHeader from 'app/components/Collapsible';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    // TextInput,
    NativeModules,
    // PixelRatio,
    ScrollView,
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Footer,
    Underline,
    List,
    Button,
    Title,
    Spinner,
    InputFocus,
} from '@components/NDLayout';
import Modal from 'react-native-modal';
import Toast from '@components/Toast/index';
import i18n from '@i18n';

const { CNNRNBridgeManage } = NativeModules;

const MOCK_DATA = [
    {
        type: 'eth',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
        name: 'ETH',
        total: 0.0,
    },
    {
        type: 'btc',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
        name: 'BTC',
        total: 0.0,
    },
];

export default class MainControl extends PureComponent {
    state = {
        open1: this.props.user && this.props.user.wallet === 0,
        showSecurity: true,
        open2: false,
        pwd: '',
        canSubmit: false,
        err_txt: false,
        loading: false,
    };
    goBack = async () => {
        CNNRNBridgeManage.closeRNPage({});
    };
    goWalletSearch = () => {
        this.props.navigation.navigate('WalletSearch', {
            prevState: this.props.navigation.state,
        });
    };
    goWalletTransaction = type => {
        this.props.navigation.navigate('WalletTransactionList', {
            prevState: this.props.navigation.state,
            type,
        });
    };
    goBackup = () => {
        this.props.navigation.navigate('WalletCreateBackup', {
            prevState: this.props.navigation.state,
        });
    };
    goTarget = type => {
        this.closeModal('open1');
        if (type === 'create') {
            this.props.navigation.navigate('WalletCreateIndex', {
                prevState: this.props.navigation.state,
            });
        }
        if (type === 'import') {
            this.props.navigation.navigate('WalletImportIndex', {
                prevState: this.props.navigation.state,
            });
        }
    };
    closeModal = key => {
        this.setState({ [key]: false });
    };
    openModal = key => {
        this.setState({ [key]: true });
    };

    laterRemind = () => {
        console.log('laterRemind: ');
        this.setState({
            showSecurity: false,
        });
    };
    inputChange = text => {
        let canSubmit = true;
        if (['', undefined].includes(text)) {
            canSubmit = false;
        }
        if (text.trim().length >= 8) {
            this.setState({
                err_txt: false,
            });
        }
        this.setState({
            pwd: text,
            canSubmit,
        });
    };
    verify = pwd => {
        pwd = pwd.trim();
        if (pwd.length < 8) {
            console.log(pwd, i18n.t('page_register.pwd_len_invalid'));
            this.setState({
                err_txt: true,
            });
            return false;
        }
        return true;
    };
    handlePwd = () => {
        const { pwd } = this.state;
        if (!this.verify(pwd)) {
            return false;
        }
        this.setState({ loading: true });
        this.props.dispatch({
            type: 'WALLET/checkPwd',
            payload: { pwd },
            callback: res => {
                this.closeModal('open2');
                this.setState({ loading: false });
                if (res) {
                    this.goBackup();
                    this.setState({ pwd: '' });
                } else {
                    Toast.show(i18n.t('page_verify.verify_fail'));
                }
            },
        });
    };
    renderItem = item => (
        <TouchableOpacity onPress={() => this.goWalletTransaction(item.type)}>
            <View style={styles.item}>
                <View style={styles.item_center}>
                    <Image
                        source={{ uri: item.icon }}
                        style={styles.prefix_img}
                    />
                    <Text style={styles.item_txt}>{item.name}</Text>
                </View>
                <View>
                    <Text style={styles.sufix_txt1}>
                        {item.total.toFixed(0)}
                    </Text>
                    <Text style={styles.sufix_txt2}>
                        ₩ {item.total.toFixed(2)}
                    </Text>
                </View>
            </View>
            <Underline />
        </TouchableOpacity>
    );

    componentDidMount() {
        // console.log('entry props: ',this.props)
        this.props.dispatch({
            type: 'WALLET/getExample',
            payload: { params: 'test example' },
            callback: res => {
                console.log('callback done', res);
            },
        });
    }
    render() {
        const {
            open1,
            showSecurity,
            open2,
            pwd,
            canSubmit,
            err_txt,
            loading,
        } = this.state;
        return (
            <Container>
                <Header
                    style={styles.header}
                    title={`${i18n.t('page_wallet.total_assets')}(₩)`}
                    leftClick={this.goBack}
                    rightView={
                        <Image source={require('@images/wallet_btn_add.png')} />
                    }
                    rightClick={this.goWalletSearch}
                >
                    <Text style={styles.total}>≈ 00.00</Text>
                </Header>
                <Content>
                    <Underline style={styles.line} />
                    <ScrollView><List dataSource={MOCK_DATA} renderItem={this.renderItem} /></ScrollView>
                    <Modal
                        style={styles.modal}
                        isVisible={open1}
                        onBackdropPress={() => this.closeModal('open1')}
                        onBackButtonPress={() => this.closeModal('open1')}
                    >
                        <View style={styles.modal_open1}>
                            <Title
                                style={{ textAlign: 'center' }}
                                txt={i18n.t('page_wallet.please_select_way')}
                            />
                            <View style={styles.modal_btns}>
                                <Button
                                    style={styles.modal_btn}
                                    onPress={() => this.goTarget('create')}
                                >
                                    <Image
                                        source={require('@images/wallet_icon_setupWallet.png')}
                                    />
                                    <Text style={styles.modal_btn_t}>
                                        {i18n.t('page_wallet.create_wallet')}
                                    </Text>
                                </Button>
                                <Button
                                    style={styles.modal_btn}
                                    onPress={() => this.goTarget('import')}
                                >
                                    <Image
                                        source={require('@images/wallet_icon_import.png')}
                                    />
                                    <Text style={styles.modal_btn_t}>
                                        {i18n.t('page_wallet.import_wallet')}
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        style={styles.modal}
                        isVisible={open2}
                        onBackdropPress={() => this.closeModal('open2')}
                        onBackButtonPress={() => this.closeModal('open2')}
                    >
                        <View style={styles.modal_open2}>
                            <Title
                                style={{ textAlign: 'center' }}
                                txt={i18n.t('page_register.password')}
                            />
                            <View style={styles.modal_form}>
                                <InputFocus
                                    autoFocus={true}
                                    style={styles.form_pwd}
                                    placeholder={i18n.t(
                                        'page_register.password',
                                    )}
                                    value={pwd}
                                    onChangeText={this.inputChange}
                                />
                                <Text style={styles.err_txt}>
                                    {err_txt
                                        ? i18n.t(
                                              'page_register.pwd_len_invalid',
                                          )
                                        : ' '}
                                </Text>
                                <Button
                                    key={canSubmit}
                                    style={styles.form_btn}
                                    disabled={!canSubmit}
                                    onPress={this.handlePwd}
                                >
                                    {loading ? (
                                        <Spinner color="#fff" />
                                    ) : (
                                        <Text style={styles.modal_btn_t}>
                                            {i18n.t('label_submit')}
                                        </Text>
                                    )}
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Content>
                <Footer style={showSecurity && styles.footer}>
                    {showSecurity ? (
                        <View style={styles.security}>
                            <View style={styles.security_head}>
                                <View style={styles.security_head_t} />
                                <Title
                                    txt={i18n.t(
                                        'page_wallet.security_reminder',
                                    )}
                                />
                                <TouchableOpacity onPress={this.laterRemind}>
                                    <Text style={styles.security_head_t}>
                                        {i18n.t('page_wallet.later_reminder')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.security_content}>
                                    {i18n.t('page_wallet.security_tips')}
                                </Text>
                            </View>
                            <View style={styles.security_btn_view}>
                                <Button
                                    style={styles.security_btn}
                                    onPress={() => this.openModal('open2')}
                                >
                                    <Text style={styles.btn_txt}>
                                        {i18n.t('page_wallet.backup_mnemonic')}
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    ) : (
                        <Button
                            onPress={this.handleImport}
                            // styleDisabled={{}}
                            // disabled={true}
                            style={styles.btn_box}
                        >
                            <Text style={styles.btn_txt}>
                                {i18n.t('page_wallet.import_wallet_btc')}
                            </Text>
                        </Button>
                    )}
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    btn_box: {
        backgroundColor: '#408EF5',
        height: 50,
    },
    btn_txt: {
        color: '#fff',
    },
    header: {
        backgroundColor: '#408EF5',
        height: 106,
        justifyContent: 'space-between',
        // overflow: 'hidden',
    },
    item: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    item_center: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    item_txt: {
        fontSize: 18,
        marginLeft: 10,
        textAlign: 'left',
    },
    line: {
        backgroundColor: '#f5f5f5',
        height: 10,
    },
    prefix_img: {
        height: 40,
        width: 40,
    },
    sufix_txt1: {
        color: '#333',
        fontSize: 18,
        textAlign: 'right',
    },
    sufix_txt2: {
        color: '#999',
        fontSize: 13,
        textAlign: 'right',
    },
    text_w: {
        color: '#fff',
    },
    title: {
        color: '#fff',
        fontSize: 18,
    },
    total: {
        color: '#fff',
        fontSize: 30,
        marginBottom: 24,
    },
    modal: {
        margin: 0,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        // alignItems: 'center',
    },
    modal_open1: {
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 30,
        paddingBottom: 20,
        borderRadius: 8,
        // height: 170,
        backgroundColor: '#fff',
    },
    modal_btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 36,
    },
    modal_btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#408EF5',
        flex: 0,
        height: 62,
        width: 150,
        borderRadius: 8,
    },
    modal_btn_t: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    modal_open2: {
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 30,
        paddingBottom: 20,
        borderRadius: 8,
        // height: 200,
        backgroundColor: '#fff',
    },
    modal_form: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
    },
    err_txt: {
        color: '#f00',
        lineHeight: 19,
    },
    form_pwd: {
        marginBottom: 10,
        width: '100%',
        fontSize: 16,
    },
    form_btn: {
        flex: 0,
        borderRadius: 16,
        backgroundColor: '#408EF5',
        marginTop: 20,
        height: 56,
        width: '100%',
    },
    footer: {
        paddingLeft: 12,
        paddingRight: 12,
    },
    security: {
        backgroundColor: 'rgba(64,142,245,0.1)',
        borderRadius: 8,
        justifyContent: 'center',
        padding: 15,
        minHeight: 150,
    },
    security_head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    security_head_t: {
        color: '#408EF5',
        fontSize: 13,
        width: 60,
    },
    security_content: {
        color: '#333',
        fontSize: 11,
        marginBottom: 15,
        lineHeight: 15,
    },
    security_btn_view: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    security_btn: {
        width: 100,
        backgroundColor: '#408EF5',
        borderRadius: 8,
    },
});
