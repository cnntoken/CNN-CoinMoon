import {StyleSheet,Dimensions} from 'react-native';
const {width: viewportWidth} = Dimensions.get('window');
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    view_item: {
        flexDirection: 'row',
        height: 65*PX,
        flex:1,
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 15*PX,
        paddingRight: 10*PX,
    },
    left_box: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15*PX,
    },
    number_text: {
        marginRight: 10*PX,
        // flex:1
    },
    icon_image: {
        // flex:1,
        height: 20*PX,
        // marginLeft: 10*PX,
        // marginRight: 10*PX,
        width: 20*PX,
    },
    coin_icon: {
        height: 20*PX,
        width: 20*PX
    },
    middle_box: {
        flex: 4,
        // width: 195*PX,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10*PX,
        // marginRight: 15*PX,
    },
    coin_name:{
        // flex: 1,
        width: 80*PX
    },
    current_price: {
        // flex: 1,
        width: 115*PX
    },
    pair_title: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // width: viewportWidth/4*PX,
        width: 89.5*PX

    },
    pair_name: {
        marginLeft: 5*PX,
        color: '#666666',
        fontSize: 13*PX,
    },
    exchange_name:{
        flexDirection: 'row',
        width: 89.5*PX
    },
    exchange_name_text: {
        // width: viewportWidth/5*PX,
        // width: 89.5*PX,
        // marginLeft: 5*PX,
    },
    symbol: {
        color: '#333',
        fontSize: 16*PX,
        fontWeight: '500',
    },
    price_text: {
        color: 'red',
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 18*PX,
    },
    action_icon: {
        // flex:1,
        marginLeft: 5*PX,
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
        height: 32*PX,
        width: 80*PX,
        borderRadius: 8*PX,
    },
    change_text: {
        fontSize: 15*PX,
        color: '#fff',
        fontWeight: '500',
        height: 32*PX,
        lineHeight: 32*PX,
        textAlign: 'center',
    },
    item_bottom_border: {
        width: '100%',
        bottom: 0,
        left: 20*PX,
        position: 'absolute',
        backgroundColor:'#E6E6E6',
        height: 0.5*PX,
    },
    btn_icon:{
        height: 25*PX,
        width: 25*PX
    }

});

export default styles;
