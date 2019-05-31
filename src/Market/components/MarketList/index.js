import React, {Component} from 'react';
import styles from './styles';

import {
    // Image, 
    Text, 
    View, 
    TouchableOpacity
} from "react-native";

import TriangleIcon from '../TriangleIcon/index'
import { LargeList } from "react-native-largelist-v3";
import RefreshHeader from '@components/LargeList/RefreshHeader';
import LoadingFooter from '@components/LargeList/LoadingFooter';
import MarketItem from '../MarketItem/index'
import {
    Spinner
} from '@components/NDLayout'
const LIMIT = 10
/**
 * showOrder 展示序列号
 * showAction 展示添加自选/移除自选icon  
 */
class MarketList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        // this.state = {
        //     refreshState: props.refreshState
        // }
    }
    _largeList;


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
        this.props.handleRefresh(category,()=>{
            this._largeList.endRefresh();
        })
    }
    //上拉加载更多
    _onLoading = (category) => {
        this.props.handleLoadMore(category,()=>{
            this._largeList.endLoading()
        })
    }
    handleItemPress = (item) => {
        this.props.goMarketDetail(item)
    }
    _renderItem = ({ section, row:index }) => {
        const {data,showAction,showOrder,user} = this.props
        const item = data[section].items[index]
        return <MarketItem 
                    user={user}
                    handleItemPress={this.handleItemPress}
                    addCollection={this.addCollection}
                    removeCollection={this.removeCollection}
                    showAction={showAction}
                    showOrder={showOrder}
                    item={item} 
                    index={index}
                    />
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
                            <Text style={styles.text}>交易对</Text>
                        </View>
                        <View style={styles.filter_item_2}>
                            <Text style={styles.text}>
                                当前价格
                            </Text>
                        </View>
                        <View style={styles.filter_item_3}>
                            <Text style={styles.text}>涨跌幅(24h)</Text>
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
                        <TouchableOpacity onPress={()=>this.handleSort('all','market_cap',LIMIT)} style={styles.filter_item_1}>
                            <Text style={styles.text}>市值</Text>
                            <TriangleIcon sort_dir={sort_by!=='-market_cap'?(sort_by==='market_cap'?'asc':''):'desc'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.handleSort('all','price',LIMIT)} style={styles.filter_item_2}>
                            <Text style={styles.text}>
                                当前价格
                            </Text>
                            <TriangleIcon sort_dir={sort_by!=='-price'?(sort_by==='price'?'asc':''):'desc'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filter_item_3} onPress={()=>this.handleSort('all','change',LIMIT)}>
                            <Text style={styles.text}>涨跌幅(24h)</Text>
                            <TriangleIcon sort_dir={sort_by!=='-change'?(sort_by==='change'?'asc':''):'desc'}/>
                        </TouchableOpacity>
                    </View>
        }
    };

    componentDidMount() {}
    render() {
        let {data, type} = this.props;
        if(!data || !data[0] || data[0].items=== null) {
            return <View style={styles.loading}><Spinner/></View>
        }
        return (
            <View style={{flex:1}}>
                {
                    type === 'mine' && !data[0].items.length
                    ?   <View style={styles.no_mine}>
                            <Text style={styles.no_mine_text}>没有添加自选币种</Text>
                        </View>
                    :   
                    <View style={{flex:1}}>
                        {this.ListHeaderComponent(type)}
                        <LargeList
                            ref={ref => (this._largeList = ref)}
                            data={data}
                            style={{flex:1}}
                            heightForIndexPath={() => 65}
                            renderIndexPath={this._renderItem}
                            refreshHeader={RefreshHeader}
                            onRefresh={()=>this._onRefresh(type)}
                            loadingFooter={LoadingFooter}
                            onLoading={()=>this._onLoading(type)}
                        />
                    </View>
                }
            </View>)
    }
}

export default MarketList;
