import {
    StyleSheet,
    Dimensions
} from 'react-native'
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const {width: viewportWidth,height:viewportHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    footer_drawer: {
        position: 'absolute',
        bottom:0,
        left:0,
        width: viewportWidth,
        height: viewportHeight,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    btn_box:{
        flex:1,
        height: 118*PX,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor:'rgba(0, 0, 0, 0.3)'
    },
    delete_btn: {
        flex:1,
        width: viewportWidth,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5*PX,
        borderBottomColor: '#E6E6E6'
    },
    delete_text: {
        color: '#FF6821',
        fontSize: 15*PX,
    },
    cancle_btn: {
        flex:1,
        // height: 59,
        width: viewportWidth,
        backgroundColor: '#fff',
    }
})
export default styles