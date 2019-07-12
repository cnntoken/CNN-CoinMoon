import {StyleSheet} from 'react-native';
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    header_box: {
        height: 44*PX,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    main_discuss:{
        backgroundColor: '#fff',
        paddingLeft: 15*PX,
    },
    replies_box: {
        backgroundColor: '#F5F5F5',
        flex:1
    },
    all_replies: {
        height: 50*PX,
        paddingLeft: 15*PX,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1*PX
    },
    list:{
        // backgroundColor: '#f5f5f5',
        // flex:1
    }
});

export default styles;
