import React, {Component} from 'react';
import styles from './styles';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';
import {$get} from '@utils/fetch'
import StickyWrap from '@components/StickyWrap'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DiscussList from '@components/DiscussList'
import {
    Container,
    Content,
    Spinner,
} from '@components/NDLayout'
import FooterInput from '@components/DiscussFooterInput'
import MarketList from '../../Market/components/MarketListWithLoadBtn'
import CoinInfoView from '../components/CoinInfoView'
import SegmentTabBar from '../components/SegmentTabBar'
import FooterDrawer from '../components/FooterDrawer'
import TrendingWebView from '../components/webView.js'
import FastImage from 'react-native-fast-image'
import {closeRNPage, goRNPage, deviceInfo, getCurrentUser} from '@utils/CNNBridge'
import {NoticeMarketUpdate,calculateStyleVariable} from '@utils/index'
import i18n from '@i18n';
import {adaptUserInfo,cnnLogger} from '@src/utils/index';

const PX = calculateStyleVariable()

const LIMIT = 10




// const WrapComponentWithID = (Component) => {
//     let View = (props) => {
//         const {navigation} = props;
//         const id = navigation.getParam('id');
//         return <Component key={id} {...props}/>;
//     }
//     return View
// }

// @WrapComponentWithID
class ViewControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            scrollY: new Animated.Value(94*PX),
            tabPage: 0,
            placeholder: i18n.t('page_market_detail.discuss_coin_placeholder'),
            activeComment: null,
            commentType: 'discuss_coin', // 默认type发布讨论
            showDeleteModal: false, //删除讨论的探矿
            toDelDiscussID: '',      //
            init: true,
            user: props.user,
            netError: false,
            coin_id: props.nativeInfo.id,
            base_coin_id: props.nativeInfo.base_coin_id,
            is_pair: props.nativeInfo.is_pair,
            info: props.nativeInfo,

        }
    }

    componentDidMount() {
        const { coin_id, is_pair, info, base_coin_id } = this.state
        const pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/' || '')
        cnnLogger('pairs_refresh',{
            pairs,  
            mode: 'auto'
        })
        // if (!is_pair) {
        //如果详情为交易对，用base_coin_id请求讨论列表、交易对列表,否则用coin_id
        //正常币种信息没有base_coin_id
        this.getMarketPairList({coin_id: base_coin_id||coin_id, read_tag: '', count: LIMIT})
        this.getDiscussList({coin_id: base_coin_id||coin_id, read_tag: '', count: LIMIT});
        // } else {
        //     //如果详情为交易对，用base_coin_id请求讨论列表、交易对列表
        //     this.getMarketPairList({coin_id: info.base_coin_id, read_tag: '', count: LIMIT})
        //     this.getDiscussList({coin_id: base_coin_id, read_tag: '', count: LIMIT});
        // }
        this.getCoinDetail(coin_id)
        cnnLogger('discussion_refresh',{
            pairs,  
            mode: 'auto'
        })
        this.userStateListener = DeviceEventEmitter.addListener('userStateChange',async()=>{
            const newUser = await getCurrentUser({});
            if (!is_pair) {
                // this.getAvgPriceData({id,type:'day'})
                this.getMarketPairList({coin_id: base_coin_id||coin_id, read_tag: '', count: LIMIT})
            }
            this.getCoinDetail(coin_id)
            this.getDiscussList({coin_id: base_coin_id||coin_id, read_tag: '', count: LIMIT});
            this.setState({
                user: adaptUserInfo(newUser)
            })
        });
        this.discussDetailListener = DeviceEventEmitter.addListener('discussDetailChange',(data)=>{
            let {discussList:{list}} = this.props
            if(data.type == 'like' || data.type == 'cancel_like'){
                let newItem = list[data.index]
                newItem.like = data.isLiked
                newItem.like_count = data.like_count
                list.splice(data.index,1,newItem)
                this.props.updateDiscussList({list})
            } else if(data.type == 'comment'){
                let newItem = list[data.index]
                newItem.replies = data.replies
                newItem.reply_count += 1
                list.splice(data.index,1,newItem)
                this.props.updateDiscussList({list})
            }
        })
    }
    componentWillUnmount = () => {
        this.userStateListener.remove()
        this.discussDetailListener.remove()
    }

    _onRefresh = () => {
        this.setState({
            isRefreshing: true
        })
        let { coin_id, base_coin_id } = this.state
        // if (!is_pair) {
            // this.getAvgPriceData({id,type:'day'})
        this.getMarketPairList({coin_id:base_coin_id||coin_id, read_tag: '', count: LIMIT})
        // }
        this.getDiscussList({coin_id: base_coin_id||coin_id, read_tag: '', count: LIMIT});
        this.getCoinDetail(coin_id, () => {
            this.setState({
                isRefreshing: false
            })
        })
        // this.getDiscussList({coin_id: id, read_tag: '', count: LIMIT})
    }

    getCoinDetail = (id, successCallback) => {
        this.setState({
            netError: false
        })
        this.props.getCoinDetail(id, successCallback, ()=>{
            this.setState({
                netError: true
            })
        })
    }

    getDiscussList = (obj, successCallback,failCallback) => {
        this.props.getDiscussList(obj, successCallback, failCallback)
    }

    getMarketPairList = (obj, successCallback, failCallback) => {
        this.props.getMarketPairList(obj, (nomore) => {
            successCallback && successCallback(nomore)
        }, () => {
            failCallback && failCallback()
        })
    };

    goMarketDetail = (item) => {
        let currency = '' + item.symbol + (item.pair_name || '') + (item.exchange&&'/'+item.exchange|| '')
        cnnLogger('enter_pairs_detail',{
            from: 'coin_market',  // coin_market
            currency
        })
        goRNPage({
            moduleName:'stark_market_detail',
            params: {
                id: item.id,
                is_pair: item.is_pair,
                image: item.image,
                symbol: item.symbol,
                exchange: item.exchange,
                pair_name: item.pair_name,
                base_coin_id: item.base_coin_id
            }
        })
    }
    getAvgPriceData = (obj, callback) => {
        this.props.getAvgPriceData(obj, callback)
    }
    like_discuss = (id,count,index) => {
        this.props.likeDiscuss(id,()=>{
            let {discussList:{list}} = this.props
            let newItem = list[index]
            newItem.like = true
            newItem.like_count = count
            list.splice(index,1,newItem)
            this.props.updateDiscussList({list})
        })
    }
    cancel_like_discuss = (id,count,index) => {
        this.props.cancleLikeDiscuss(id,()=>{
            let {discussList:{list}} = this.props
            let newItem = list[index]
            newItem.like = false
            newItem.like_count = count
            list.splice(index,1,newItem)
            this.props.updateDiscussList({list})
        })
    }
    deleteDiscuss = (id, index) => {
        this.setState({
            showDeleteModal: true,
            toDelDiscussID: id,
            toDelDiscussIndex: index
        })
    }
    confirmDelete = () => {
        let {toDelDiscussID, toDelDiscussIndex} = this.state
        this.props.deleteDiscuss({id: toDelDiscussID, index: toDelDiscussIndex}, () => {
            this.setState({
                showDeleteModal: false,
                toDelDiscussID: '',
                toDelDiscussIndex: -1
            })
        })
    }
    goBack = () => {
        // this.props.navigation.pop();
        closeRNPage()
    };

    handletabChange = (tab) => {
        this.setState({
            tabPage: tab.i
        })
    };

    clickComment = (item, index) => {
        this.setState({
            activeComment: item,
            placeholder: `@${item.user.name}`,
            commentType: 'discuss_reply',
            discussIndex: index,
            focusFromReply: true
        })
    }
    resetActivecomment = () => {
        this.setState({
            activeComment: null,
            placeholder: i18n.t('page_market_detail.discuss_coin_placeholder'),
            commentType: 'discuss_coin',
            discussIndex: null,
            focusFromReply: false
        })
    }
    inputOnFocus = () => {
        const {info} = this.state
        let pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/' || '')
        let pos = 'input'
        if(this.state.focusFromReply){
            pos = 'reply'
        }
        cnnLogger('open_discussion_input',{
            pairs,
            pos
        })
    }
    onComment = (item, text, cb) => {
        const {coin_id, base_coin_id,commentType, discussIndex} = this.state
        let pairs = '' + this.props.coinDetail.symbol + (this.props.coinDetail.pair_name||'')
        cnnLogger('submit_discussion',{
            pairs,
        })
        if (commentType === 'discuss_coin') {
            this.props.discussCoin({coin_id:coin_id, content: text}, () => {
                cb()
            })
        } else if (commentType === 'discuss_reply') {
            this.props.discussReply({discuss_id: item.id, content: text, discussIndex}, () => {
                cb()
            })
        }
    }
    handleRefresh = (type, callback) => {
        let {coin_id,base_coin_id} = this.state
        this.getMarketPairList({coin_id: base_coin_id||coin_id, read_tag: '', count: LIMIT}, callback)
    }
    handleLoadMore = (type, successCallback, failCallback) => {
        const {coin_id,base_coin_id,info} = this.state
        let pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/' || '')
        cnnLogger('pairs_refresh',{
            pairs,  
            mode: 'manual'
        })
        this.getMarketPairList({
            coin_id: base_coin_id||coin_id,
            read_tag: this.props.coin_market_pair_list.read_tag,
            count: LIMIT,
            isLoadmore: true
        }, successCallback,failCallback)
    }
    handleLoadMoreDiscuss = (successCallback,failCallback) => {
        let {discussList} = this.props
        let {coin_id,info,base_coin_id} = this.state
        let pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/' || '')
        cnnLogger('discussion_refresh',{
            pairs,  
            mode: 'manual'
        })
        this.getDiscussList({
            coin_id: base_coin_id||coin_id,
            read_tag: discussList.read_tag,
            count: LIMIT,
            isLoadmore: true
        }, successCallback,failCallback)
    }
    addCollection = ({id,index,type,tab},successCallback) => {
        let {info} = this.state
        let pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/' || '')
        cnnLogger('select_pairs',{
            pos: tab,  // coin_detail,coin_pair
            pairs
        })
        this.props.addCollection({id,index,type}, () => {
            successCallback && successCallback()
            NoticeMarketUpdate('collectionAction', {id, action: 'add'})
        })
    }
    removeCollection = ({id,index,type,tab},successCallback) => {
        let {info} = this.state
        let pairs = '' + info.symbol + (info.pair_name || '') + (info.exchange&&info.exchange+'/'|| '')
        cnnLogger('cancel_select_pairs',{
            pos: tab,  // coin_detail,coin_pair
            pairs
        })
        this.props.removeCollection({id,index,type}, () => {
            successCallback && successCallback()
            NoticeMarketUpdate('collectionAction', {id, action: 'remove'})
        })
    }
    renderHead = (info) => {
        return <View style={styles.header_box}>
                <TouchableOpacity onPress={this.goBack} style={styles.btn_press_wrap}>
                    <FastImage source={require('@images/icon_back_white.png')} style={styles.btn_press}/>
                </TouchableOpacity>
                <View style={styles.coin_logo}>
                    <FastImage
                        source={{uri: info.image}}
                        style={{width: 29*PX, height: 29*PX}}/>
                </View>
                <View style={styles.coin_box}>
                    <View style={styles.box_top}>
                            <Text style={styles.coin_symbol}>{info.symbol}</Text>
                            {info.is_pair?<Text style={styles.pair_name}>{info.pair_name}</Text>:null}
                    </View>
                    <View style={styles.box_bottom}>
                        <View><Text
                            style={styles.exchange_name}>{info.is_pair ? info.exchange : i18n.t('page_market_detail.global_average_price')}</Text></View>
                        <View><Text style={styles.coin_name}>{info.name}</Text></View>
                    </View>
                </View>
        </View>
    }
    hideDeleteModal = () => {
        this.setState({
            showDeleteModal: false
        })

    }
    onMessage = async (ref, e) => {
        const {coin_id, is_pair} = this.state
        let url = e.nativeEvent.data;
        let data;
        try{
            if (!is_pair) {
            let type = url.replace('CNN_','')
            await $get(`https://app.cnntoken.io/v1/coins/${coin_id}/graph/?type=${type}`)
                .then(res => {
                    console.log(`rn get data: from${url}`, res)
                    data = res
                });
        } else {
            await fetch(url).then(response => response.json()).then((res) => {
                console.log(`rn get data: from${url}`, res);
                data = res
            });
        }
        // this.trendingviewWeb && this.trendingviewWeb.postMessage(JSON.stringify(data));
        ref && ref.postMessage(JSON.stringify(data));
        } catch(e){
            console.log(e)
        }

    };

    onLoadEnd = async (ref, e) => {
        // ref && ref.postMessage('ready')
        // alert('newnewnewn')
    };
    netErrorPage = () => {
        return <Container style={styles.container}>
                {this.renderHead(this.state.info)}
                <Animated.ScrollView
                    onScroll={Animated.event([{
                        nativeEvent: {contentOffset: {y: this.state.scrollY,}}
                    }], {useNativeDriver: true})}
                    scrollEventThrottle={1}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing&&!this.state.netError}
                            onRefresh={this._onRefresh}
                            title={i18n.t('page_market_detail.loading')}
                            colors={['#555555']}
                            progressBackgroundColor={"#ffffff"}/>}>
                        <Text style={{textAlign:'center',paddingTop:20}}>{i18n.t('net_error')}</Text>
                    </Animated.ScrollView>
            </Container>
    }

    render() {
        let {tabPage, showDeleteModal, toDelDiscussID, netError} = this.state
        const {discussList, coinDetail, coin_market_pair_list,nativeInfo} = this.props
        const lang = deviceInfo.lang || 'ko'
        if(netError)return (this.netErrorPage())
        let marketPairList = coin_market_pair_list.list
        let exchange = nativeInfo.exchange || '--'
        let quote = (nativeInfo.pair_name || 'global').replace(/\//g, '')
        let symbol = nativeInfo.symbol.toLowerCase()
        let chart_type = nativeInfo.is_pair ? 1 : 3
        return (
            <View key={this.state.coin_id} style={{flex:1}}>
                {this.renderHead(nativeInfo)}
                {
                    !coinDetail ? 
                        <View style={styles.loading}><Spinner/></View> :
                        <View style={{flex:1}}>
                            <Content>
                                <Animated.ScrollView
                                    onScroll={Animated.event([{
                                        nativeEvent: {contentOffset: {y: this.state.scrollY,}}
                                    }], {useNativeDriver: true})}
                                    scrollEventThrottle={1}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this._onRefresh}
                                            title={i18n.t('page_market_detail.loading')}
                                            colors={['#555555']}
                                            progressBackgroundColor={"#ffffff"}
                                        />}
                                >
                                <CoinInfoView info={this.props.coinDetail}/>
                                <View style={styles.trending_view}>
                                    <TrendingWebView
                                        uri={`https://a.fslk.co/test/cnn_charting/index.html`
                                            +`?base=${symbol}`
                                            +`&quote=${quote}`
                                            +`&exchange=${exchange}`
                                            +`&chart_type=${chart_type}`
                                            +`&lang=${lang}`
                                            // last_price传入webview用以计算tradingview的价格精度
                                            +`&last_price=${nativeInfo.is_pair ? (coinDetail.CNNOWN_price_USD) : coinDetail.price_USD} 
                                        `}
                                        // uri={`http://10.0.2.165:9144/index.html`
                                        //         +`?base=${symbol}`
                                        //         +`&quote=${quote}`
                                        //         +`&exchange=${exchange}`
                                        //         +`&chart_type=${chart_type}`
                                        //         +`&lang=${lang}`
                                        //         // last_price传入webview用以计算tradingview的价格精度
                                        //         +`&last_price=${nativeInfo.is_pair ? (coinDetail.CNNOWN_price_USD) : coinDetail.price_USD}
                                        //     `}
                                        init={this.state.init}
                                        onLoadEnd={this.onLoadEnd}
                                        onMessage={this.onMessage}/>
                                </View>
                                <StickyWrap
                                    stickyHeaderY={445*PX} // 滑动到多少悬浮
                                    stickyScrollY={this.state.scrollY}>
                                    <View style={styles.tabbar_box}>
                                        <ScrollableTabView
                                            renderTabBar={() => <SegmentTabBar/>}
                                            // tabBarUnderlineStyle={styles.tabbar_underline}
                                            onChangeTab={this.handletabChange}
                                            page={tabPage}
                                        >
                                            <Text style={styles.tabitem}
                                                tabLabel={i18n.t('page_market_detail.discuss_list')}></Text>
                                            <Text style={styles.tabitem}
                                                tabLabel={i18n.t('page_market_detail.marketpair_list')}></Text>
                                        </ScrollableTabView>
                                    </View>
                                </StickyWrap>
                                <View style={{backgroundColor: '#fff',flex:1}}>
                                    {
                                        tabPage === 0
                                        ?   <View style={styles.discuss_scroll_height}>
                                                {
                                                    discussList.list 
                                                    ?   <View style={{flex:1}}>
                                                            <DiscussList
                                                                user={this.state.user}
                                                                dataSource={discussList.list}
                                                                like_discuss={this.like_discuss}
                                                                cancel_like_discuss={this.cancel_like_discuss}
                                                                deleteDiscuss={this.deleteDiscuss}
                                                                clickComment={this.clickComment}
                                                                // navigation={this.props.navigation}
                                                                showViewAll={true}
                                                                handleLoadMore={this.handleLoadMoreDiscuss}
                                                                // key={this.state.user.id}
                                                                showLoadMoreBtn={true}
                                                                pairs={''+coinDetail.symbol + (coinDetail.pair_name||'')}
                                                                hideDiscussDetail={false}
                                                            />
                                                        </View>
                                                    :   <View><Spinner style={styles.loading}/></View>
                                                }
                                            </View> 
                                        :   <View style={styles.market_scroll_height}>
                                                <MarketList
                                                    user={this.state.user}
                                                    data={marketPairList}
                                                    type='coin_market_pair'
                                                    supportSort={false}
                                                    goMarketDetail={this.goMarketDetail}
                                                    addCollection={({id,index,type},successCallback)=>this.addCollection({id,index,type,tab:'coin_pair_list'},successCallback)}
                                                    removeCollection={({id,index,type},successCallback)=>this.removeCollection({id,index,type,tab:'coin_pair_list'},successCallback)}
                                                    handleRefresh={this.handleRefresh}
                                                    handleLoadMore={this.handleLoadMore}
                                                    showAction={true}
                                                    showLoadMoreBtn={true}
                                                    key={this.state.user.id}/>
                                            </View>
                                    }
                                </View>
                            </Animated.ScrollView>
                            </Content>
                            <FooterDrawer
                                showDeleteModal={String(toDelDiscussID) && showDeleteModal}
                                hideDeleteModal={this.hideDeleteModal}
                                confirmDelete={this.confirmDelete}
                            />
                        {
                            tabPage === 0 
                            ?   <FooterInput
                                    type={'coinDetail'} // 用于更新自选状态type
                                    coin_id={this.state.coin_id}
                                    addCollection={(id,index,type)=>this.addCollection({id,index,type,tab:'coin_detail'})}
                                    removeCollection={(id,index,type)=>this.removeCollection({id,index,type,tab:'coin_detail'})}
                                    selected={coinDetail.selected}
                                    activeComment={this.state.activeComment}
                                    onComment={this.onComment}
                                    showSelectAction={true}
                                    placeholder={this.state.placeholder}
                                    resetActivecomment={this.resetActivecomment}
                                    onFocus={this.inputOnFocus}
                                    user={this.state.user}/>
                            :   null
                        }
                        </View>                    
                }
                
            </View>
        );
    }
}

export default ViewControl;
