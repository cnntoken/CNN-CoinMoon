import {StyleSheet} from 'react-native';
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    wrap: {
        // height: 56,
        paddingLeft: 14*PX,
        backgroundColor: '#408EF5'
    },
    item: {
        marginRight: 13*PX,
        marginLeft: 6*PX,
        height: 42*PX,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16*PX,
        color: '#fff',
        lineHeight: 41*PX,
    },
    active: {
        fontWeight: 'bold'
    },
    search_btn: {
        backgroundColor: '#408EF5',
        borderRadius: 0,
        paddingRight: 15*PX,
        justifyContent: 'center',
    },
});

export default styles;
