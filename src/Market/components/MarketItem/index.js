import React, {Component} from 'react';
import styles from './styles';

import {
    Image, 
    Text, 
    View, 
    TouchableOpacity
} from "react-native";
import FastImage from 'react-native-fast-image';

import {formateNum} from "@utils/index";
import { goRNPage } from '@utils/CNNBridge';

/**
 * showOrder 展示序列号
 * showAction 展示添加自选/移除自选icon  
 */
class MarketList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.item.selected
        }
    }
    _largeList;


    // 添加自选
    addCollection = (item) => {
        let {user} = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            })
            return
        }
        let { selected } = this.state
        this.setState({
            selected: !selected
        },()=>{
            this.props.addCollection(item.id)
        })
    };

    // 取消自选
    removeCollection= (item) => {
        let {user} = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            })
            return
        }
        let { selected } = this.state
        this.setState({
            selected: !selected
        },()=>{
            this.props.removeCollection(item.id)
        })
    };
    
    onError = () => {
        console.log('image load fail');
    }

    handleItemPress = (item) => {
        this.props.handleItemPress(item)
    }

    render() {
        const {item,index} = this.props
        const { selected } = this.state
        const is_pair = item.is_pair
        const price_USD = !is_pair ? item.price_USD : item.CNNOWN_price_USD
        const price_KRW = !is_pair ? item.price_KRW : item.CNNOWN_price_KRW||price_USD * item.USD2KRW
        const change = !is_pair ? item.change : item.CNNOWN_change
        const price_status = Number(price_USD) > 0 ? 'go_up' : 'go_down'
        const change_status = Number(change) > 0 ? 'go_up' : 'go_down'
        return  (
            <TouchableOpacity style={styles.view_item} onPress={()=>this.handleItemPress(item)}>
                <View style={styles.left_box}>
                    {
                        this.props.showOrder
                        ?   <View>
                                <Text style={styles.number_text}>{(index+1)<10?`${'0'+(index+1)}`:index+1}</Text>
                            </View>
                        :   null
                    }
                    <View style={[styles.icon_image]}>
                        <FastImage 
                            style={[styles.coin_icon]}
                            source={{uri:item.image}}/>
                    </View>
                </View>
                <View style={styles.middle_box}>
                    <View styles={styles.coin_name}>
                        {
                            item.is_pair ?
                                <View style={styles.pair_title}>
                                    <Text numberOfLines={1} style={styles.symbol}>{item.symbol}</Text>
                                    <Text numberOfLines={1} style={styles.pair_name}>{item.pair_name}</Text>
                                </View>
                            :   <Text numberOfLines={1} style={styles.symbol}>{item.symbol}</Text>
                        }
                        <View style={styles.exchange_name}>
                            <Text numberOfLines={1}>{item.name}</Text>
                            {
                                item.is_pair
                                ?   <Text style={styles.exchange_name_text} numberOfLines={1}>{item.exchange}</Text>
                                :   null
                            }
                        </View>
                    </View>
                    <View style={styles.current_price}>
                        <View>
                            <Text numberOfLines={1} style={[styles.price_text,price_status==='go_up'?styles.price_text_up:styles.price_text_down]}>{`$${formateNum(price_USD)}`}</Text>
                            <Text numberOfLines={1} style={styles.price_trans}>≈₩{formateNum(price_KRW)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.right_box}>
                    <Text style={[styles.trending_text,change_status==='go_up'?styles.trending_up:styles.trending_down]}>
                        {(formateNum(change)+'%')}
                    </Text>
                    {
                    this.props.showAction
                    ?   <View style={styles.action_icon}>
                            {
                                !selected   
                                ?   <TouchableOpacity onPress={()=>this.addCollection(item)}>
                                        <Image style={{height:22,width:22}} source={require('@images/wallet_icon_add.png')} />
                                    </TouchableOpacity>
                                :   <TouchableOpacity onPress={()=>this.removeCollection(item)}>
                                        <Image style={{height:22,width:22}} source={require('@images/wallet_icon_done.png')}/>
                                    </TouchableOpacity>
                            }
                        </View>
                    :   null
                    }
                </View>
                <View style={styles.item_bottom_border}/>
            </TouchableOpacity>
        )
    }
}

export default MarketList;
