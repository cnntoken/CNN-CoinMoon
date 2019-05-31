import {StyleSheet,Dimensions} from 'react-native';
const {width: viewportWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    view_item: {
        flexDirection: 'row',
        height: 65,
        flex:1,
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    left_box: {
        display: 'flex',
        flexDirection: 'row',
    },
    number_text: {
        marginRight: 10
    },
    icon_image: {
        height: 20,
        marginRight: 10,
        width: 20,
    },
    coin_icon: {
        height: 20,
        width: 20
    },
    middle_box: {
        flex: 4,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
    },
    pair_title: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexShrink: 0
    },
    pair_name: {
        marginLeft: 5,
        color: '#666666',
        fontSize: 13,
        width: viewportWidth/4,
    },
    coin_name:{
        flex: 1,
    },
    exchange_name:{
        flexDirection: 'row',
        width: viewportWidth/4,
    },
    exchange_name_text: {
        marginLeft: 5,
    },
    symbol: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    current_price: {
        flex: 1,
        width: viewportWidth/3,
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
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    action_icon: {
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    trending_up: {
        backgroundColor: '#00B7A0',
    },
    trending_down: {
        backgroundColor: '#FF7D40',
    },
    trending_text: {
        alignContent: 'center',
        color: '#fff',
        fontWeight: '500',
        height: 34,
        lineHeight: 34,
        textAlign: 'center',
        width: 90,
        borderRadius: 8,
    },
    item_bottom_border: {
        width: '100%',
        bottom: 0,
        left: 20,
        position: 'absolute',
        backgroundColor:'#E6E6E6',
        height: 0.5,
    }

});

export default styles;
