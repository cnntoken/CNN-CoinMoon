import React, {Component} from 'react';
import styles from './styles';
import i18n from '@i18n'
import Modal from "react-native-modal";

import {
    Image,
    Text,
    View,
    FlatList,
    RefreshControl,
    TouchableOpacity
} from "react-native";

import {formateNum} from "@utils";
import TriangleIcon from '../TriangleIcon/index'


/**
 * showOrder 展示序列号
 * showAction 展示添加自选/移除自选icon
 */
class MarketList extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     refreshState: props.refreshState
        // }
    }


    // 过滤条件
    filterChange = (latest_price, price_change_24) => {
        if (this.props.filterChange) {
            this.props.filterChange(latest_price, price_change_24);
        }
    };

    // 添加自选
    addItem = (item) => {
        if (this.props.addItem) {
            this.props.filterChange(item);
        }
    };

    // 取消自选
    removeItem = (item) => {
        if (this.props.removeItem) {
            this.props.filterChange(item);
        }
    };

    onError = () => {
        console.log('image load fail');
    }

    _onRefresh = (category) => {
        this.props.handleRefresh(category)
    }
    handleRefresh = (category,HeaderRefreshing,callback) => {
        // this.setState({
                // refreshState: HeaderRefreshing
        // },()=>{
            this.props.handleRefresh(category,callback)
        // });
        // this.getList({
        //     isRefresh: true,
        //     category,
        //     params: {
        //         category,
        //         read_tag: null,
        //         count: 10
        //     },
        // }, callback)
    };
    handleItemPress = () => {
        this.props.goMarketDetail()
    }
    renderItem = (type, logoList,{index, item}) => {
        const status = item.quote&&item.quote.USD&&(item.quote.USD.percent_change_24h) >= 0 ? 'go_up' : 'go_down'
        return  (
            <TouchableOpacity style={styles.view_item} key={index} onPress={this.handleItemPress}>
                <View style={styles.left_box}>
                    {
                        this.props.showOrder
                        ?   <View>
                                <Text style={styles.number_text}>{(index+1)<10?`${'0'+(index+1)}`:index+1}</Text>
                            </View>
                        :   null
                    }
                    <View style={[styles.icon_image]}>
                        <Image
                            onError={this.onError}
                            source={{uri: logoList[item.id].logo}}
                            style={[styles.coin_icon]}
                            resizeMode='cover'
                        />
                    </View>
                </View>
                <View style={styles.middle_box}>
                    <View styles={styles.coin_name}>
                        <Text style={styles.symbol}>{item.symbol}</Text>
                        <Text>{item.name}</Text>
                    </View>
                    <View style={styles.current_price}>
                        <View>
                            <Text style={[styles.price_text,status==='go_up'?styles.price_text_up:styles.price_text_down]}>{`$${formateNum(item.quote.USD.price)}`}</Text>
                            <Text style={styles.price_trans}>=qweqe</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.right_box}>
                    <Text style={[styles.trending_text,status==='go_up'?styles.trending_up:styles.trending_down]}>
                        {item.quote&&item.quote.USD&&(formateNum(item.quote.USD.percent_change_24h))+'%'||'--'}
                    </Text>
                </View>
                {
                    this.props.showAction
                    ?   <View>
                            <Text style={styles.number_text}>{(index+1)<10?`${'0'+(index+1)}`:index+1}</Text>
                        </View>
                    :   null
                }
                <View style={styles.item_bottom_border}/>
            </TouchableOpacity>
        )
    };

    handleSort = (category,sort_by,sort_dir,limit) => {
        sort_dir = sort_dir === 'desc' ? 'asc' : 'desc'
        this.props.handleSort({category,sort_by,sort_dir,limit})
    }

    // 头部过滤条件
    ListHeaderComponent = (type) => {
        const { sort_by, sort_dir } = this.props
        if(type === 'all'){
            return  <View style={styles.filter_con}>
                        <View style={styles.filter_item_1}>
                            <Text style={styles.text}>市值对</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.handleSort('all','price',sort_dir,100)} style={styles.filter_item_2}>
                            <Text style={styles.text}>
                                当前价格
                            </Text>
                            <TriangleIcon sort_dir={sort_by==='price'?sort_dir:''}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filter_item_3} onPress={(dir)=>this.handleSort('all','percent_change_24h',dir,100)}>
                            <Text style={styles.text}>涨幅跌(24h)</Text>
                            <TriangleIcon sort_dir={sort_by==='percent_change_24h'?sort_dir:''} />
                        </TouchableOpacity>
                    </View>
        } else if(type === 'mine'){
            return  <View style={styles.filter_con}>
                        <View style={styles.filter_item_1}>
                            <Text style={styles.text}>市值对</Text>
                        </View>
                        <View style={styles.filter_item_2}>
                            <Text style={[styles.text,{textAlign:'right'}]}>最新价</Text>
                        </View>
                        <View style={styles.filter_item_3}>
                            <Text style={styles.text}>涨幅跌(24h)</Text>
                        </View>
                    </View>
        }
    };

    componentDidMount() {}
    render() {
        let {data, type,logoList} = this.props;
        if(type==='mine'&&!data.length) return(
            <View>
                <Text style={styles.no_mine}>没有添加自选币种</Text>
            </View>
        )
        // 展示详情
        return (<View>
            {
                type === 'mine' && !data.length
                ?   <View style={styles.no_mine}>
                        <Text>没有添加自选币种</Text>
                    </View>
                :    <FlatList
                        renderItem={(...args) => this.renderItem(type,logoList, ...args)}
                        data={data}
                        keyExtractor={(item,index)=>`${index}`}
                        ListHeaderComponent={this.ListHeaderComponent.bind(this, type)}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.props.refreshState}
                              colors={['#ff0000', '#00ff00', '#0000ff']}
                              progressBackgroundColor={"#ffffff"}
                              title={"loading"}
                              onRefresh={() => {
                                this._onRefresh(type);
                              }}
                            />
                          }
                    />
            }

        </View>)
    }
}

export default MarketList;
