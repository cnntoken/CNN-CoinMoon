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
    Footer,
    Underline,
    // List,
    Button,
    Title,
} from '@components/NDLayout/index'
import styles from './styles';
import { LargeList } from "react-native-largelist-v3";
import RefreshHeader from '@components/LargeList/RefreshHeader';
import LoadingFooter from '@components/LargeList/LoadingFooter';
import Modal from 'react-native-modal';
import Toast from '@components/Toast/index';
import i18n from '@i18n';


export default class ViewControl extends PureComponent {
    state = {
        dataSource: [
            {items: [
                {income: false,address:'123456...654321',time:'1分钟前',number: -0.0005,type:'ether',pending: false},
                {income: true,address:'123456...654321',time:'1分钟前',number: +0.0005,type:'ether',pending: true},
                {income: false,address:'123456...654321',time:'1分钟前',number: +0.00005,type:'ether',pending: false},
            ]},
            {items: [
                {income: false,address:'123456...654321',time:'1分钟前',number: -0.0005,type:'ether',pending: false},
                {income: true,address:'123456...654321',time:'1分钟前',number: +0.0005,type:'ether',pending: true},
                {income: false,address:'123456...654321',time:'1分钟前',number: +0.00005,type:'ether',pending: false},
            ]},
            {items: [
                {income: false,address:'123456...654321',time:'1分钟前',number: -0.0005,type:'ether',pending: false},
                {income: true,address:'123456...654321',time:'1分钟前',number: +0.0005,type:'ether',pending: true},
                {income: false,address:'123456...654321',time:'1分钟前',number: +0.00005,type:'ether',pending: false},
            ]},
        ],
        allLoaded: false,
        index: 0,
        scrollEnabled: true,
        open: false,
    }
    _largeList;
    goBack = () => {
        this.props.navigation.pop();
    };
    goDetail = (item)=>{
        console.log(item)
        const { type } = this.props.navigation.state.params
        this.props.navigation.navigate('WalletTransactionDetail', {
            prevState: this.props.navigation.state,
            Transactionid: item,
            type
        });
    }
    copy2 = async (text)=>{
        console.log(text)
        Clipboard.setString(text)
        try {
            const content = await Clipboard.getString()
            this.closeModal()
            Toast.show(`${content} copied success`)
        } catch (e) {
            console.log(e)
            Toast.show(`copied error`)
        }
    }
    showReceipt = (type)=>{
        console.log(type)
        this.setState({open: true})
    }
    closeModal = ()=>{
        this.setState({
            open: false,
        })
    }
    goTransfer = (type)=>{
        this.props.navigation.navigate('WalletTransactionTransfer', {
            prevState: this.props.navigation.state,
            type
        });
    }
    _renderHeader = () => {
        return (
            <View>
                <Text>I am header</Text>
            </View>
        );
    };

    _renderFooter = () => {
        return (
            <View>
                <Text>I am Footer</Text>
            </View>
        );
    };

    _onRefresh = () => {
        setTimeout(() => {
            this._largeList.endRefresh();
            let index = this.state.index
            this.setState({
                index: 0,
                dataSource: [
                    {items: [
                        {income: false,address:'123456...654321',time:'1分钟前',number: -0.0005,type:'ether',pending: false},
                        {income: true,address:'123456...654321',time:'1分钟前',number: +0.0005,type:'ether',pending: true},
                        {income: false,address:'123456...654321',time:'1分钟前',number: +0.00005,type:'ether',pending: false},
                    ]},
                    {items: [
                        {income: false,address:'123456...654321',time:'1分钟前',number: -0.0005,type:'ether',pending: false},
                        {income: true,address:'123456...654321',time:'1分钟前',number: +0.0005,type:'ether',pending: true},
                        {income: false,address:'123456...654321',time:'1分钟前',number: +0.00005,type:'ether',pending: false},
                    ]},
                    {items: [
                        {income: false,address:'123456...654321',time:'1分钟前',number: -0.0005,type:'ether',pending: false},
                        {income: true,address:'123456...654321',time:'1分钟前',number: +0.0005,type:'ether',pending: true},
                        {income: false,address:'123456...654321',time:'1分钟前',number: +0.00005,type:'ether',pending: false},
                    ]},
                ],
                allLoaded: index > 3
            });
        }, 2000);
    };

    _onLoading = () => {
        setTimeout(() => {
            const old = this.state.dataSource
            let index = this.state.index
            this.setState({
                index: ++index,
                dataSource: [...old, {
                    items:  [
                        {income: false,address:'123456...654321',time:'1分钟前',number: -0.0005,type:'ether',pending: false},
                        {income: true,address:'123456...654321',time:'1分钟前',number: +0.0005,type:'ether',pending: true},
                        {income: false,address:'123456...654321',time:'1分钟前',number: +0.00005,type:'ether',pending: false},
                    ]
                }],
                allLoaded: index > 3
            },()=>{
                this._largeList.endLoading();
            });
        }, 2000);
    };

    _renderSection = (section) => {
        return (
            <TouchableOpacity>
                <Text>
                    {section}
                </Text>
            </TouchableOpacity>
        );
    };
    _renderItem = ({ section: section, row: row }) => {
        const {dataSource} = this.state
        const item = dataSource[section].items[row]
        return (<TouchableOpacity onPress={()=>this.goDetail(item)}>
            <View style={[styles.list_item]}>
                <View style={styles.list_item_left}>
                    <Image source={item.income?require('@images/wallet_icon_inRound.png'):require('@images/wallet_icon_outRound.png')} />
                    <View>
                        <Text style={styles.list_item_left_t1}>{item.address}</Text>
                        <Text style={styles.list_item_left_t2}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.list_item_right}>
                    <Text style={item.number > 0 ? styles.list_item_right_g:styles.list_item_right_r}>{item.number>0&&'+'}{item.number} {item.type}</Text>
                    {item.pending?<View style={styles.list_item_pending}><Text style={styles.list_item_pending_t}>Pending</Text></View>:null}
                </View>
            </View>
            <View style={!(row === dataSource[section].items.length - 1 && section === dataSource.length - 1) && styles.list_item_last} />
        </TouchableOpacity>)
    }
    render() {
        const { type } = this.props.navigation.state.params
        const { dataSource,allLoaded,scrollEnabled,open } = this.state
        console.log('walletTransaction', type)
        return (
            <Container>
                <Header 
                    leftView={<Image 
                                source={require('@images/icon_back_black.png')} 
                            />}
                    title={()=><Title txt={type === 'eth'?'ETH':'BTC'} />}

                />
                <Content>
                    <Underline style={styles.line} />
                    <View>
                        <Text style={styles.all}>{i18n.t('page_wallet.all_transactions')}</Text>
                    </View>
                    <View style={styles.scroll_height}>
                        {dataSource.length?<LargeList
                            ref={ref => (this._largeList = ref)}
                            data={dataSource}
                            heightForSection={() => 0}
                            // renderSection={this._renderSection}
                            heightForIndexPath={() => 60}
                            renderIndexPath={this._renderItem}
                            refreshHeader={RefreshHeader}
                            onRefresh={this._onRefresh}
                            loadingFooter={LoadingFooter}
                            onLoading={this._onLoading}
                            allLoaded={allLoaded}
                            scrollEnabled={scrollEnabled}
                            // renderHeader={this._renderHeader}
                            // renderFooter={this._renderFooter}
                        />:<Text>{i18n.t('page_wallet.no_transaction')}</Text>}
                    </View>
                    <Modal 
                        style={styles.modal}
                        isVisible={open}
                        onBackdropPress={this.closeModal}
                        onBackButtonPress={this.closeModal}
                        onModalHide={this.closeModal}
                    >

                        <View style={styles.modal_child}>
                            <View style={styles.modal_header}>
                                <View>
                                    <Button transparent onPress={this.closeModal}>
                                        <Image source={require('@images/icon_close.png')} style={{ width: 24, height: 24 }} />
                                    </Button>
                                </View>
                                <View>
                                    <Title txt={i18n.t('page_wallet.receipt_address')} style={{ color:'#000',fontSize:16 }} />
                                </View>
                                <View style={{width: 24}} />
                            </View>
                            <View>
                                <Underline />
                                <View style={styles.modal_list}>
                                    <Text style={styles.modal_info}>12345678902345678901234567890</Text>
                                </View>
                            </View>
                            <View style={styles.modal_footer}>
                                <Button style={styles.modal_btn} onPress={()=>this.copy2('12345…4567890')}>
                                    <Text style={styles.color_w}>{i18n.t('page_wallet.copy_receipt_address')}</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Content>
                <Footer>
                    <Button style={[styles.btn, styles.btn_g]} onPress={()=>this.showReceipt(type)}>
                        <Image source={require('@images/wallet_icon_inWhite.png')} />
                        <Text style={styles.color_w}>{i18n.t('page_wallet.receipt')}</Text>
                    </Button>
                    <Button style={[styles.btn, styles.btn_y]} onPress={()=>this.goTransfer(type)}>
                        <Image source={require('@images/wallet_icon_outWhite.png')} />
                        <Text style={styles.color_w}>{i18n.t('page_wallet.payment')}</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}