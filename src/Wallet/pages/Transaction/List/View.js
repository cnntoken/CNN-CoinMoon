import React, { PureComponent } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Clipboard,
  // Dimensions,
  // ScrollView,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Underline,
  // List,
  Button,
  Title,
  Spinner,
  Modal,
} from '@components/NDLayout/index';
import styles from './styles';
import { LargeList } from 'react-native-largelist-v3';
// import RefreshHeader from '@components/LargeList/RefreshHeader';
// import LoadingFooter from '@components/LargeList/LoadingFooter';
// import Modal from 'react-native-modal';
import i18n from '@i18n';
import moment from 'moment';
import services from '@services/wallet/index';
import BigNumber from 'bignumber.js';
import { cnnLogger,$toast } from '@utils/index';

export default class ViewControl extends PureComponent {
  constructor(props) {
    super(props);
    const { token } = props.navigation.state.params;
    this.state = {
      allLoaded: false,
      index: 0,
      scrollEnabled: true,
      open: false,
      token,
      transactions: [],
      loading: false,
    };
  }

  componentDidMount() {
    // 从其他页面返回来时请求数据，重新渲染
    this.reRender = this.props.navigation.addListener('willFocus', async () => {
      try {
        const { token } = this.state;
        this.setState({ loading: true });
        const transactions = await services.getTransaction(token);

        this.setState({
          transactions,
          loading: false,
        });
        console.log('transactions', transactions);
      } catch (e) {
        console.log(e);
        $toast(i18n.t('page_wallet.get_transaction_error'));
        this.setState({ loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.reRender;
  }
  goDetail = item => {
    console.log(item);
    const { token } = this.state;
    // 点击交易列表中的某条交易
    cnnLogger('click_transaction',{
      cryptocurr: JSON.stringify(token)
    })
    this.props.navigation.navigate('WalletTransactionDetail', {
      prevState: this.props.navigation.state,
      Transactionid: item,
      token,
    });
  };
  copy2 = async text => {
    console.log(text);
    Clipboard.setString(text);
    try {
      await Clipboard.getString();
      this.closeModal();
      $toast(i18n.t('page_wallet.copy_succcess'));
    } catch (e) {
      console.log(e);
      $toast(i18n.t('page_wallet.copy_fail'));
    }
  };
  showReceipt = () => {
    // 收账
    cnnLogger('click_receive',{
      cryptocurr: this.state.token
    })
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({
      open: false,
    });
  };
  goTransfer = () => {
    const { token } = this.state;
    // 转账
    cnnLogger('click_transfer',{
      cryptocurr: JSON.stringify(token)
    })
    this.props.navigation.navigate('WalletTransactionTransfer', {
      token,
    });
  };
  /* renderItem = item=>{
        return (<TouchableOpacity onPress={()=>this.goDetail(item)}>
            <View style={[styles.list_item]}>
                <View style={styles.list_item_left}>
                    <Image source={item.type==='Received'?require('@images/wallet_icon_inRound.png'):require('@images/wallet_icon_outRound.png')} />
                    <View>
                        <Text numberOfLines={1} ellipsizeMode='middle' style={styles.list_item_left_t1}>{item.from[0]}</Text>
                        <Text style={styles.list_item_left_t2}>{item.timeStamp}</Text>
                    </View>
                </View>
                <View style={styles.list_item_right}>
                    <Text style={item.type==='Received' > 0 ? styles.list_item_right_g:styles.list_item_right_r}>{item.type==='Received'>0&&'+'}{item.fee} {item.tokenName}</Text>
                    {item.status?<View style={styles.list_item_pending}><Text style={styles.list_item_pending_t}>Pending</Text></View>:null}
                </View>
            </View>
            <View style={styles.list_item_last} />
        </TouchableOpacity>)
    } */
  /* _onRefresh = () => {
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
    }; */
  _renderItem = (dataSource, { section, row }) => {
    const {
      token: { token_type },
    } = this.state;
    const item = dataSource[section].items[row];
    const value =
      token_type === 'btc'
        ? (new BigNumber(1e-8)).times(item.value)
        : token_type === 'eth'
        ? (new BigNumber(1e-18)).times(item.value)
        : (new BigNumber(1e-18)).times(item.value);
    return (
      <TouchableOpacity onPress={() => this.goDetail(item)}>
        <View style={[styles.list_item]}>
          <View style={styles.list_item_left}>
            <Image
              source={
                item.type === 'Received'
                  ? require('@images/wallet_icon_inRound.png')
                  : require('@images/wallet_icon_outRound.png')
              }
            />
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="middle"
                style={styles.list_item_left_t1}
              >
                {item.isSent?item.to[0]:item.from[0]}
              </Text>
              <Text style={styles.list_item_left_t2}>
                {moment(item.timeStamp * 1000).fromNow()}
              </Text>
            </View>
          </View>
          <View style={styles.list_item_right}>
            <Text
              style={
                item.type === 'Received'
                  ? styles.list_item_right_g
                  : styles.list_item_right_r
              }
            >

            {['btc','eth','erc20'].includes(token_type)?`${item.type === 'Received' ? '+' : '-'}${value.toString(10)} ${item.tokenSymbol}`:null}
            </Text>
            {item.confirmations > 0 ? (
                null
            ) : <View style={styles.list_item_pending}>
                <Text style={styles.list_item_pending_t}>{i18n.t('page_wallet.transfer_not_confirmed')}</Text>
              </View>}
          </View>
        </View>
        <View
          style={
            !(
              row === dataSource[section].items.length - 1 &&
              section === dataSource.length - 1
            ) && styles.list_item_last
          }
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { open, token, loading, transactions } = this.state;
    const dataSource = [{ items: transactions }];
    // console.log(dataSource)
    return (
      <Container>
        <Header
          leftView={
            <Image
              source={require('@images/icon_back_black.png')}
              style={{ width: 12, height: 23 }}
            />
          }
          title={token.symbol.toLocaleUpperCase()}
        />
        <Content style={{ position: 'relative' }}>
          {loading ? (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 999,
              }}
            >
              <Spinner />
            </View>
          ) : null}
          <Underline style={styles.line} />
          <View>
            <Text style={styles.all}>
              {i18n.t('page_wallet.all_transactions')}
            </Text>
          </View>
          {/* <ScrollView >
                <List 
                    style={styles.scroll_height}
                    dataSource={dataSource} 
                    noDataText={()=><Text>{i18n.t('page_wallet.no_transaction')}</Text>} 
                    renderItem={this.renderItem} 
                />
            </ScrollView> */}
          <View style={styles.scroll_height}>
            {transactions.length ? (
              <LargeList
                ref={ref => (this._largeList = ref)}
                data={dataSource}
                heightForSection={() => 0}
                heightForIndexPath={() => 60}
                renderIndexPath={item => this._renderItem(dataSource, item)}
                // refreshHeader={RefreshHeader}
                // onRefresh={this._onRefresh}
                // loadingFooter={LoadingFooter}
                // onLoading={this._onLoading}
                // allLoaded={allLoaded}
                // scrollEnabled={scrollEnabled}
              />
            ) : (
              <View style={styles.no_data}>
                <Text>{i18n.t('page_wallet.no_transaction')}</Text>
              </View>
            )}
          </View>
        </Content>
        {open&&<Modal
          styleContent={styles.modal}
          closeMask={this.closeModal}
        >
          <View style={styles.modal_child}>
            <View style={styles.modal_header}>
              <View>
                <Button transparent onPress={this.closeModal}>
                  <Image
                    source={require('@images/icon_close.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </Button>
              </View>
              <View>
                <Title
                  txt={i18n.t('page_wallet.receipt_address')}
                  style={{ color: '#000', fontSize: 16 }}
                />
              </View>
              <View style={{ width: 24 }} />
            </View>
            <View>
              <Underline />
              <View style={styles.modal_list}>
                <Text style={styles.modal_info}>{token.wallet_address}</Text>
              </View>
            </View>
            <View style={styles.modal_footer}>
              <Button
                style={styles.modal_btn}
                onPress={() => this.copy2(token.wallet_address)}
              >
                <Text style={styles.color_w}>
                  {i18n.t('page_wallet.copy_receipt_address')}
                </Text>
              </Button>
            </View>
          </View>
        </Modal>}
        <Footer>
          <Button style={[styles.btn, styles.btn_g]} onPress={this.showReceipt}>
            <Image source={require('@images/wallet_icon_inWhite.png')} />
            <Text style={styles.color_w}>{i18n.t('page_wallet.receipt')}</Text>
          </Button>
          <Button style={[styles.btn, styles.btn_y]} onPress={this.goTransfer}>
            <Image source={require('@images/wallet_icon_outWhite.png')} />
            <Text style={styles.color_w}>{i18n.t('page_wallet.payment')}</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
