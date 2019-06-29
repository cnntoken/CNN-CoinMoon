import React, {PureComponent} from 'react';
import styles from './styles';

import {
    Image,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import FastImage from 'react-native-fast-image';

import { goRNPage } from '@utils/CNNBridge';
import {splitNum} from '@utils/index'

/**
 * showOrder 展示序列号
 * showAction 展示添加自选/移除自选icon
 */
class MarketItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.item.selected,
            operating: false
        }
    }

    // 添加自选
    addCollection = (item,index,type) => {
        let {user} = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
                params:{
                    event:{
                        from: 'marketDetail',
                        trigger: '添加自选',
                    }
                }
            })
            return
        }
        let { selected } = this.state
        this.setState({
            operating: true
        })
        this.props.addCollection({id:item.id,index,type,info:item},()=>{
            this.setState({
                selected: !selected,
                operating: false
            })
        })
        // this.setState({
        //     selected: !selected
        // },()=>{
        //     this.props.addCollection(item.id,index,type,item)
        // })
    };

    // 取消自选
    removeCollection= (item,index,type) => {
        let {user} = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
                params:{
                    event:{
                        from: 'marketDetail',
                        trigger: '取消自选',
                    }
                }
            })
            return
        }
        let { selected } = this.state
        this.setState({
            operating: true
        })
        this.props.removeCollection({id:item.id,index,type,info:item},()=>{
            this.setState({
                selected: !selected,
                operating: false
            })
        })

        // this.setState({
        //     selected: !selected
        // },()=>{
        //     this.props.removeCollection(item.id,index,type,item)
        // })
    };

    onError = () => {
        console.log('image load fail');
    }

    handleItemPress = () => {
        let item = this.props.item
        this.props.handleItemPress(item)
    }
    UNSAFE_componentWillReceiveProps = (nextProps) =>{
        if(nextProps.item.selected !== this.state.selected){
            this.setState({
                selected: nextProps.item.selected
            })
        }
    }
    render() {
        const {item,index,type} = this.props
        const { selected } = this.state
        const is_pair = item.is_pair
        const price_USD = !is_pair ? item.price_USD : item.CNNOWN_price_USD
        const price_KRW = !is_pair ? item.price_KRW : item.CNNOWN_price_KRW||price_USD * item.USD2KRW
        const change = !is_pair ? item.change : item.CNNOWN_change
        const price_status = Number(price_USD) > 0 ? 'go_up' : 'go_down'
        const change_status = Number(change) > 0 ? 'go_up' : 'go_down'
        return  (
            <TouchableOpacity key={item.id} 
                // style={StyleSheet.flatten([this.props.style,styles.view_item])}
                style={styles.view_item}
                 onPress={this.handleItemPress}>
                {/* <View style={styles.left_box}> */}
                    {
                        this.props.showOrder
                        ?   <Text style={styles.number_text}>{(index+1)<10?`${'0'+(index+1)}`:index+1}</Text>
                        :   null
                    }
                    {/* <View style={[styles.icon_image]}> */}
                        <FastImage
                            style={[styles.coin_icon]}
                            source={{uri:item.image}}/>
                    {/* </View> */}
                {/* </View> */}
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
                            {
                                item.is_pair
                                ?   <Text style={styles.exchange_name_text} numberOfLines={1}>{item.exchange}</Text>
                                :   <Text numberOfLines={1}>{item.name}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.current_price}>
                        <View>
                            <Text style={[styles.price_text,price_status==='go_up'?styles.price_text_up:styles.price_text_down]}>{`$${splitNum(price_USD)}`}</Text>
                            <Text style={styles.price_trans}>≈₩{`${splitNum(price_KRW)}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.right_box}>
                    <View style={styles.change_box}>
                        <Text numberOfLines={1} style={[styles.change_text,change_status==='go_up'?styles.trending_up:styles.trending_down]}>
                            {Number(change)>0?`+${Number(change)>=100?Number(change).toFixed(0):Number(change).toFixed(2)}%`:`${Number(change)<=-100?Number(change).toFixed(0):Number(change).toFixed(2)}%`}
                        </Text>
                    </View>
                    {
                    this.props.showAction ? 
                        <TouchableOpacity  
                            disabled={this.state.operating}
                            activeOpacity={0.2} style={styles.action_icon} onPress={()=>{
                            if(selected){
                                this.removeCollection(item,index,type)
                            }else{
                                this.addCollection(item,index,type) 
                            }
                        }}>
                            {
                                selected
                                ? <Image style={styles.btn_icon} source={require('@images/wallet_icon_done.png')}/>
                                :  <Image style={styles.btn_icon} source={require('@images/wallet_icon_add.png')} />
                                
                            }
                        </TouchableOpacity>
                    :   null
                    }
                </View>
                {/* <View style={styles.item_bottom_border}/> */}
            </TouchableOpacity>
        )
    }
}

export default MarketItem;
