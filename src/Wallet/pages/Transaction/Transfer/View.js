import React, { Component } from 'react'

import {
    Container,
    Header,
    Content,
    Footer,
    Underline,
    // List,
    Button,
    Title,
    RadioGroup,
    Spinner,
    InputFocus,
    KeyBoard,
} from '@components/NDLayout/index'
import {
    Image,
    View,
    Text,
    TextInput,
    // KeyboardAvoidingView,
    // Platform,
    // Dimensions,
    // ScrollView,
    // TouchableOpacity,
} from "react-native";
import styles from './styles';
import Modal from 'react-native-modal';
import i18n from '@i18n';
import services from '@services/wallet/index';
import { MyError } from '@services/wallet/util';
import BigNumber from 'bignumber.js';
import { cnnLogger,$toast } from '@utils/index';

export default class ViewControl extends Component {
    constructor(props){
        super(props);
        const { token } = props.navigation.state.params
        this.state = {
            params: {address: '',amount:''},
            canNext: false,
            open1: false,
            open2: false,
            pwd: '',
            submiting: false,
            status: null,
            token
        }
    }
    componentDidMount(){
        // 从其他页面返回来时请求数据，重新渲染
        this.reRender = this.props.navigation.addListener('willFocus',() => {
            this.getEstimate()
        })
    }
    componentWillUnmount() {
        this.reRender;
    }
    getEstimate = async()=>{
        const { token } = this.props.navigation.state.params
        let estimate;
        this.setState({loading: true})
        if(token.token_type === 'btc'){
            estimate = await services.getBtcEstimate();
        }else{
            estimate = await services.getETHEstimate();
        }
        const options = [
            {key: 0,value: estimate.slow,name: {main:i18n.t('page_wallet.slow'),sub:estimate.slow}},
            {key: 1,value: estimate.standard,name: {main:i18n.t('page_wallet.medium'),sub:estimate.standard}},
            {key: 2,value: estimate.fast,name: {main:i18n.t('page_wallet.fast'),sub:estimate.fast}},
            // {key: 0,value: 20,name: {main:i18n.t('page_wallet.slow'),sub:20}},
            // {key: 1,value: 20,name: {main:i18n.t('page_wallet.medium'),sub:20}},
            // {key: 2,value: 20,name: {main:i18n.t('page_wallet.fast'),sub:20}},
        ]
        const {params} = this.state
        this.setState({
            options,
            params:{
                ...params,
                fee: options[1]
            },
            loading: false
        })
    }
    gwei2eth = (gwei)=>{
        return (new BigNumber(gwei)).times(1e-9).toString(10)
    }
    satoshi2btc = (satoshi)=>{
        return (new BigNumber(satoshi)).times(1e-9).toString(10)
    }
    renderRadioChild = (item,checked)=>{
        const { token } = this.state
        // console.log(type,item,checked)
        // return (<Text>{item.value}</Text>)
        return (
            <View 
                style={[styles.radio_item,(item.key === checked.key)&&styles.radio_item_active]} 
            >
                <Text 
                    style={[styles.radio_name_main,(item.key === checked.key)&&styles.radio_name_active]}
                >
                    {item.name.main}
                </Text>
                <Text 
                    style={[styles.radio_name_sub,(item.key === checked.key)&&styles.radio_name_active]}
                >
                    {token.token_type === 'btc' ? `${this.satoshi2btc(item.name.sub)}BTC` : `${this.gwei2eth(item.name.sub)}ETH`}
                </Text>
            </View>
        )
    }
    formChange = (key,value)=>{
        console.log(key,value)
        const {params} = this.state;
        console.log(params)
        params[key] = value;
        this.setState({
            params: {...params},
            canNext: params.amount && params.address && params.fee,
        })
    }
    pwdChange = (text)=>{
        this.setState({
            pwd: text,
        })
    }
    isNotEnough = (type,balance,amount,fee,ethBalance)=>{
        const gasLimit = 60000;
        
        if(type === 'btc'){
            balance = new BigNumber(balance);
            amount = new BigNumber(amount);
            fee = (new BigNumber(fee)).times(1e-8);
            return (balance.minus(amount).minus(fee)).toFixed() < 0
        }else if(type === 'eth'){
            balance = new BigNumber(balance);
            amount = new BigNumber(amount);
            fee = (new BigNumber(fee)).times(1e-9).times(gasLimit);
            return (balance.minus(amount).minus(fee)).toFixed() < 0
        }else{
            balance = new BigNumber(balance);
            amount = new BigNumber(amount);

            fee = (new BigNumber(fee)).times(1e-9).times(gasLimit);
            ethBalance = (new BigNumber(ethBalance));
            return (balance.minus(amount)).toFixed() < 0 || (ethBalance.minus(fee)).toFixed() < 0;
        }
        
    }
    confirmPwd = async (token)=>{
        const {pwd,params:{address,amount,fee}} = this.state
        console.log('confirmPwd: ',pwd,token)
        this.setState({
            submiting: true,
        })
        try {
            if(token.token_type === 'btc'){
                if(this.isNotEnough('btc',token.balance,amount,fee.value)){
                    throw new MyError({code: -100,msg: 'BTC Insufficient balance'})
                }
                await services.transferBTC(pwd,address,amount,fee.value)
            }else if(token.token_type === 'eth'){
                if(this.isNotEnough('btc',token.balance,amount,fee.value)){
                    throw new MyError({code: -100,msg: 'ETH Insufficient balance'})
                }
                await services.transferETH(pwd,address,amount,fee.value)
            }else{
                const ethToken = await services.getETHToken()
                if(this.isNotEnough('btc',token.balance,amount,fee.value,ethToken.balance)){
                    throw new MyError({code: -100,msg: 'ERC20 Insufficient balance'})
                }
                await services.transferERC20Token(pwd,token.contract,address,amount,fee.value)
            }
            // 成功提交转账
            cnnLogger('submit_transfer_success',{
                cryptocurr: JSON.stringify(token)
            })
            this.setState({submiting: false})
            this.closeModal('open2')
            this.props.navigation.navigate('WalletTransactionList', {token});
            $toast(i18n.t('page_wallet.payment_success'))
        } catch (e) {
            console.log(e)
            console.log(e.code,e.msg)
            this.setState({submiting: false})
            this.closeModal('open2')
            if(e.code === -100){
                // 余额不足
                $toast(i18n.t('page_wallet.insufficient_balance'))
            }else if(e.code === -101){
                // 钱包不存在
                $toast(`token.token_type ${i18n.t('page_wallet.wallet_null')}`)
            }else if(e.code === -102){
                // 密码错误
                $toast(i18n.t('page_verify.verify_fail'))
            }else if(e.code === -103){
                // token 地址错误
                $toast(i18n.t('page_wallet.address_error'))
            }else{
                // 转账失败
                $toast(i18n.t('page_wallet.payment_error'))
            }
            
        }
        
    }
    nextStep = ()=>{
        const {params:{amount}} = this.state
        const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if(reg.test(amount.trim())&&amount>0){
            this.openModal('open1')
        }else{
            console.log('amount: ',amount)
            $toast(i18n.t('page_wallet.amount_gte_0'))
        }
    }
    
    openModal = (key)=>{
        console.log('openModal: ',key)
        this.setState({
            [key]: true,
            status: null,
        })
    }
    closeModal = (key)=>{
        this.setState({
            [key]: false,
            status: null,
        })
    }
    open2from1 = ()=>{
        this.setState({
            open1: false,
            status: 'will_open2',
        })
    }
    isHideModal = ()=>{
        const {status} = this.state
        if(status === 'will_open2'){
            this.setState({
                open1: false,
                open2: true
            })
        }else{
            this.setState({
                open1: false,
                open2: false,
            })
        }
    }
    render() {
        const {params,canNext,open1,open2,pwd,submiting,options,loading,token} = this.state
        // console.log('WalletTransactionTransfer', type)
        // console.log('currentModal: ',open1,open2)
        // console.log('canNext: ',canNext)
        
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_close.png')} 
                                style={{ width: 24, height: 24 }}
                            />}
                    rightView={<View style={{width:24,height:24}} />}
                    title={`${token.symbol} ${i18n.t('page_wallet.send_any')}`}

                />
                <Content>
                    <Underline style={styles.line} />
                    <KeyBoard>
                        <View style={styles.form_item}>
                            <Text style={styles.label}>{i18n.t('page_wallet.address')}:</Text>
                            <TextInput 
                                style={styles.form_item_input}
                                placeholder={i18n.t('page_wallet.address')}
                                value={params.address}
                                onChangeText={(text)=>this.formChange('address',text)}
                            />
                        </View>
                        <Underline />
                        <View style={styles.form_item}>
                            <Text style={styles.label}>{i18n.t('page_wallet.amount')}:</Text>
                            <TextInput 
                                style={styles.form_item_input}
                                keyboardType='numeric'
                                placeholder={i18n.t('page_wallet.amount')}
                                value={params.amount}
                                onChangeText={(text)=>this.formChange('amount',text)}
                            />
                        </View>
                        <Underline />
                        {/* <View style={styles.form_item}>
                            <Text style={styles.label}>{i18n.t('page_wallet.remark')}:</Text>
                            <TextInput 
                                style={styles.form_item_input}
                                placeholder={i18n.t('page_wallet.remark')}
                                value={params.remark}
                                onChangeText={(text)=>this.formChange('remark',text)}
                            />
                        </View>
                        <Underline /> */}
                        <View style={styles.form_item}>
                            <Text style={styles.label}>{i18n.t('page_wallet.miner_cost')}:</Text>
                        </View>
                        {
                            options && <View style={styles.radio_box}>
                                <RadioGroup
                                    checked={params.fee || options[1]}
                                    options={options}
                                    onChange={(text)=>this.formChange('fee',text)}
                                    renderChild={this.renderRadioChild}
                                />
                            </View>
                        }
                        {loading?<View style={{}}><Spinner /></View>:null}
                        <View style={[styles.form_item,{marginTop:40}]}>
                            <Button key={canNext} style={styles.btn} disabled={!canNext} onPress={this.nextStep}>
                                <Text style={styles.color_w}>{i18n.t('page_wallet.next_step')}</Text>
                            </Button>
                        </View>
                    </KeyBoard>
                    <View>
                        <Modal 
                            style={styles.modal}
                            isVisible={open1}
                            onBackdropPress={()=>this.closeModal('open1')}
                            onBackButtonPress={()=>this.closeModal('open1')}
                            onModalHide={this.isHideModal}
                            avoidKeyboard={true}
                        >

                            <View style={styles.modal_child}>
                                <View style={styles.modal_header}>
                                    <View>
                                        <Button transparent onPress={()=>this.closeModal('open1')}>
                                            <Image source={require('@images/icon_close.png')} style={{ width: 24, height: 24 }} />
                                        </Button>
                                    </View>
                                    <View>
                                        <Title txt={i18n.t('page_wallet.payment_detail')} style={{ color:'#000',fontSize:16 }} />
                                    </View>
                                    <View style={{width: 24}} />
                                </View>
                                <View>
                                    <Underline />
                                    <View style={styles.modal_list}>
                                        <Text style={styles.modal_label}>{i18n.t('page_wallet.receipt_address')}:</Text>
                                        <Text style={styles.modal_info}>{params.address}</Text>
                                    </View>
                                    <Underline />
                                    <View style={styles.modal_list}>
                                        <Text style={styles.modal_label}>{i18n.t('page_wallet.payment_wallet')}:</Text>
                                        <Text style={styles.modal_info}>{token.wallet_address}</Text>
                                    </View>
                                    <Underline />
                                    <View style={styles.modal_list}>
                                        <Text style={styles.modal_label}>{i18n.t('page_wallet.money')}:</Text>
                                        <Text style={styles.modal_info}>{params.amount} {token.name}</Text>
                                    </View>
                                    <Underline />
                                </View>
                                <View style={styles.modal_footer}>
                                    <Button style={styles.modal_btn} onPress={this.open2from1}>
                                        <Text style={styles.color_w}>{i18n.t('page_wallet.confirm')}</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                        <Modal 
                            style={styles.modal}
                            isVisible={open2}
                            onBackdropPress={()=>this.closeModal('open2')}
                            onBackButtonPress={()=>this.closeModal('open2')}
                            onModalHide={this.isHideModal}
                            avoidKeyboard={true}
                        >

                            <View style={styles.modal_child}>
                                <View style={styles.modal_header}>
                                    <View>
                                        <Button transparent onPress={()=>this.closeModal('open2')}>
                                            <Image source={require('@images/icon_back_black.png')} style={{ width: 12, height: 23 }} />
                                        </Button>
                                    </View>
                                    <View>
                                        <Title txt={i18n.t('page_wallet.payment_detail')} style={{ color:'#000',fontSize:16 }} />
                                    </View>
                                    <View style={{width: 12}} />
                                </View>
                                <View style={styles.modal_pwd_box}>

                                    <InputFocus 
                                        autoFocus={true}
                                        secureTextEntry={true}
                                        style={styles.modal_pwd}
                                        placeholder={i18n.t('page_register.password')}
                                        value={pwd}
                                        onChangeText={this.pwdChange}
                                    />

                                </View>
                                <View style={styles.modal_footer}>
                                    <Button key={pwd&&pwd.length} disabled={!(pwd&&pwd.length)} style={styles.modal_btn} onPress={()=>this.confirmPwd(token)}>
                                        {submiting?<Spinner color='#fff' />:<Text style={styles.color_w}>{i18n.t('page_wallet.confirm')}</Text>}
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </Content>
                {/* <Footer>
                    <Button key={canNext} style={styles.btn} disabled={!canNext} onPress={this.nextStep}>
                        <Text style={styles.color_w}>{i18n.t('page_wallet.next_step')}</Text>
                    </Button>
                </Footer> */}
            </Container>
        )
    }
}