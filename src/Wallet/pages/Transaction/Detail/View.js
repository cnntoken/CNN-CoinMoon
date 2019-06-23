import React, { PureComponent } from 'react';

import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    Clipboard,
    ScrollView
} from 'react-native';
import {
    Container,
    Header,
    Content,
    // Footer,
    Underline,
    List,
    // Button,
    // Title,
} from '@components/NDLayout';
import styles from './styles';
import i18n from '@i18n';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import {$toast} from '@utils/index'


const MAP_LIST = [
    { label_key: 'payment_address', canCopy: false, key: 'to' },
    { label_key: 'receipt_address', canCopy: false, key: 'from' },
    { label_key: 'miner_cost', canCopy: false, key: 'fee' },
    // { label_key: 'remark', canCopy: false, key: 'confirmations' },
    { label_key: 'transfer_number', canCopy: true, key: 'txHash' },
    { label_key: 'block', canCopy: false, key: 'blockHeight' },
    { label_key: 'transfer_time', canCopy: false, key: 'timeStamp' },
];
export default class ViewControl extends PureComponent {
    goBack = () => {
        this.props.navigation.pop();
    };
    copy2 = async text => {
        console.log(text);
        Clipboard.setString(text);
        try {
            await Clipboard.getString();
            $toast(i18n.t('page_wallet.copy_succcess'));
        } catch (e) {
            console.log(e);
            $toast(i18n.t('page_wallet.copy_fail'));
        }
    };
    renderItem = (Transactionid, item) => {
        console.log(item);
        let elem = null;
        let value = Transactionid[item.key];
        if(item.key === 'timeStamp'){
            value = value&&moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')||i18n.t('page_wallet.transfer_not_confirmed')
        }
        if(item.key === 'fee'){
            value = Transactionid.feeFormat;
        }
        if (item.canCopy) {
            elem = (
                <View>
                    <View style={styles.list}>
                        <Text style={styles.label}>
                            {i18n.t(`page_wallet.${item.label_key}`)}:
                        </Text>
                        <TouchableOpacity
                            style={styles.copy}
                            onPress={() => this.copy2(value)}
                        >
                            <Text ellipsizeMode='middle' numberOfLines={1} style={[styles.info, styles.blue,{width: 150}]}>
                                {value}
                            </Text>
                            <Text style={[styles.info, styles.blue]}>
                                {i18n.t('page_wallet.copy_address')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Underline />
                </View>
            );
        } else {
            elem = (
                <View>
                    <View style={styles.list}>
                        <Text style={styles.label}>
                            {i18n.t(`page_wallet.${item.label_key}`)}:
                        </Text>
                        {Array.isArray(value) ? (
                            value.map((v, i) => (
                                <Text key={i} style={styles.info}>
                                    {v}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.info}>{value}</Text>
                        )}
                    </View>
                    <Underline />
                </View>
            );
        }
        return elem;
    };
    render() {
        const { token:{token_type,symbol}, Transactionid } = this.props.navigation.state.params;
        const value =
            token_type === 'btc'
            ? (new BigNumber(1e-8)).times(Transactionid.value)
            : token_type === 'eth'
            ? (new BigNumber(1e-18)).times(Transactionid.value)
            : (new BigNumber(1e-9)).times(Transactionid.value)
        console.log('walletTransaction', token_type, Transactionid);
        return (
            <Container>
                <Header
                    leftView={
                        <Image
                            source={require('@images/icon_back_black.png')}
                            style={{ width: 12, height: 23 }}
                        />
                    }
                    title={symbol.toLocaleUpperCase()}
                />
                <Content>
                    <View style={styles.check}>
                        {Transactionid.confirmations > 0 ? (
                            <Image
                                source={require('@images/wallet_icon_done.png')}
                                style={{ height: 40, width: 40 }}
                            />
                        ) : (
                            <View style={styles.pending}>
                                <Text style={styles.pending_t}>{i18n.t('page_wallet.transfer_not_confirmed')}</Text>
                            </View>
                        )}
                        <Text style={styles.check_txt}>
                            {['btc','eth'].includes(token_type)?`${Transactionid.type === 'Received' ? '+' : '-'}${value.toString(10)} ${Transactionid.tokenSymbol}`:null}
                        </Text>
                    </View>
                    <Underline />
                    <ScrollView>
                        <List
                            dataSource={MAP_LIST}
                            renderItem={item =>
                                this.renderItem(Transactionid, item)
                            }
                        />
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}
