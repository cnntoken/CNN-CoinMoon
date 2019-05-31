
import {StyleSheet,Dimensions} from 'react-native';

const {width:viewportWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    footerView: {
        flexDirection: 'row',
        width: viewportWidth,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll_height: {
        flex:1
    },
});

export default styles;
