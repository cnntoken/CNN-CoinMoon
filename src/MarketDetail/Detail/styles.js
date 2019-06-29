import {Dimensions, StyleSheet} from 'react-native';
// const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    loading: {
        flex:1,
    },
    header_box: {
        height: 44*PX,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#183B60',
    },
    btn_press_wrap: {
        justifyContent:'center',
        paddingLeft: 16*PX,
        paddingRight: 10*PX,
        height: 44*PX,
    },
    btn_press:{
        height:23*PX,
        width: 12*PX
    },
    coin_logo: {
        height: 29*PX,
        width: 29*PX,
    },
    coin_box: {
        flexDirection: 'column',
        marginLeft: 14*PX
    },
    box_top: {
        flexDirection: 'row',
    },
    pair_name:{
        marginLeft: 4*PX,
        color: '#fff'
    },
    coin_symbol: {
        color: '#fff',
    },
    box_bottom: {
        flexDirection: 'row'
    },
    exchange_name: {
        marginRight: 10*PX,
        fontSize: 12*PX,
        color: '#fff'
    },
    coin_name: {
        fontSize: 12*PX,
        color: '#fff'
    },
    trending_view: {
        // paddingTop: 20,
        height: 345*PX,
        backgroundColor: "linear-gradient(180deg,rgba(24,59,96,1) 0%,rgba(18,35,58,1) 100%)"
    },
    tabbar_box: {
        height: 50*PX,
        backgroundColor: '#fff'
    },
    discuss_scroll_height: {
        flex: 1,
        marginBottom: 49*PX
    },
    market_scroll_height: {
        flex: 1
    }
});

export default styles;
