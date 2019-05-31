import {Dimensions, Platform, StyleSheet} from 'react-native';
import {PixelRatio} from 'react-native';
// const IS_IOS = Platform.OS === 'ios';
// const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrap: {
        // paddingTop: 20,
        // paddingBottom: 100,
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 49
    },
    content: {
        marginTop: 20,
    },
    source: {
        marginTop: 5,
        flexDirection: 'row',
        fontSize: 10,
        flexWrap: "wrap"
    },
    sourceUrl: {
        flexWrap: 'wrap',
        textDecorationLine: 'underline',
        color: '#666',
        fontSize: 12,
    },
    title: {
        fontWeight: 'bold',
        color: '#333333',
        fontSize: 24
    },
    userBox: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    uname: {
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333333',
        fontSize: 14
    },
    cavatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#eee'
    },
    ctime: {
        marginLeft: 10,
        fontSize: 13,
        color: '#666666'
    },
    webview: {
        marginTop: 18,
        height: 800,
        width: 500
        // backgroundColor:'#333'
    },
    viewBox: {
        marginTop: 30,
        // marginTop: 30,
        marginBottom: 10,
        display: 'flex',
        // alignItems:'center',
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    operateBox: {
        marginHorizontal: -20,
        borderTopWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderTopColor: '#E6E6E6',
        borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderBottomColor: '#E6E6E6',
        height: 63,
        paddingTop: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
