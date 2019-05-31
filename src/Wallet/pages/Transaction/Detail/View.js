import React, { PureComponent } from 'react'

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Clipboard,
} from "react-native";
import {
    Container,
    Header,
    Content,
    // Footer,
    Underline,
    List,
    // Button,
    Title,
} from '@components/NDLayout'
import styles from './styles';
import Toast from '@components/Toast';
import i18n from '@i18n';


const MOCK_LIST = [
    {key: 'payment_address',canCopy: false,label: i18n.t('page_wallet.payment_address')},
    {key: 'receipt_address',canCopy: false,label: i18n.t('page_wallet.receipt_address')},
    {key: 'miner_cost',canCopy: false,label: i18n.t('page_wallet.miner_cost')},
    {key: 'remark',canCopy: true,label: i18n.t('page_wallet.remark')},
    {key: 'transfer_number',canCopy: false,label: i18n.t('page_wallet.transfer_number')},
    {key: 'block',canCopy: false,label: i18n.t('page_wallet.block')},
    {key: 'transfer_time',canCopy: false,label: i18n.t('page_wallet.transfer_time')},
]
export default class ViewControl extends PureComponent {

    goBack = () => {
        this.props.navigation.pop();
    };
    copy2 = async (text)=>{
        console.log(text)
        Clipboard.setString(text)
        try {
            const content = await Clipboard.getString()
            Toast.show(`${content} copied success`)
        } catch (e) {
            console.log(e)
            Toast.show(`copied error`)
        }
    }
    renderItem = (item)=>{
        console.log(item)
        let elem = null;
        if(item.canCopy){
            elem = <View>
                <View style={styles.list}>
                    <Text style={styles.label}>{i18n.t(`page_wallet.${item.key}`)||item.label}:</Text>
                    <TouchableOpacity style={styles.copy} onPress={()=>this.copy2('12345…4567890')}>
                        <Text style={[styles.info,styles.blue]}>12345…4567890</Text>
                        <Text style={[styles.info,styles.blue]}>复制地址</Text>
                    </TouchableOpacity>
                </View>
                <Underline />
            </View>
        }else{
            elem = <View>
                <View style={styles.list}>
                    <Text style={styles.label}>{i18n.t(`page_wallet.${item.key}`)||item.label}:</Text>
                    <Text style={styles.info}>12345678902345678901234567890</Text>
                </View>
                <Underline />
            </View>
        }
        return elem
    }
    render() {
        const { type,Transactionid } = this.props.navigation.state.params
        console.log('walletTransaction', type,Transactionid)
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                            />}
                    title={()=><Title txt={type === 'eth'?'ETH':'BTC'} />}

                />
                <Content>
                    <View style={styles.check}>
                        {Transactionid.pending?
                            <View style={styles.pending}>
                                <Text style={styles.pending_t}>Pending</Text>
                            </View>
                        :
                            <Image 
                                source={require('@images/wallet_icon_done.png')} 
                                style={{height:40,width:40}} 
                            />
                        }
                        <Text style={styles.check_txt}>0.0005 {type==='eth'?'ether':type==='btc'?'btc':''}</Text>
                    </View>
                    <Underline />
                    <List
                        dataSource={MOCK_LIST}
                        renderItem={this.renderItem}
                    />
                </Content>
            </Container>
        )
    }
}