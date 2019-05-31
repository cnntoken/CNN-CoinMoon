import {Dimensions, StyleSheet} from 'react-native';
// const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    loading: {
        marginTop: 10
    },
    header_box: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#183B60',
    },
    coin_logo: {
       height: 29,
       width: 29,
       marginLeft: 14
    },
    coin_box: {
        flexDirection: 'column',
        marginLeft: 14
    },
    coin_symbol: {
        color: '#fff',
    },
    box_bottom: {
        flexDirection: 'row'
    },
    exchange_name: {
        marginRight: 10,
        fontSize: 12,
        color: '#fff'
    },
    coin_name: {
        fontSize: 12,
        color: '#fff'
    },
    trending_view: {
        paddingTop: 20,
        height: 345,
        backgroundColor: "linear-gradient(180deg,rgba(24,59,96,1) 0%,rgba(18,35,58,1) 100%)"
    },
    tabbar_box: {
        height: 50,
        backgroundColor: '#fff'
    },
    scroll_height:{
        flex: 1,
        height: viewportHeight - 220
    }
});

export default styles;
