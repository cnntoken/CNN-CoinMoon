import React, { PureComponent } from 'react'

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {
    Container,
    Header,
    Content,
    Footer,
    Underline,
    // List,
    Button,
    Title,
    Radio,
    InputFocus,
} from '@components/NDLayout'
import { 
    Image,
    View,
    Text,
    // TextInput,
 } from "react-native";
import styles from './styles';
import i18n from '@i18n';

export default class ViewControl extends PureComponent {
    state = {
        options: [
            {name: i18n.t('page_wallet.segwit'),value:i18n.t('page_wallet.segwit')},
            {name: i18n.t('page_wallet.ordinary'),value:i18n.t('page_wallet.ordinary')}
        ],
        canSubmit: false,
        way: 0,
        eth: {
            keystore: {
                text: '',
                pwd: '',
            },
            mnemonic: {
                text: '',
                src: '',
                pwd: '',
            },
            privateKey: {
                text: '',
                pwd: '',
            },
        },
        btc: {
            mnemonic: {
                text: '',
                pwd: '',
                address: i18n.t('page_wallet.segwit'),
            },
            privateKey: {
                text: '',
                pwd: '',
                address: i18n.t('page_wallet.segwit'),
            },
        }
    }
    renderTabContent = (type)=>{
        console.log(type)
        const content = this.state[type]
        const {options} = this.state
        let elem = null;
        if(type === 'eth'){
            elem = [
                <View key={0} tabLabel={i18n.t('page_wallet.keystore')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.keystore_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.keystore_placeholder')} 
                            value={content['keystore']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['keystore']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                    </View> 
                </View>,
                <View key={1} tabLabel={i18n.t('page_wallet.mnemonic')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.mnemonic_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.mnemonic_placeholder')} 
                            value={content['mnemonic']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.select_src')}</Text>
                        <View style={styles.relative}>
                            <InputFocus 
                                style={[styles.form_item,styles.br_16]} 
                                placeholder={i18n.t('page_wallet.select_src')} 
                                value={content['mnemonic']['src']}
                                onChangeText={(text)=>this.formChange('src',text)}
                            />
                            <Text style={styles.suffix}>{i18n.t('default')}</Text>
                        </View>
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['mnemonic']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            placeholder={i18n.t('page_register.re_password')}
                            // onBlur={()=>this.checkPwd()}
                            value={content['mnemonic']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                    </View>
                </View>,
                <View key={2} tabLabel={i18n.t('page_wallet.privateKey')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.privateKey_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.privateKey_placeholder')} 
                            value={content['privateKey']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')}
                            value={content['privateKey']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_register.re_password')}
                            value={content['privateKey']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                    </View>
                </View>
            ]
        }
        if(type === 'btc'){
            elem = [
                <View key={0} tabLabel={i18n.t('page_wallet.mnemonic')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.mnemonic_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.mnemonic_placeholder')} 
                            value={content['mnemonic']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['mnemonic']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_register.re_password')} 
                            placeholderTextColor='#999'
                            value={content['mnemonic']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.select_address_type')}</Text>
                        <Radio 
                            value={content['mnemonic']['address']}
                            options={options} 
                            onChange={(text)=>this.formChange('address',text)} 
                        />
                    </View>
                </View>,
                <View key={1} tabLabel={i18n.t('page_wallet.privateKey')}>
                    <View style={styles.form}>
                        <Text style={styles.label}>{i18n.t('page_wallet.privateKey_label')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.form_textarea]}
                            multiline={true}
                            numberOfLines={5} 
                            placeholder={i18n.t('page_wallet.privateKey_placeholder')} 
                            value={content['privateKey']['text']}
                            onChangeText={(text)=>this.formChange('text',text)}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.setting_pwd')}</Text>
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_wallet.wallet_pwd')} 
                            value={content['privateKey']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                        <InputFocus 
                            style={[styles.form_item,styles.br_16]} 
                            secureTextEntry={true}
                            placeholder={i18n.t('page_register.re_password')} 
                            value={content['privateKey']['pwd']}
                            onChangeText={(text)=>this.formChange('pwd',text)}
                        />
                        <Text style={styles.label}>{i18n.t('page_wallet.select_address_type')}</Text>
                        <Radio 
                            value={content['privateKey']['address']}
                            options={options} 
                            onChange={(text)=>this.formChange('address',text)} 
                        />
                    </View>
                </View>
            ]
        }
        return elem
    }
    goBack = () => {
        this.props.navigation.pop();
    };
    changeWay = (e)=>{
        console.log(e)
        const {way} = this.state
        if(e.i !== way){
            this.setState({
                way: e.i
            })
        }
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
    handleSubmit = ()=>{
        const {type} = this.props.navigation.state.params
        const {way} = this.state
        const parent = this.state[type]
        console.log(type,way)
        const params = {}
        if(type === 'eth'){
            if(way === 0){
                Object.assign(params,parent['keystore'])
            }
            if(way === 1){
                Object.assign(params,parent['mnemonic'])
            }
            if(way === 2){
                Object.assign(params,parent['privateKey'])
            }
        }
        if(type === 'btc'){
            if(way === 0){
                Object.assign(params,parent['mnemonic'])
            }
            if(way === 1){
                Object.assign(params,parent['privateKey'])
            }
        }
        console.log(params)
    }
    render() {
        const {type} = this.props.navigation.state.params
        console.log('walletdetail',type)
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
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
                </Content>
                <Footer>
                    <Button
                        onPress={this.handleSubmit}
                        // styleDisabled={{}}
                        // disabled={true}
                        style={styles.btn_box}
                    >
                        <Text style={styles.btn_txt}>{i18n.t('page_wallet.start_import')}</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}