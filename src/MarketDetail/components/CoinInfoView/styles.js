import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    info_box: {
        flexDirection: 'row',
        height: 100,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "rgba(24,59,96,1)",
        justifyContent: 'space-between'
    },
    left_column:{
        flex:4,
        // justifyContent:'space-between'
    },
    update_text: {
        color: 'rgba(255,255,255,0.4)',
    },
    right_column: {
        flex:6,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    item_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 11
    },
    item: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'right',
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
    },
    num: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 14
    },
    last_price_text: {
        color: '#00B7A0',
        fontSize: 24,
        fontWeight: '500'
    },
    change_text: {
        color: '#00B7A0'
    }
})

export default styles