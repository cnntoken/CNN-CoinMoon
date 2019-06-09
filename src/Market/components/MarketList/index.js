import React, {Component} from 'react';
import styles from './styles';
import i18n from '@i18n';
import {
    // Image, 
    Text, 
    View, 
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from "react-native";

import TriangleIcon from '../TriangleIcon/index'
import MarketItem from '../MarketItem/index'
import Spinner from '@components/NDLayout/Spinner';
const LIMIT = 10
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
            showFoot: 0
        }
    }
    componentDidMount = () => {
        console.log('11111111111111',this.props.type)
        // if(this.props.data && this.props.){
        //     return false
        // }
        // const nomore = this.props.data.length < LIMIT || this.props.allLoaded ? true : false
        // this.setState({
        //     showFoot: nomore ? 2 : 0, // 0: 仍可加载， 1: 正在加载， 2:没有更多数据了，不可加载
        // })
    }

    // 添加自选
    addCollection = (id) => {
        this.props.addCollection(id)

    };

    // 取消自选
    removeCollection= (id) => {
        this.props.removeCollection(id)
    };
    
    onError = () => {
        console.log('image load fail');
    }

    // 下拉刷新
    _onRefresh = (category) => {
        if(!this.props.handleRefresh) return false
        if(!this.state.refreshing){
            this.setState({
                refreshing: true
            })
            this.props.handleRefresh(category,()=>{
                // this._largeList.endRefresh();
                this.setState({
                    refreshing: false
                })
            })
        }
    }
    //上拉加载更多
    _onLoading = (category) => {
        // return false
        if(!this.props.handleLoadMore){
            return null
        }
        // 不处于正在加载更多 && 有下拉刷新过 && 仍有数据可供刷新
        if (!this.state.loadingMore 
            && this.props.data.length > 0
            && this.state.showFoot !== 2
            && !this.props.allLoaded) {
                console.log('????????????????',this.state.showFoot,this.props.allLoaded)
                this.setState({
                    loadingMore: true,
                    showFoot: 1,
                })
                this.props.handleLoadMore(category,(nomore)=>{
                    this.setState({
                        showFoot: nomore ? 2 : 0,
                        loadingMore: false
                    })
                })
        }
    }
    handleItemPress = (item) => {
        this.props.goMarketDetail(item)
    }
    _renderItem = ({item,index}) => {
        const {showAction,showOrder} = this.props
        return  <MarketItem
                    handleItemPress={this.handleItemPress}
                    addCollection={this.addCollection}
                    removeCollection={this.removeCollection}
                    showAction={showAction}
                    showOrder={showOrder}
                    item={item}
                    index={index}
                />
    }
       // 空数据
    // _createEmptyView() {
    //     return (
    //         <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
    //             <Text style={{fontSize: 16}}>
    //                 暂无数据
    //             </Text>
    //         </View>
    //     );
    // }
    _createListFooter = () => {
        if(!this.state.showFoot) return null
        return  <View style={styles.footerContainer}>
                    {
                        this.state.showFoot === 1 ? 
                            <View>
                                <ActivityIndicator size="small" color="#888888"/>
                                <Text>{i18n.t('page_market_list.refreshControlLoadingText')}</Text>
                            </View>
                        :   null
                    }
                </View>
    }


    handleSort = (category,sort_by,count) => {
        let dir 
        if(sort_by === this.props.sort_by.replace(/-/g,'')){
            dir = this.props.sort_by.includes('-') ? sort_by : '-' + sort_by
        } else {
            dir = '-' + sort_by
        }
        this.props.handleSort({category,sort_by:dir,count})
    }
    // 头部过滤条件
    ListHeaderComponent = (type) => {
        const { sort_by } = this.props
        if(type === 'mine'||type==='coin_market_pair'||type==='search'){
            return  <View style={styles.filter_con}>
                        <View style={styles.filter_item_1}>
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
                            <TouchableOpacity onPress={()=>this.handleSort('all','market_cap',LIMIT)} style={styles.filter_item_left_btn}>
                                <Text style={styles.text}>{i18n.t('page_market_list.market_cap')}</Text>
                                <TriangleIcon sort_dir={sort_by!=='-market_cap'?(sort_by==='market_cap'?'asc':''):'desc'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filter_item_2}>
                            <TouchableOpacity onPress={()=>this.handleSort('all','price',LIMIT)} style={styles.filter_item_right_btn}>
                                <Text style={styles.text}>
                                    {i18n.t('page_market_list.current_price')}
                                </Text>
                                <TriangleIcon sort_dir={sort_by!=='-price'?(sort_by==='price'?'asc':''):'desc'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.filter_item_3}>
                            <TouchableOpacity style={styles.filter_item_right_btn} onPress={()=>this.handleSort('all','change',LIMIT)}>
                                <Text style={styles.text}>{i18n.t('page_market_list.change_24h')}</Text>
                                <TriangleIcon sort_dir={sort_by!=='-change'?(sort_by==='change'?'asc':''):'desc'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
        }
    };
    getKey = (item,index) => {
        console.log('>>>>>>>>>>>>>>>>>>>',item,index)
        return `${item.id}_${index}`
    }

    render() {
        let {data, type} = this.props;
        if(!this.props.data) return <Spinner/>
        return (
            <View style={{flex:1}}>
                {
                    type === 'mine' && !data.length
                    ?   <View style={styles.no_mine}>
                            <Text style={styles.no_mine_text}>{i18n.t('page_market_list.no_mine_text')}</Text>
                        </View>
                    :   
                    <View style={{flex:1}}>
                        {this.ListHeaderComponent(type)}
                        <FlatList 
                            // keyExtractor={(item,index)=>`${item.id}_${index}`}
                            keyExtractor={(item,index)=>this.getKey(item,index)}
                            data={data}
                            renderItem={this._renderItem}
                            refreshControl={
                                <RefreshControl
                                    title={i18n.t('page_market_list.refreshControlLoadingText')}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this._onRefresh(type);
                                    }}
                                    tintColor="#555555"
                                    titleColor="#555555"
                                    colors={['#555555']}
                                    progressBackgroundColor="#555555"
                                />
                            }
                            refreshing={this.state.refreshing}
                            ListFooterComponent={this._createListFooter}
                            onEndReached={() => this._onLoading(type)}
                            onEndReachedThreshold={0.01}
                        />
                    </View>
                }
            </View>)
    }
}

export default MarketList;
