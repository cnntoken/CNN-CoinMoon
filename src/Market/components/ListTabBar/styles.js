import {StyleSheet} from 'react-native';
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    top:{
        width: '100%',
        height: 44,
        flexDirection: 'row',
        backgroundColor: '#408EF5',
        justifyContent: 'space-between'
    },
    wrap: {
        paddingLeft: 14,
        flexDirection: 'row'

    },
    item: {
        marginRight: 10,
        marginLeft: 10,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#fff'
    },
    active: {
        fontWeight: 'bold'
    },
    search_btn: {
        backgroundColor: '#408EF5',
        borderRadius:0,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
    },
});

export default styles;
