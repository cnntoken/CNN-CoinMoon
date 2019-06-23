import React, { PureComponent } from 'react'
import { 
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
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
import i18n from '@i18n';
import FastImage from 'react-native-fast-image';
import { cnnLogger } from '@utils/index';

const MOCK_DATA = [
    {
        type: 'eth',
        icon: 'http://img1.newsdog.today/cnn/coin/ETH',
        name: 'ETH',
        total: 0.00,
    },
    {
        type: 'btc',
        icon: 'http://img1.newsdog.today/cnn/coin/BTC',
        name: 'BTC',
        total: 0.00,
    }
]

export default class ViewControl extends PureComponent {
    
    goWalletDetail = (type)=>{
        // 选择导入钱包类型
        cnnLogger('select_wallet_type',{
            type,
        })
        this.props.navigation.navigate('WalletImportDetail', {
            prevState: this.props.navigation.state,
            type
        });
    }
    renderItem = (item)=>(<TouchableOpacity onPress={()=>this.goWalletDetail(item.type)}>
        <View style={styles.item}>
            <View style={styles.item_center}>
                <FastImage 
                    source={{uri: item.icon}}
                    style={styles.prefix_img}
                />
                <Text style={styles.item_txt}>{item.name}</Text>
            </View>
            <View>
                <Image 
                    source={require('@images/wallet_icon_next.png')}
                    style={{height: 18,width: 10}}
                />
            </View>
        </View>
        <Underline />
    </TouchableOpacity>)

    render() {
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                                style={{ width: 12, height: 23 }}
                            />}
                    title={()=><Title txt={i18n.t('page_wallet.import_wallet')} />}

                />
                <Content>
                    <Underline style={styles.line} />
                    <List 
                        dataSource={MOCK_DATA}
                        renderItem={this.renderItem}
                    />
                </Content>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    line: {
        backgroundColor: '#f5f5f5',
        height: 10,
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
    prefix_img: {
        height: 40,
        width: 40,
    },
});