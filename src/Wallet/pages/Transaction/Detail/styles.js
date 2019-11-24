
import {
    StyleSheet,
    // Dimensions,
    PixelRatio
} from 'react-native';

// const {height: viewportHeight,} = Dimensions.get('window');

const styles = StyleSheet.create({
    blue: {
        color: '#408EF5',
        marginRight: 20,
    },
    check: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: 16,
        marginTop: 14,
    },
    check_txt: {
        color: '#333',
        fontSize: 24,
        marginTop: 15,
    },
    pending: {
        height: 40,
        // width: 100,
        backgroundColor: '#408EF5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pending_t: {
        color: '#fff',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
    },
    copy: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    info: {
        color: '#333',
        fontSize: 16,
    },
    label: {
        color: '#999',
        fontSize: 14,
        marginBottom: 5,
    },
    list: {
        flexDirection: 'column',
        // height: 78,
        justifyContent: 'center',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 15,
        paddingBottom: 15,
    },
    underline:{
        backgroundColor: '#E6E6E6',
        height: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    }
});

export default styles;
