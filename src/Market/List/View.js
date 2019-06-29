import React, {Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from '../components/ListTabBar'
import MarketList from '../components/MarketList'
import i18n from '@i18n';
import {DeviceEventEmitter,Platform,View} from 'react-native';
import {goRNPage,getCurrentUser, isRNRootPage} from '@utils/CNNBridge'
import {cnnLogger,adaptUserInfo} from '@utils/index';

const LIMIT = 20
const isAndroid = Platform.OS === "android";


class ViewControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            all_netError: false,
            mine_netError: false,
            netError: false,
            user: props.user
        }
        this.interval = null
    }

    getList =  (obj, callback) => {
        cnnLogger('currency_refresh',{
            tab: obj.category  // 'all,mine'
        })
        this.props.getList(obj,(no_more)=>{
            callback && callback(no_more)
            this.setState({
                [`${obj.category}_netError`]: false,
            })
        },()=>{
            // 网络错误
            this.setState({
                [`${obj.category}_netError`]: true,
            })
            callback && callback()
        })
    };

    getDatabyMineID = (ids) => {
        this.props.getDatabyMineID(ids)
    }
    refreshMineData = () => {
        this.interval = setInterval(()=>{
            let {mineID} = this.props
            if(mineID.length){
                this.getDatabyMineID(mineID)
            }
        },120 * 1000)
    }
    componentDidMount() {
        this.getList({count: LIMIT,category:'mine',read_tag:''})
        // this.getList({count: LIMIT,category:'all',read_tag:'',sort_by:'-market_cap'})
        this.refreshMineData()
        //监听详情页发起的自选操作事件
        this.collectionListener = DeviceEventEmitter.addListener('collectionAction',()=>{
            this.getList({count: LIMIT,category:'mine',read_tag:''})
        });
        this.userStateListener = DeviceEventEmitter.addListener('userStateChange',async()=>{
            const newUser = await getCurrentUser({});
            this.setState({
                user: adaptUserInfo(newUser),
            },()=>{
                this.getList({count: LIMIT,category:'mine',read_tag:''})
                this.getList({count: LIMIT,category:'all',read_tag:'',sort_by:'-market_cap'})
            })
        });
    }
    componentWillUnmount(){
        this.collectionListener.remove();
        this.userStateListener.remove();
        if(this.interval){
            clearInterval(this.interval);
            this.interval = null
        }
    }
  
    handleSort = ({category,sort_by,count},successCallback) => {
        let read_tag = this.props[category].read_tag
        // 如果切换了排序维度，则read_tag置为''
        if(this.props[category].sort_by !== sort_by){
            read_tag = ''
        }
        this.props.getList({category,sort_by,count,read_tag},successCallback)
    }
    handleRefresh = (category,successCallback,failCallback) => {
        const params = {
            category,
            read_tag: '',
            count: LIMIT,
            isLoadmore: false,
        }
        if(category==='all'){
            params.sort_by = this.props[category].sort_by
        }
        this.getList(params,successCallback,failCallback)
    }
    handleLoadMore = (category,successCallback,failCallback) => {
        const params = {
            category,
            read_tag: this.props[category].read_tag,
            count: LIMIT,
            isLoadmore: true,
        }
        if(category==='all'){
            params.sort_by = this.props[category].sort_by
        }
        this.getList(params,successCallback,failCallback)
    }
    goMarketDetail = (item,cate) => {
        let currency = '' + item.symbol + (item.pair_name || '') + (item.exchange&&'/'+item.exchange|| '')
        cnnLogger('enter_pairs_detail',{
            from: cate,  // all,mine
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
    // addCollection = (id,index,type,info) => {
    //     this.props.addCollection(id,index,type,info)
    // }
    // removeCollection = (id,index,type,info) => {
    //     this.props.removeCollection(id,index,type,info)
    // }
    goSeach = () => {
        cnnLogger('click_search_pairs')
        this.props.navigation.navigate('MarketSearch')
        isRNRootPage({
            moduleName: 'stark_market',
            isRoot: false
        })
    }
    
    render() {
        console.disableYellowBox = true;
        return (
                <View style={{flex:1}}>
                    <ScrollableTabView
                        renderTabBar={() => <ListTabBar goSeach={this.goSeach}/>}>
                            {['mine', 'all'].map((cate) => {
                            return <MarketList
                                    key={cate}
                                    data={this.state[`${cate}_netError`]?[...(this.props[cate].list||[]),{netError:true,id:'--'}]:this.props[cate].list}
                                    // data={[{items:this.props[cate].list}]}
                                    supportSort={cate==='all'?true: false} // 只有币种排行支持排序，自选列表不支持
                                    sort_by={this.props[cate].sort_by}
                                    type={cate}
                                    showOrder={cate==='all'?true:false}
                                    tabLabel={i18n.t(`page_market_list.category_${cate}`)}
                                    handleSort={this.handleSort}
                                    handleRefresh={this.handleRefresh}
                                    handleLoadMore={this.handleLoadMore}
                                    goMarketDetail={(item)=>this.goMarketDetail(item,cate)}
                                    // addCollection={this.addCollection}
                                    // removeCollection={this.removeCollection}
                                    user={this.state.user}
                                    allLoaded={this.props[cate].no_more}
                                    netError={this.state[`${cate}_netError`]}
                                />
                        })}
                    </ScrollableTabView>
                </View>
        );
    }
}

export default ViewControl;
