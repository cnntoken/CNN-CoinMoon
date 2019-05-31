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
} from '@components/NDLayout/index'
import {
    Image,
    View,
    Text,
    TextInput,
    // Dimensions,
    // TouchableOpacity,
} from "react-native";
import styles from './styles';
import Modal from 'react-native-modal';
import i18n from '@i18n';



export default class ViewControl extends Component {
    state = {
        params: {
            address: '',
            number: '',
            remark: '',
            rebate: '2',
        },
        options: [
            {value: '1',name: {main:i18n.t('page_wallet.slow'),sub:'0.00008'}},
            {value: '2',name: {main:i18n.t('page_wallet.medium'),sub:'0.000021'}},
            {value: '3',name: {main:i18n.t('page_wallet.fast'),sub:'0.000042'}},
        ],
        canNext: false,
        open1: false,
        open2: false,
        pwd: '',
    }
    goBack = () => {
        this.props.navigation.pop();

    };
    renderRadioChild = (item,value)=>{
        // const { type } = this.props.navigation.state.params
        const type = 'eth'
        // console.log(type,item,value)
        // return (<Text>{item.value}</Text>)
        return (
            <View 
                style={[styles.radio_item,item.value === value&&styles.radio_item_active]} 
            >
                <Text 
                    style={[styles.radio_name_main,item.value === value&&styles.radio_name_active]}
                >
                    {item.name.main}
                </Text>
                <Text 
                    style={[styles.radio_name_sub,item.value === value&&styles.radio_name_active]}
                >
                    {item.name.sub}{type==='eth'?'ETH':type==='btc'?'BTC':''}
                </Text>
            </View>
        )
    }
    checkParams = (params)=>{
        if(!params){
            params = this.state.params
        }
        const keys = Object.keys(params)

        for (const item of keys) {
            if(['',undefined].includes(params[item])){
                // this.setState({canNext: false})
                return false
            }
        }
        // this.setState({canNext: true})
        return true
    }
    formChange = (key,value)=>{
        console.log(key,value)
        const {params} = this.state
        params[key] = value
        const keys = Object.keys(params)
        let canNext = true
        for (const item of keys) {
            if(['',undefined].includes(params[item])){
                canNext = false
                break;
            }
        }
        this.setState({
            params: {...params},
            canNext,
        })
    }
    pwdChange = (text)=>{
        this.setState({
            pwd: text,
        })
    }
    confirmPwd = ()=>{
        console.log('confirmPwd')
        this.closeModal('open2')
    }
    nextStep = ()=>{
        // const { type } = this.props.navigation.state.params
        const type = 'eth'
        const {params} = this.state
        console.log(type,params)
        this.openModal('open1')
    }
    
    openModal = (key)=>{
        console.log('openModal: ',key)
        this.setState({
            [key]: true
        })
    }
    closeModal = (key)=>{
        this.setState({
            [key]: false
        })
    }
    open2from1 = ()=>{
        this.setState({
            open1: false,
            open2: null,
        })
    }
    open1from2 = ()=>{
        this.setState({
            open1: null,
            open2: false,
        })
    }
    isHideModal = ()=>{
        const {open1,open2} = this.state
        if(open1 === false && open2 === null){
            this.setState({open2: true})
        }
        if(open2 === false && open1 === null){
            this.setState({open1: true})
        }  
    }
    render() {
        // const { type } = this.props.navigation.state.params
        const type = 'eth'
        const {params,options,canNext,open1,open2,pwd} = this.state
        console.log('walletTransaction', type)
        console.log('currentModal: ',open1,open2)
        console.log('canNext: ',canNext)
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_close.png')} 
                            />}
                    title={()=><Title txt={type === 'eth'?i18n.t('page_wallet.send_eth'):i18n.t('page_wallet.send_btc')} />}

                />
                <Content>
                    <Underline style={styles.line} />
                    <View>
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
                    </View>
                    <View>
                        <View style={styles.form_item}>
                            <Text style={styles.label}>{i18n.t('page_wallet.amount')}:</Text>
                            <TextInput 
                                style={styles.form_item_input}
                                placeholder={i18n.t('page_wallet.amount')}
                                value={params.number}
                                onChangeText={(text)=>this.formChange('number',text)}
                            />
                        </View>
                        <Underline />
                    </View>
                    <View>
                        <View style={styles.form_item}>
                            <Text style={styles.label}>{i18n.t('page_wallet.remark')}:</Text>
                            <TextInput 
                                style={styles.form_item_input}
                                placeholder={i18n.t('page_wallet.remark')}
                                value={params.remark}
                                onChangeText={(text)=>this.formChange('remark',text)}
                            />
                        </View>
                        <Underline />
                    </View>
                    <View>
                        <View style={styles.form_item}>
                            <Text style={styles.label}>{i18n.t('page_wallet.miner_cost')}:</Text>
                        </View>
                        <View style={styles.radio_box}>
                            <RadioGroup
                                value={params.rebate}
                                options={options}
                                onChange={(text)=>this.formChange('rebate',text)}
                                renderChild={this.renderRadioChild}
                            />
                        </View>
                    </View>

                    <View>
                        <Modal 
                            style={styles.modal}
                            isVisible={open1}
                            onBackdropPress={()=>this.closeModal('open1')}
                            onBackButtonPress={()=>this.closeModal('open1')}
                            onModalHide={this.isHideModal}
                        >

                            <View style={styles.modal_child}>
                                <View style={styles.modal_header}>
                                    <View>
                                        <Button transparent onPress={()=>this.closeModal('open1')}>
                                            <Image source={require('@images/icon_close.png')} style={{ width: 24, height: 24 }} />
                                        </Button>
                                    </View>
                                    <View>
                                        <Title txt='支付详情' style={{ color:'#000',fontSize:16 }} />
                                    </View>
                                    <View style={{width: 24}} />
                                </View>
                                <View>
                                    <Underline />
                                    <View style={styles.modal_list}>
                                        <Text style={styles.modal_label}>{i18n.t('page_wallet.payment_address')}:</Text>
                                        <Text style={styles.modal_info}>12345678902345678901234567890</Text>
                                    </View>
                                    <Underline />
                                    <View style={styles.modal_list}>
                                        <Text style={styles.modal_label}>{i18n.t('page_wallet.payment_wallet')}:</Text>
                                        <Text style={styles.modal_info}>12345678902345678901234567890</Text>
                                    </View>
                                    <Underline />
                                    <View style={styles.modal_list}>
                                        <Text style={styles.modal_label}>{i18n.t('page_wallet.money')}:</Text>
                                        <Text style={styles.modal_info}>0.0005 ether</Text>
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
                            onBackdropPress={this.open1from2}
                            onBackButtonPress={this.open1from2}
                            onModalHide={this.isHideModal}
                        >

                            <View style={styles.modal_child}>
                                <View style={styles.modal_header}>
                                    <View>
                                        <Button transparent onPress={this.open1from2}>
                                            <Image source={require('@images/icon_back_black.png')} style={{ width: 12, height: 23 }} />
                                        </Button>
                                    </View>
                                    <View>
                                        <Title txt={i18n.t('page_wallet.payment_detail')} style={{ color:'#000',fontSize:16 }} />
                                    </View>
                                    <View style={{width: 12}} />
                                </View>
                                <View style={styles.modal_pwd_box}>
                                    <Underline />
                                    {/* <View> */}
                                        <TextInput 
                                            autoFocus={true}
                                            secureTextEntry={true}
                                            style={styles.modal_pwd}
                                            placeholder={i18n.t('page_register.password')}
                                            value={pwd}
                                            onChangeText={this.pwdChange}
                                        />
                                    {/* </View> */}
                                    <Underline />
                                </View>
                                <View style={styles.modal_footer}>
                                    <Button style={styles.modal_btn} onPress={this.confirmPwd}>
                                        <Text style={styles.color_w}>{i18n.t('page_wallet.confirm')}</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </Content>
                <Footer>
                    <Button key={canNext} style={styles.btn} disabled={!canNext} onPress={this.nextStep}>
                        <Text style={styles.color_w}>{i18n.t('page_wallet.next_step')}</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}