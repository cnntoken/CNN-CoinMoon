import React, { PureComponent } from 'react'

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {
    Container,
    Header,
    Content,
    // Footer,
    Underline,
    // List,
    Button,
    Title,
    Radio,
    InputFocus,
    KeyBoard,
} from '@components/NDLayout'
import { 
    Image,
    View,
    Text,
    // ScrollView,
    // KeyboardAvoidingView,
    // Platform,
    // TextInput,
 } from "react-native";
import styles from './styles';
import i18n from '@i18n';
import services from '@services/wallet/index';
import { cnnLogger,$toast } from '@utils/index';


export default class ViewControl extends PureComponent {
    state = {
        options: [
            {name: i18n.t('page_wallet.segwit'),value:true},
            {name: i18n.t('page_wallet.ordinary'),value:false}
        ],
        canSubmit: false,
        way: 0,
        eth: {
            keystore: {
                text: ``,
                pwd: '',
            },
            mnemonic: {
                // text: 'seek awful swarm flower ivory cruel dignity arrive love tail truck visual',
                text: '',
                src: `m/44'/60'/0'/0/0`,
                pwd: '',
                pwd2: '',
            },
            privateKey: {
                text: '',
                pwd: '',
                pwd2: '',
            },
        },
        btc: {
            mnemonic: {
                // text: 'seek awful swarm flower ivory cruel dignity arrive love tail truck visual',
                text: '',
                pwd: '',
                pwd2: '',
                address: true,
            },
            privateKey: {
                text: '',
                pwd: '',
                pwd2: '',
                address: true,
            },
        }
    }
    _allLayouts = {}
    currentTarget = null
    renderTabContent = (type)=>{
        // console.log(type)
        const content = this.state[type]
        const {options} = this.state
        const submitCom = <Button
            onPress={this.handleSubmit}
            // styleDisabled={{}}
            // disabled={true}
            style={styles.btn_box}
        >
            <Text style={styles.btn_txt}>{i18n.t('page_wallet.start_import')}</Text>
        </Button>
        let elem = null;
        if(type === 'eth'){
            elem = [
                <KeyBoard key={0} calcScroll2={this.calcScroll2} tabLabel={i18n.t('page_wallet.keystore')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.keystore_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.keystore_placeholder')} 
                            value={content['keystore']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['keystore']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        {submitCom}
                    </View> 
                </KeyBoard>,
                <KeyBoard key={1} calcScroll2={this.calcScroll2} tabLabel={i18n.t('page_wallet.mnemonic')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.mnemonic_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.mnemonic_placeholder')} 
                            value={content['mnemonic']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.select_src')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            placeholder={i18n.t('page_wallet.select_src')} 
                            value={content['mnemonic']['src']}
                            onChangeText={(text)=>this.formChange('src',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <View style={styles.relative}>
                            <Text style={styles.suffix}>{i18n.t('default')}</Text>
                        </View>
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['mnemonic']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_register.re_password')}
                            // onBlur={()=>this.checkPwd()}
                            value={content['mnemonic']['pwd2']}
                            onChangeText={(text)=>this.formChange('pwd2',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        {submitCom}
                    </View>
                </KeyBoard>,
                <KeyBoard key={2} calcScroll2={this.calcScroll2} tabLabel={i18n.t('page_wallet.privateKey')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.privateKey_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.privateKey_placeholder')} 
                            value={content['privateKey']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')}
                            value={content['privateKey']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_register.re_password')}
                            value={content['privateKey']['pwd2']}
                            onChangeText={(text)=>this.formChange('pwd2',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        {submitCom}
                    </View>
                </KeyBoard>
            ]
        }
        if(type === 'btc'){
            elem = [
                <KeyBoard key={0} calcScroll2={this.calcScroll2} tabLabel={i18n.t('page_wallet.mnemonic')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.mnemonic_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.mnemonic_placeholder')} 
                            value={content['mnemonic']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['mnemonic']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_register.re_password')} 
                            placeholderTextColor='#999'
                            value={content['mnemonic']['pwd2']}
                            onChangeText={(text)=>this.formChange('pwd2',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.select_address_type')}</Text>
                        <Radio 
                            value={content['mnemonic']['address']}
                            options={options} 
                            onChange={(text)=>this.formChange('address',text)} 
                        />
                        {submitCom}
                    </View>
                </KeyBoard>,
                <KeyBoard key={1} calcScroll2={this.calcScroll2} tabLabel={i18n.t('page_wallet.privateKey')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.privateKey_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.privateKey_placeholder')} 
                            value={content['privateKey']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['privateKey']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_register.re_password')} 
                            value={content['privateKey']['pwd2']}
                            onChangeText={(text)=>this.formChange('pwd2',text)}
                            handleFocus={this.handleFocus}
                            onLayout={this.handleLayout}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.select_address_type')}</Text>
                        <Radio 
                            value={content['privateKey']['address']}
                            options={options} 
                            onChange={(text)=>this.formChange('address',text)} 
                        />
                        {submitCom}
                    </View>
                </KeyBoard>
            ]
        }
        return elem
    }
    changeWay = (e)=>{
        // console.log(e)
        const {way} = this.state
        if(e.i !== way){
            this.setState({
                way: e.i
            })
        }
    }
    handleFocus = ({ nativeEvent: { target } })=>{
        console.log(target)
        this.currentTarget = target
    }
    handleLayout = ({ nativeEvent: {layout, target } })=>{
        // console.log(layout,target)
        this._allLayouts[target] = layout
    }
    calcScroll2 = () => {
        console.log(this._allLayouts,this.currentTarget)
        const scrollHeight = this._allLayouts[this.currentTarget]['y'] - 70;
        // console.log('scrollHeight: ',scrollHeight)
        return scrollHeight
    }
    formChange = (key,value)=>{
        const {type} = this.props.navigation.state.params
        const {way} = this.state
        const parent = this.state[type]
        console.log(type,way,key,value)
        if(type === 'eth'){
            if(way === 0){
                parent['keystore'][key] = value
            }
            if(way === 1){
                parent['mnemonic'][key] = value
            }
            if(way === 2){
                parent['privateKey'][key] = value
            }
        }
        if(type === 'btc'){
            if(way === 0){
                parent['mnemonic'][key] = value
            }
            if(way === 1){
                parent['privateKey'][key] = value
            }
        }
        console.log(parent)
        this.setState({
            [type]: {...parent}
        })
    }
    verify = (params) =>{
        const obj = {}
        const keys = Object.keys(params)
        for (const key of keys) {
            let value = params[key];
            if(typeof value === 'string'){
                value = value.trim()
                if(!value){
                    $toast(i18n.t('page_wallet.complete_info'))
                    return false
                }
            }
            Object.assign(obj,{[key]: value})
        }
        if(obj.pwd && obj.pwd2){
            if(obj.pwd !== obj.pwd2){
                $toast(i18n.t('page_register.pwd_eq_invalid'))
                return false
            }
        }
        return obj
    }
    handleSubmit = async ()=>{
        const {type} = this.props.navigation.state.params
        const {way} = this.state
        const parent = this.state[type]
        console.log(type,way)
        const params = {}
        if(type === 'eth'){
            if(way === 0){
                const mode = 'keystore'
                Object.assign(params,parent['keystore'])
                const verified = this.verify(params)
                if(!verified){
                    return false
                }
                // 点击开始导入
                cnnLogger('click_start_import',{
                    type,
                    mode,
                })
                try {
                    const res = await services.importETHWalletByKeystore(verified.text,verified.pwd)
                    // 导入成功
                    cnnLogger('import_success',{
                        type,
                        mode,
                    })
                    console.log(res)
                    this.goWalletMain()
                } catch (e) {
                    // 导入失败
                    cnnLogger('import_failed',{
                        type,
                        mode,
                        reason: JSON.stringify(e)
                    })
                    console.log('import err: ',e)
                    $toast(i18n.t('page_wallet.import_fail'))
                }
            }
            if(way === 1){
                const mode = 'mnemonic'
                Object.assign(params,parent['mnemonic'])
                const verified = this.verify(params)
                if(!verified){
                    return false
                }
                cnnLogger('click_start_import',{
                    type,
                    mode,
                })
                try {
                    const res = await services.importETHWalletByMnemonic(verified.text,verified.pwd,verified.src)
                    cnnLogger('import_success',{
                        type,
                        mode,
                    })
                    console.log(res)
                    this.goWalletMain()
                } catch (e) {
                    cnnLogger('import_failed',{
                        type,
                        mode,
                        reason: JSON.stringify(e)
                    })
                    console.log('import err: ',e)
                    $toast(i18n.t('page_wallet.import_fail'))
                }
            }
            if(way === 2){
                const mode = 'privateKey'
                Object.assign(params,parent['privateKey'])
                const verified = this.verify(params)
                if(!verified){
                    return false
                }
                cnnLogger('click_start_import',{
                    type,
                    mode,
                })
                try {
                    const res = await services.importETHWalletByPrivateKey(verified.text,verified.pwd)
                    cnnLogger('import_success',{
                        type,
                        mode,
                    })
                    console.log(res)
                    this.goWalletMain()
                } catch (e) {
                    cnnLogger('import_failed',{
                        type,
                        mode,
                        reason: JSON.stringify(e)
                    })
                    console.log('import err: ',e)
                    $toast(i18n.t('page_wallet.import_fail'))
                }
            }
        }
        if(type === 'btc'){
            if(way === 0){
                const mode = 'mnemonic'
                Object.assign(params,parent['mnemonic'])
                const verified = this.verify(params)
                if(!verified){
                    return false
                }
                cnnLogger('click_start_import',{
                    type,
                    mode,
                })
                try {
                    const res = await services.importBTCWalletByMnemonic(verified.text,verified.pwd,verified.address)
                    cnnLogger('import_success',{
                        type,
                        mode,
                    })
                    console.log(res)
                    this.goWalletMain()
                } catch (e) {
                    cnnLogger('import_failed',{
                        type,
                        mode,
                        reason: JSON.stringify(e)
                    })
                    console.log('import err: ',e)
                    $toast(i18n.t('page_wallet.import_fail'))
                }
            }
            if(way === 1){
                const mode = 'privateKey'
                Object.assign(params,parent['privateKey'])
                const verified = this.verify(params)
                if(!verified){
                    return false
                }
                cnnLogger('click_start_import',{
                    type,
                    mode,
                })
                try {
                    const res = await services.importBTCWalletByPrivateKey(verified.text,verified.pwd,verified.address)
                    cnnLogger('import_success',{
                        type,
                        mode,
                    })
                    console.log(res)
                    this.goWalletMain()
                } catch (e) {
                    cnnLogger('import_failed',{
                        type,
                        mode,
                        reason: JSON.stringify(e)
                    })
                    console.log('import err: ',e)
                    $toast(i18n.t('page_wallet.import_fail'))
                }
            }
        }
        // $toast('success')
    }
    goWalletMain = () => {
        this.props.navigation.navigate('WalletMain', {
            prevState: this.props.navigation.state,
        });
    }
    render() {
        const {type} = this.props.navigation.state.params
        // console.log('walletdetail',type)
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                                style={{ width: 12, height: 23 }}
                            />}
                    title={()=><Title txt={type === 'eth'?i18n.t('page_wallet.import_wallet_eth'):i18n.t('page_wallet.import_wallet_btc')} />}

                />
                <Content>
                    <Underline style={styles.line} />
                    <ScrollableTabView
                        style={{marginTop: 20, }}
                        initialPage={0}
                        renderTabBar={() => <DefaultTabBar />}
                        onChangeTab={this.changeWay}
                        tabBarUnderlineStyle={styles.tab_underline}
                        tabBarActiveTextColor='#408EF5'
                        tabBarInactiveTextColor='#333'
                    >
                        {this.renderTabContent(type)}
                    </ScrollableTabView>
                    {/* <View style={{paddingLeft:24,paddingRight:24}}>
                        <Button
                            onPress={this.handleSubmit}
                            // styleDisabled={{}}
                            // disabled={true}
                            style={styles.btn_box}
                        >
                            <Text style={styles.btn_txt}>{i18n.t('page_wallet.start_import')}</Text>
                        </Button>
                    </View> */}
                </Content>
                {/* <Footer>
                    <Button
                        onPress={this.handleSubmit}
                        // styleDisabled={{}}
                        // disabled={true}
                        style={styles.btn_box}
                    >
                        <Text style={styles.btn_txt}>{i18n.t('page_wallet.start_import')}</Text>
                    </Button>
                </Footer> */}
            </Container>
        )
    }
}