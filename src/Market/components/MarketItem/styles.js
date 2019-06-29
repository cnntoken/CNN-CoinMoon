import {StyleSheet,Dimensions} from 'react-native';
const {width: viewportWidth} = Dimensions.get('window');
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    view_item: {
        flexDirection: 'row',
        height: 65,
        // flex:1,
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 15*PX,
        paddingRight: 10*PX,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e6e6e6'
    },
    left_box: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10*PX,
    },
    number_text: {
        marginRight: 10*PX,
        // flex:1
    },
    icon_image: {
        // flex:1,
        height: 20,
        // marginLeft: 10,
        // marginRight: 10,
        width: 20*PX,
    },
    coin_icon: {
        height: 20,
        width: 20
    },
    middle_box: {
        flex: 4,
        // maxWidth: 195,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10*PX,
        // marginRight: 15,
    },
    coin_name:{
        // flex: 1,
        width: 80*PX
    },
    current_price: {
        // flex: 1,
        maxWidth: 115*PX
    },
    pair_title: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: viewportWidth/4,
        width: 85*PX

    },
    pair_name: {
        marginLeft: 5*PX,
        color: '#666666',
        fontSize: 13*PX,
    },
    exchange_name:{
        flexDirection: 'row',
        width: 85*PX
    },
    exchange_name_text: {
        // width: viewportWidth/5,
        // width: 89.5,
        // marginLeft: 5,
    },
    symbol: {
        color: '#333',
        fontSize: 16*PX,
        fontWeight: '500',
    },
    price_text: {
        textAlign: 'right',
    },
    price_trans:{
        textAlign: 'right'
    },
    price_text_down: {
        color: '#FF7D40'
    },
    price_text_up: {
        color: '#00B7A0'
    },
    right_box: {
        // flex: 2,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 10*PX,
    },
    action_icon: {
        // flex:1,
        // backgroundColor: 'red',
        alignSelf: 'stretch',
        marginRight: -10*PX,
        paddingRight: 10*PX,
        paddingLeft: 10*PX,
        alignItems: 'center',
        justifyContent: 'center'
    },
    trending_up: {
        backgroundColor: '#00B7A0',
    },
    trending_down: {
        backgroundColor: '#FF7D40',
    },
    change_box: {
        alignContent: 'center',
        height: 32,
        width: 67*PX,
        overflow: 'hidden',
        borderRadius: 4*PX,
    },
    change_text: {
        borderRadius: 4*PX,
        fontSize: 15*PX,
        color: '#fff',
        fontWeight: '500',
        height: 32,
        lineHeight: 32,
        textAlign: 'center',
    },
    item_bottom_border: {
        width: '100%',
        bottom: 0,
        left: 20*PX,
        position: 'absolute',
        backgroundColor:'#E6E6E6',
        height: 1,
    },
    btn_icon:{
        height: 26,
        width: 26
    }

});

export default styles;
