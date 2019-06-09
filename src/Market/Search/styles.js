import {
    StyleSheet,
} from "react-native";
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#408EF5',
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 42*PX,
        paddingLeft: 15*PX,
        paddingRight: 15*PX,
    },
    left: {
        backgroundColor: '#fff',
        borderRadius: 17*PX,
        height: 32*PX,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 13*PX,
        paddingRight: 13*PX,
        flex: 1,
        marginRight: 17*PX,
    },
    input: {
        padding: 0,
        marginLeft: 14*PX,
    },
    cancel: {
        color: '#fff',
        lineHeight: 23*PX,
        fontSize: 16*PX,
    },
    no_result:{
        marginTop: 20*PX,
        alignItems: 'center'
    }
})

export default styles