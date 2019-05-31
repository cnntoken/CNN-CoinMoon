import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {formateNum,numWithUnit} from '@utils/index'
import styles from './styles'

export default class Item extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let {info} = this.props
        let is_pair = info.is_pair
        let last_price = is_pair ? formateNum(info.CNNOWN_price_USD) : info.price_USD
        let high_price_24h = is_pair ? info.CNNOWN_high_24 : info.high_24
        let low_price_24h = is_pair ? info.CNNOWN_low_24 : info.low_24
        let change = is_pair ? info.CNNOWN_change : info.change

        let volume = is_pair ? info.CNNOWN_volume : info.volume
        let market = is_pair ? '--' : info.market_cap
        let rank = is_pair ? '--' : info.rank 
        return (
            <View style={styles.info_box}>
                <View style={styles.left_column}>
                    <View style={last_price}><Text style={styles.last_price_text} >{`$ ${formateNum(last_price)}`}</Text></View>
                    <View style={change}><Text style={styles.change_text}>{change>0?`+${formateNum(change)}`:formateNum(change)}</Text></View>
                    {/* <View style={{}}><Text style={styles.update_text}>更新于 12:00</Text></View> */}
                </View>
                <View style={styles.right_column}>
                    <View style={styles.item_box}>
                        <View style={styles.item}>
                            <Text style={styles.title}>最高(24h)</Text>
                            <Text style={styles.num}>{formateNum(high_price_24h)}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.title}>成交量(24h)</Text>
                            <Text style={styles.num}>{numWithUnit(volume)}</Text>
                        </View>
                        {
                            !is_pair ?
                                <View style={styles.item}>
                                    <Text style={styles.title}>市值</Text>
                                    <Text style={styles.num}>{numWithUnit(market)}</Text>
                                </View>
                            :   null
                        }
                    </View>
                    <View style={styles.item_box}>
                        <View style={styles.item}>
                            <Text style={styles.title}>最低(24h)</Text>
                            <Text style={styles.num}>{formateNum(low_price_24h)}</Text>
                        </View>
                        {/* <View style={styles.item}>
                            <Text style={styles.title}>换手率</Text>
                            <Text style={styles.num}>{formateNum(low_price_24h)}</Text>
                        </View> */}
                        {
                            !is_pair ?
                                <View style={styles.item}>
                                    <Text style={styles.title}>排名</Text>
                                    <Text style={styles.num}>{rank}</Text>
                                </View>
                            :   null
                        }
                    </View>
                </View>

            </View>
        )
    }
}
