import React, { PureComponent } from 'react';
// import AnimatedHeader from 'app/components/Collapsible';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    // TextInput,
    // PixelRatio,
    ScrollView,
    Dimensions,
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
    Modal,
    // Switch,
} from '@components/NDLayout/index';
// import Modal from 'react-native-modal';
import i18n from '@i18n';
import service from '@services/wallet/index';
import FastImage from 'react-native-fast-image';
import {closeRNPage} from '@utils/CNNBridge';
import {cnnLogger,$toast} from '@utils/index';

const {width: viewWidth} = Dimensions.get('window');
export default class MainControl extends PureComponent {
    state = {
        open1: false, // 显示导入dialog
        showSecurity: false, // 显示助记词备份
        open2: false, // 备份助记词需要输入密码
        showImport: null, // 底部显示导入btc/eth按钮
        // list: [],
        pwd: '',
        canSubmit: false,
        err_txt: false,
        submiting: false,
        loading: false,
    }
    componentDidMount(){
        // 从其他页面返回来时请求数据，重新渲染
        this.reRender = this.props.navigation.addListener('willFocus', () => {
            this.initWallet();
        })
    }
    componentWillUnmount() {
        this.reRender;
        this.setState = () => {
            return;
        };
    }
    // 退出rn页面
    goBack = () => {
        // this.closeModal('open1')
        closeRNPage()
        // if(this.state.open1){
        //     this.setState({
        //         open1: false,
        //     },()=>{
        //         closeRNPage()
        //     })
        // }else{
        //     closeRNPage()
        // }
    };
    // 进入添加币种的搜索页面
    goWalletSearch = () => {
        // 点击添加加密货币按钮
        cnnLogger('click_add_cryptocurr')
        this.props.navigation.navigate('WalletSearch', {
            prevState: this.props.navigation.state,
        });
    };
    // 进入交易页面
    goWalletTransaction = token => {
        // 点击加密货币
        cnnLogger('click_cryptocurr',{
            cryptocurr: JSON.stringify(token)
        })
        this.props.navigation.navigate('WalletTransactionList', {
            prevState: this.props.navigation.state,
            token,
        });
    };
    // 进入备份助记词页面
    goBackup = mnemonic => {
        this.props.navigation.navigate('WalletCreateBackup', {
            prevState: this.props.navigation.state,
            mnemonic,
        });
        this.setState({showSecurity: false})
    };
    // 创建/导入钱包
    goTarget = type => {
        this.closeModal('open1');
        if (type === 'create') {
            // 点击创建钱包
            cnnLogger('click_create_wallet')
            this.props.navigation.navigate('WalletCreateIndex', {
                prevState: this.props.navigation.state,
            });
        } else if (type === 'import') {
            // 点击导入钱包
            cnnLogger('click_import_wallet')
            this.props.navigation.navigate('WalletImportIndex', {
                prevState: this.props.navigation.state,
            });
        }
    };
    // 进入btc/eth页面
    goWalletDetail = type => {
        this.props.navigation.navigate('WalletImportDetail', {
            prevState: this.props.navigation.state,
            type,
        });
    };
    closeModal = key => {
        this.setState({ 
            [key]: false,
            pwd: '',
            canSubmit: false,
            err_txt: false,
            submiting: false,
        });
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
    backupClick = ()=>{
        // 点击备份助记词
        cnnLogger('click_backup',{
            page: 'wallet main'
        })
        this.openModal('open2')
    }
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
    /**
     * 输密码，获取助记词，跳转备份页
     */
    handlePwd = async () => {
        const { pwd } = this.state;
        if (!this.verify(pwd)) {
            return false;
        }
        this.setState({ submiting: true });
        try {
            const mnemonic = await service.getMnemonicByPassword(pwd);
            console.log('mnemonic: ',mnemonic)
            this.closeModal('open2');
            // this.setState({ submiting: false });
            if (mnemonic) {
                this.goBackup(mnemonic);
                this.setState({ pwd: '' });
            } else {
                $toast(i18n.t('page_verify.verify_fail'));
            }
        } catch (err) {
            console.log(err);
            this.closeModal('open2');
            // this.setState({ submiting: false });
            $toast(i18n.t('page_verify.verify_fail'));
        }
    };
    renderItem = item => (
        <TouchableOpacity onPress={() => this.goWalletTransaction(item)}>
            <View style={styles.item}>
                <View style={styles.item_center}>
                    <FastImage
                        source={{ uri: item.icon }}
                        style={styles.prefix_img}
                    />
                    <Text style={styles.item_txt}>{item.symbol}</Text>
                </View>
                <View>
                    <Text style={styles.sufix_txt1}>
                        {item.balance}
                    </Text>
                    <Text style={styles.sufix_txt2}>
                        ₩ {item.balance_krw}
                    </Text>
                </View>
            </View>
            <Underline />
        </TouchableOpacity>
    );

    /**
     * 判断是否有钱包, 否则显示导入(创建)弹窗
     * 获取钱包资产, 用于显示主页资产列表
     */
    initWallet = () => {
        this.setState({loading: true})
        console.log('loading: ',true)
        this.props.dispatch({
            type: 'WALLET/initWallet',
            callback: ({status})=>{
                const { btc, eth } = status;
                this.setState({loading: false})
                console.log('loading: ',false)
                if (btc && eth) {
                    // 两个钱包都存在, 表明肯定是创建的钱包, 判断是否需要备份助记词
                    const { btc } = status;
                    // 是否备份过助记词
                    this.setState({
                        showSecurity: !btc.info.mnemonic_backup,
                        showImport: null
                    });
                } else if (!btc && !eth) {
                    //btc和eth两个钱包都不存在, 显示dialog
                    this.setState({
                        open1: true,
                    });
                } else if (!btc) {
                    // 不存在btc, 显示导入btc
                    this.setState({ showImport: 'btc' });
                } else if (!eth) {
                    // 不存在eth, 显示导入eth
                    this.setState({ showImport: 'eth' });
                }
            }
        })
    }
    showTesting = ()=>{
        this.props.navigation.navigate('WalletDebug',{
            prevState: this.props.navigation.state,
        })
    }
    render() {
        const {
            open1,
            showSecurity,
            open2,
            showImport,
            // list,
            pwd,
            canSubmit,
            err_txt,
            submiting,
            loading,
        } = this.state;
        // console.log(showImport)
        return (
            <Container>
                <Header
                    style={styles.header}
                    title={<Title style={{color:'#fff'}} txt={`${i18n.t('page_wallet.total_assets')}(₩)`} />}
                    leftView={<View style={{height:30,width:30}}><Image
                        source={require('@images/icon_back_white.png')}
                        style={{ width: 12, height: 23 }}
                    /></View>}
                    leftClick={this.goBack}
                    rightView={
                        <Image source={require('@images/wallet_btn_add.png')} style={{height:30,width:30}} />
                    }
                    rightClick={this.goWalletSearch}
                >
                    <TouchableWithoutFeedback delayLongPress={!__DEV__?8*1000:1000} onLongPress={this.showTesting}>
                        <View style={styles.total}>
                            <Text style={styles.total_pre}>≈</Text>
                            <Text style={styles.total_count}>
                                {this.props.allInfo.balance_krw || '0.00'}
                            </Text>
                        </View>
                        
                    </TouchableWithoutFeedback>
                </Header>
                <Content>
                    <Underline style={styles.line} />
                    <ScrollView>
                        <List
                            dataSource={this.props.list}
                            renderItem={this.renderItem}
                            loading={loading}
                            noDataText={()=>(loading)?<Spinner />:null}
                        />
                    </ScrollView>
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
                                    onPress={this.backupClick}
                                >
                                    <Text style={styles.btn_txt}>
                                        {i18n.t('page_wallet.backup_mnemonic')}
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    ) : showImport ? (
                        <Button
                            onPress={() => this.goWalletDetail(showImport)}
                            // styleDisabled={{}}
                            // disabled={true}
                            style={styles.btn_box}
                        >
                            <Text style={styles.btn_txt}>
                                {showImport === 'eth'
                                    ? i18n.t('page_wallet.import_wallet_eth')
                                    : i18n.t('page_wallet.import_wallet_btc')}
                            </Text>
                        </Button>
                    ) : null}
                </Footer>
                {open1 && <Modal
                    styleBody={styles.modal}
                    styleContent={{justifyContent:'center'}}
                    isVisible={open1}
                    closeMask={this.goBack}
                    // avoidKeyboard={true}
                    // onBackdropPress={this.goBack}
                    // onBackButtonPress={this.goBack}
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
                                {/* <Image
                                    source={require('@images/wallet_icon_setupWallet.png')}
                                /> */}
                                <Text style={styles.modal_btn_t}>
                                    {i18n.t('page_wallet.create_wallet')}
                                </Text>
                            </Button>
                            <Button
                                style={styles.modal_btn}
                                onPress={() => this.goTarget('import')}
                            >
                                {/* <Image
                                    source={require('@images/wallet_icon_import.png')}
                                /> */}
                                <Text style={styles.modal_btn_t}>
                                    {i18n.t('page_wallet.import_wallet')}
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Modal>}
                {open2 && <Modal
                    styleBody={styles.modal}
                    styleContent={{justifyContent:'flex-start',paddingTop: '24%'}}
                    closeMask={()=>this.closeModal('open2')}
                >
                    <View style={styles.modal_open2}>
                        <Title
                            style={{ textAlign: 'center' }}
                            txt={i18n.t('page_register.password')}
                        />
                        <View style={styles.modal_form}>
                            <InputFocus
                                secureTextEntry={true}
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
                                {submiting ? (
                                    <Spinner color="#fff" />
                                ) : (
                                    <Text style={styles.modal_btn_t}>
                                        {i18n.t('label_submit')}
                                    </Text>
                                )}
                            </Button>
                        </View>
                    </View>
                </Modal>}
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
        position: 'relative',
        alignItems: 'center',
        marginBottom: 10,
        height: 42,
        minWidth: 64,
    },
    total_pre: {
        position: 'absolute',
        left: -30,
        color: '#fff',
        fontSize: 24,
        lineHeight: 42,
    },
    total_count: {
        color: '#fff',
        fontSize: 30,
        lineHeight: 42,
    },
    modal: {
        margin: 0,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    modal_test: {
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 30,
        paddingBottom: 20,
        borderRadius: 8,
        // height: 170,
        backgroundColor: '#fff',
    },
    modal_open1: {
        justifyContent: 'space-between',
        marginLeft: 12 * viewWidth / 375,
        marginRight: 12 * viewWidth / 375,
        paddingLeft: 12 * viewWidth / 375,
        paddingRight: 12 * viewWidth / 375,
        paddingTop: 30 * viewWidth / 375,
        paddingBottom: 20 * viewWidth / 375,
        borderRadius: 8 * viewWidth / 375,
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
        paddingLeft: 10 * viewWidth / 375,
        paddingRight: 10 * viewWidth / 375,
        paddingTop: 16 * viewWidth / 375,
        paddingBottom: 16 * viewWidth / 375,
        // height: 62,
        // width: 150,
        borderRadius: 8,
    },
    modal_btn_t: {
        color: '#fff',
        fontSize: 16,
        // marginLeft: 10,
    },
    modal_open2: {
        justifyContent: 'center',
        marginLeft: 12 * viewWidth / 375,
        marginRight: 12 * viewWidth / 375,
        paddingLeft: 12 * viewWidth / 375,
        paddingRight: 12 * viewWidth / 375,
        paddingTop: 30 * viewWidth / 375,
        paddingBottom: 20 * viewWidth / 375,
        borderRadius: 8 * viewWidth / 375,
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
        // marginTop: 10,
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
        width: 70,
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
