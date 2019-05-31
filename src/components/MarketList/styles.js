import {Dimensions, Platform, StyleSheet} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    no_mine: {
        color: '#979797',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filter_con: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 0.5,
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        alignContent: 'center',
        borderBottomColor: '#E6E6E6'

    },

    filter_item_1: {
        flex: 1,
        height: 40,
        lineHeight: 40,
        alignContent: 'center',
    },
    filter_item_2: {
        alignContent: 'center',
        display: 'flex',
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        justifyContent: 'flex-end',
    },

    filter_item_3: {
        alignContent: 'center',
        display: 'flex',
        flex: 1.7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },

    text: {
        height: 40,
        lineHeight: 40,
        marginRight: 6,
        color: '#666666',
        fontSize: 13,
        textAlign: 'left'
    },
    view_item: {
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        alignContent: 'center',
        position: 'relative',
        paddingLeft: 15,
        paddingRight: 15,
    },
    left_box: {
        display: 'flex',
        flexDirection: 'row',
        // flex: 1
    },
    number_text: {
        marginRight: 10
    },
    icon_image: {
        height: 20,
        // marginLeft: 8,
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
        // width: 196,
    },
    coin_name:{
        // display: 'flex',
        // flexDirection: 'column',
        flex: 1,
        // width: 80
    },
    symbol: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    current_price: {
        // width: 80,
        // display: 'flex',
        // flexDirection: 'column',
        // flex: 1,
        // color: '#888',
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
        flex: 1.7,
        // height: 32,
        // width: 80,
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
        width: 80,
        borderRadius: 8,


    },
    action_icon: {
        marginLeft: 10,
    },
    item_bottom_border: {
        width: '100%',
        bottom: 0,
        left: 20,
        position: 'absolute',
        backgroundColor:'#E6E6E6',
        height: 0.5,
        // borderBottomColor: '#E6E6E6',
        // borderBottomWidth: 0.5,
    }

});

export default styles;
