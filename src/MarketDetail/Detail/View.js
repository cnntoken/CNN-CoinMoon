import React, {Component} from 'react';
import styles from './styles';
import {
    View, 
    Text, 
    Animated,
    TouchableOpacity,
    WebView,
} from 'react-native';
import StickyWrap from '@components/StickyWrap'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DiscussList from '../components/DiscussList'
import {
    Container,
    Content,
    Spinner,
} from '@components/NDLayout'
import FooterInput from '../components/FooterInput'
import MarketList from '../../Market/components/MarketList'
import CoinInfoView from '../components/CoinInfoView'
import SegmentTabBar from '../components/SegmentTabBar'
import FooterDrawer from '../components/FooterDrawer'
import FastImage from 'react-native-fast-image'
import { closeRNPage, goRNPage} from '@utils/CNNBridge'
import {NoticeMarketUpdate} from '@utils/index'


const LIMIT = 10

const WrapComponentWithID = (Component) => {
    let View = (props) =>{
        const {navigation} = props;
        const id = navigation.getParam('id');
        return <Component key={id} {...props}/>;
    }
    return View
}
@WrapComponentWithID
class ViewControl extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            scrollY: new Animated.Value(200),
            tabPage: 0,
            placeholder: '聊聊你的看法',
            activeComment: null,
            commentType: 'discuss_coin', // 默认type发布讨论
            showDeleteModal: false, //删除讨论的探矿
            toDelDiscussID: ''      //
        }
    }
    componentDidMount() {
        const {nativeInfo} = this.props;
        const id = nativeInfo.id
        this.setState({
            coin_id: id
        })
        const is_pair = nativeInfo.is_pair
        if(!is_pair){
            // this.getAvgPriceData({id,type:'day'})
            this.getMarketPairList({coin_id:id,read_tag:'',count:LIMIT})
        }
        this.getCoinDetail(id)
        this.getDiscussList({coin_id:id,read_tag:'',count:LIMIT})
    }

    getCoinDetail = (id) => {
        this.props.getCoinDetail(id)
    }
    getDiscussList = (obj,callback) => {
        this.props.getDiscussList(obj,callback)
    }
    getMarketPairList =  (obj, callback) => {
        this.props.getMarketPairList(obj,()=>{
            callback && callback()
        })
    };

    goMarketDetail = (item) => {
        // const id = item.id
        // this.setState({
        //     coin_id: id
        // })
        // this.getCoinDetail(id)
        // this.getDiscussList({coin_id:id,read_tag:'',count:LIMIT})
        goRNPage({
            moduleName:'stark_market_detail',
            params: {
                id: item.id,
                is_pair: item.is_pair
            }
        })
    }
    getAvgPriceData = (obj,callback) => {
        this.props.getAvgPriceData(obj,callback)
    }
    like_discuss = (id) => {
        this.props.likeDiscuss(id)
    }
    cancel_like_discuss = (id) => {
        this.props.cancleLikeDiscuss(id)
    }
    deleteDiscuss = (id,index) => {
        this.setState({
            showDeleteModal: true,
            toDelDiscussID: id,
            toDelDiscussIndex: index
        })
    }
    confirmDelete = () => {
        let {toDelDiscussID,toDelDiscussIndex} = this.state
        this.props.deleteDiscuss({id:toDelDiscussID,index:toDelDiscussIndex},()=>{
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
    }
    clickComment = (item) => {
        this.setState({
            activeComment: item,
            placeholder: `@${item.user.name}`,
            commentType: 'discuss_reply'
        })
    }
    resetActivecomment = () => {
        this.setState({
            activeComment: null,
            placeholder: '聊聊你的看法',
            commentType: 'discuss_coin'
        })
    }
    onComment = (item,text,cb) => {
        const { coin_id,commentType } = this.state

        if(commentType==='discuss_coin'){
            this.props.discussCoin({coin_id,content:text},()=>{
                this.getDiscussList({coin_id,read_tag:'',count:LIMIT})
                cb()
            })
        } else if(commentType==='discuss_reply'){
            this.props.discussReply({discuss_id:item.id,content:text},()=>{
                this.getDiscussList({coin_id,read_tag:'',count:LIMIT})
                cb()
            })
        }
    }
    handleRefresh = (type,callback) => {
        let { coin_id} = this.state
        this.getMarketPairList({coin_id:coin_id,read_tag:'',count:LIMIT},callback)
    }
    handleLoadMore = (type,callback) => {
        const {coin_id} = this.state
        this.getMarketPairList({coin_id:coin_id,read_tag:this.props.coin_market_pair_list.read_tag,count:LIMIT,isLoadmore:true},callback)
    }
    handleLoadMoreDiscuss = (callback) => {
        let {discussList} = this.props
        let {coin_id} = this.state
        this.getDiscussList({coin_id:coin_id,read_tag:discussList.read_tag,count:LIMIT,isLoadmore:true},callback)
    }
    addCollection = (id) => {
        this.props.addCollection(id,()=>NoticeMarketUpdate('collectionAction',{id,action:'add'}))
    }
    removeCollection = (id) => {
        this.props.removeCollection(id,()=>NoticeMarketUpdate('collectionAction',{id,action:'remove'}))
    }
    renderHead = (info) => {
        return <View style={styles.header_box}>
                <TouchableOpacity onPress={this.goBack}>
                    <FastImage source={require('@images/icon_back_white.png')} style={{width: 12, height: 23}}/>
                </TouchableOpacity>
                <View style={styles.coin_logo}>
                    <FastImage
                        source={{uri:info.image}}
                        style={{width: 29, height: 29}}
                    />
                </View>
                <View style={styles.coin_box}>
                    <View style={styles.box_top}>
                        <View><Text style={styles.coin_symbol}>{info.symbol}</Text></View>
                    </View>
                    <View style={styles.box_bottom}>
                        {
                            info.is_pair ?
                                <View><Text style={styles.exchange_name}>{info.exchange}</Text></View>
                            :   null
                        }
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
    render() {
        const { tabPage,showDeleteModal,toDelDiscussID } = this.state
        const { discussList,coinDetail,coin_market_pair_list } = this.props
        const marketPairList = coin_market_pair_list.list
        if(!coinDetail.id) return (<View style={styles.loading}><Spinner /></View>)
        return (
            <Container key={this.state.coin_id}>
                {this.renderHead(this.props.coinDetail)}
                <Content>
                    <Animated.ScrollView
                        onScroll={Animated.event([{
                            nativeEvent: { contentOffset: { y: this.state.scrollY, } }
                        }], { useNativeDriver: true })}
                        scrollEventThrottle={1}
                    >
                        <CoinInfoView
                            info={this.props.coinDetail}
                        />
                        <View style={styles.trending_view}>
                            <WebView
                                source={{uri:'http://10.0.2.165:3000/'}}
                            />
                        </View>
                        <StickyWrap
                            stickyHeaderY={445} // 滑动到多少悬浮
                            stickyScrollY={this.state.scrollY}
                        >
                            <View style={styles.tabbar_box}>
                                <ScrollableTabView
                                    // style={styles.tabbar}
                                    renderTabBar={() => <SegmentTabBar/>}
                                    tabBarUnderlineStyle={styles.tabbar_underline}
                                    // tabBarActiveTextColor="#408EF5"
                                    onChangeTab={this.handletabChange}
                                    page={tabPage}
                                >
                                    <Text style={styles.tabitem} tabLabel="Discuss"></Text>
                                    {
                                        coinDetail.is_pair ? null
                                        :   <Text style={styles.tabitem} tabLabel="Marketpair"></Text>
                                    }
                                </ScrollableTabView>
                            </View>
                        </StickyWrap>
                        <View style={{backgroundColor: '#fff'}}>
                        {
                            tabPage === 0
                            ?  
                            <View style={styles.scroll_height}>
                                {
                                    discussList.list ?
                                        <DiscussList 
                                            user={this.props.user}
                                            dataSource={discussList.list}
                                            like_discuss={this.like_discuss}
                                            cancel_like_discuss={this.cancel_like_discuss}
                                            deleteDiscuss={this.deleteDiscuss}
                                            clickComment={this.clickComment}
                                            navigation={this.props.navigation}
                                            showViewAll={true}
                                            handleLoadMore={this.handleLoadMoreDiscuss}
                                        />
                                    :   <View><Spinner style={styles.loading}/></View>
                                }
                                </View>
                            :   
                            <View style={styles.scroll_height}>
                            <MarketList
                                user={this.props.user}
                                data={[{items:marketPairList}]}
                                type='coin_market_pair'
                                supportSort={false}
                                goMarketDetail={this.goMarketDetail}
                                addCollection={this.addCollection}
                                removeCollection={this.removeCollection}
                                handleRefresh={this.handleRefresh}
                                handleLoadMore={this.handleLoadMore}
                                showAction={true}
                            />
                            </View>
                        }
                        </View>
                    </Animated.ScrollView>
                </Content>
                <FooterDrawer 
                    showDeleteModal={String(toDelDiscussID)&&showDeleteModal}
                    hideDeleteModal={this.hideDeleteModal}
                    confirmDelete={this.confirmDelete}
                />
                <FooterInput 
                    coin_id={this.state.coin_id}
                    addCollection={this.addCollection}
                    removeCollection={this.removeCollection}
                    selected={coinDetail.selected}
                    activeComment={this.state.activeComment}
                    onComment={this.onComment}
                    showSelectAction={true}
                    placeholder={this.state.placeholder}
                    resetActivecomment={this.resetActivecomment}
                    user={this.props.user}
                />
            </Container>
        );
    }
}

export default ViewControl;

