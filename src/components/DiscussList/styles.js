
import {StyleSheet,Dimensions} from 'react-native';
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()
const {width:viewportWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrap: {
        flex:1,
        paddingLeft:15*PX
    },
    footerView: {
        marginLeft:-15*PX,
        flexDirection: 'column',
        width: viewportWidth,
        height: 50*PX,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll_height: {
        flex:1
    },
    loadmore_btn:{
        marginTop: 15*PX,
        backgroundColor: '#fff',    
    },
    loadmore_text:{
        color: '#408EF5',
    }
});

export default styles;
