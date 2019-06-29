import {StyleSheet} from 'react-native'
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    info_box: {
        flexDirection: 'row',
        height: 100*PX,
        paddingTop: 20*PX,
        paddingLeft: 15*PX,
        paddingRight: 15*PX,
        backgroundColor: "rgba(24,59,96,1)",
        justifyContent: 'space-between'
    },
    left_column:{
        width: 160*PX,
        justifyContent:'space-between',
        marginBottom: 11*PX
    },
    update_text: {
        color: 'rgba(255,255,255,0.4)',
    },
    right_column: {
        width: 175*PX,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    item_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 11*PX
    },
    item: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'right',
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11*PX,
    },
    num: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 9*PX
    },
    last_price_text: {
        color: '#00B7A0',
        fontSize: 24*PX,
        fontWeight: '500'
    },
    change_text: {
        color: '#00B7A0'
    }
})

export default styles