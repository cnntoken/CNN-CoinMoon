import React, {Component} from 'react';
import styles from './styles';
import i18n from '@i18n';
import {
    // Image,
    Text,
    View,
    TouchableOpacity,
    Image
} from "react-native";

import TriangleIcon from '../TriangleIcon/index'
import MarketItem from '../MarketItem/index'
const LIMIT = 20

import RefreshListView, {RefreshState} from '@components/RefreshListView';

/**
 * showOrder 展示序列号
 * showAction 展示添加自选/移除自选icon
 */
class MarketList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingMore: false,
            refreshing: false,
            showFoot: 0,
            sorting: false,
            // refreshing: false,
            loadMoreing: false,
            refreshState: RefreshState.Idle
        }
    }
    componentDidMount = () => {
        // if(this.props.data && this.props.){
        //     return false
        // }
        // const nomore = this.props.data.length < LIMIT || this.props.allLoaded ? true : false
        // this.setState({
        //     showFoot: nomore ? 2 : 0, // 0: 仍可加载， 1: 正在加载， 2:没有更多数据了，不可加载
        // })
    }

    // 添加自选
    addCollection = ({id,index,type,info},successCallback) => {
        this.props.addCollection({id,index,type,info},successCallback)

    };

    // 取消自选
    removeCollection= ({id,index,type,info},successCallback) => {
        this.props.removeCollection({id,index,type,info},successCallback)
    };

    onError = () => {
        console.log('image load fail');
    }

    // 下拉刷新
    // _onRefresh = (category) => {
    //     if(!this.props.handleRefresh) return false
    //     if(!this.state.refreshing){
    //         this.setState({
    //             refreshing: true
    //         })
    //         this.props.handleRefresh(category,()=>{
    //             this.setState({
    //                 refreshing: false
    //             })
    //         })
    //     }
    // }
    //  下滑刷新
    handleRefresh = (category) => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        },()=>{
            this.props.handleRefresh(category,()=>{
                let refreshState = RefreshState.Idle;
                this.setState({
                    loadMoreing: false,
                    refreshing: false,
                    refreshState
                })
            })
        });
       
    };
    handleLoadMore = (category) => {
        if (this.state.loadMoreing||this.props.netError) {
            return false;
        }
        if(this.props.data.length<LIMIT){
            this.setState({
                refreshState: RefreshState.NoMoreData
            })
            return false
        }
        this.setState({
            loadMoreing: true,
            refreshState: RefreshState.FooterRefreshing
        },()=>{
            this.props.handleLoadMore(category,(nomore)=>{
                let refreshState = RefreshState.Idle;
                if(nomore){
                    refreshState = RefreshState.NoMoreData;
                }
                this.setState({
                    loadMoreing: false,
                    refreshing: false,
                    refreshState
                })
            },()=>{
                let refreshState = RefreshState.Idle;
                this.setState({
                    loadMoreing: false,
                    refreshing: false,
                    refreshState
                })
            })
        });
       
    };
    handleItemPress = (item) => {
        this.props.goMarketDetail(item)
    }
    _renderItem = ({item,index}) => {
        // net_error
        if(item.netError){
            return <Text style={{paddingTop: 10,textAlign:'center'}}>{i18n.t('net_error')}</Text>
        }
        const {showAction,showOrder,type} = this.props;
        return  <MarketItem
                    key={item.id}
                    handleItemPress={this.handleItemPress}
                    addCollection={this.addCollection}
                    removeCollection={this.removeCollection}
                    showAction={showAction}
                    showOrder={showOrder}
                    item={item}
                    index={index}
                    user={this.props.user}
                    type={type}
                />
    }

    handleSort = (category,sort_by,count) => {
        if(this.state.sorting){
            return false
        }
        this.setState({
            sorting: true
        })
        let dir 
        if(sort_by === this.props.sort_by.replace(/-/g,'')){
            dir = this.props.sort_by.includes('-') ? sort_by : '-' + sort_by
        } else {
            dir = '-' + sort_by
        }
        this.props.handleSort({category,sort_by:dir,count},()=>{
            let refreshState = RefreshState.Idle;
            this.setState({
                sorting: false,
                loadMoreing: false,
                refreshing: false,
                refreshState
            })
        })
    }
    // 头部过滤条件
    ListHeaderComponent = (type) => {
        if(this.props.data&&!this.props.data.length) return null
        const { sort_by } = this.props
        if(type === 'mine'||type==='coin_market_pair'||type==='search'){
            return  <View style={styles.filter_con}>
                        <View style={styles.filter_item_1}>
                            <Image  style={styles.pair_icon}source={require('@images/market_pair.png')}/>
                            <Text style={styles.text}>{i18n.t('page_market_list.market_pair_title')}</Text>
                        </View>
                        <View style={styles.filter_item_2}>
                            <Text style={styles.text}>
                                {i18n.t('page_market_list.current_price')}
                            </Text>
                        </View>
                        <View style={styles.filter_item_3}>
                            <Text style={styles.text}>{i18n.t('page_market_list.change_24h')}</Text>
                            {
                                //空白占位,保证对齐
                               this.props.showAction
                               ?    <View style={styles.action_placeholder}></View>
                               :    null
                            }
                        </View>
                    </View>
        } else if(type === 'all'){
            return  <View style={styles.filter_con}>
                        <View style={styles.filter_item_1}>
                            <TouchableOpacity disabled={this.state.sorting} onPress={()=>this.handleSort('all','market_cap',LIMIT)} style={styles.filter_item_left_btn}>
                                <Text style={styles.text}>{i18n.t('page_market_list.market_cap')}</Text>
                                <TriangleIcon sort_dir={sort_by!=='-market_cap'?(sort_by==='market_cap'?'asc':''):'desc'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filter_item_2}>
                            <TouchableOpacity disabled={this.state.sorting} onPress={()=>this.handleSort('all','price',LIMIT)} style={styles.filter_item_right_btn}>
                                <Text style={styles.text}>
                                    {i18n.t('page_market_list.current_price')}
                                </Text>
                                <TriangleIcon sort_dir={sort_by!=='-price'?(sort_by==='price'?'asc':''):'desc'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filter_item_3}>
                            <TouchableOpacity disabled={this.state.sorting} style={styles.filter_item_right_btn} onPress={()=>this.handleSort('all','change',LIMIT)}>
                                <Text style={styles.text}>{i18n.t('page_market_list.change_24h')}</Text>
                                <TriangleIcon sort_dir={sort_by!=='-change'?(sort_by==='change'?'asc':''):'desc'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
        }
    };
    renderEmptyView = (type) => {
        if(type == 'mine'&&this.state.refreshState!==RefreshState.HeaderRefreshing){
            return <View style={styles.no_mine}><Text style={styles.no_mine_text}>{i18n.t('page_market_list.no_mine_text')}</Text></View>
        } else {
            return <View />
        }
    }
    getKey = (item,index) => {
        return index.toString()
    }

    render() {
        let {data, type} = this.props;
        return (
            <View style={{flex:1}} onLayout={this.props.onLayout}>
                     <View style={{flex:1}}>
                            {this.ListHeaderComponent(type)}
                            <RefreshListView
                                // initialNumToRender={20}
                                getItemLayout={(data, index) => ( {length: 65, offset: 65 * index, index} )}
                                data={data}
                                keyExtractor={this.getKey}
                                renderItem={this._renderItem}
                                refreshState={this.state.refreshState}
                                onHeaderRefresh={()=>this.handleRefresh(type)}
                                onFooterRefresh={()=>this.handleLoadMore(type)}
                                ListEmptyComponent={()=>this.renderEmptyView(type)}
                                // 可选
                                footerRefreshingText={i18n.t('page_market_list.footerRefreshingText')}
                                footerFailureText={i18n.t('page_market_list.footerFailureText')}
                                footerNoMoreDataText={(type==='mine'&&!data.length)?'':i18n.t('page_market_list.footerNoMoreDataText')}
                                footerEmptyDataText={i18n.t('page_market_list.footerEmptyDataText')}
                            />
                    </View>
                </View>
            )
    }
}

export default MarketList;
