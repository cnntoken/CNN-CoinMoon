import {Dimensions, Platform, StyleSheet} from 'react-native';
import { PixelRatio } from 'react-native';
// const IS_IOS = Platform.OS === 'ios';
// const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrap:{
        // paddingTop: 20,
        // paddingBottom: 100,
        flex: 1,
        paddingHorizontal: 20
    },
    content:{
        marginTop: 20,
    },
    source: {
        marginTop: 5,
        flexDirection: 'row',
        fontSize: 10,
        flexWrap: "wrap"
    },
    sourceUrl:{
        flexWrap: 'wrap',
        textDecorationLine: 'underline'
    },
    title: {
        fontWeight: 'bold',
        color: '#333333',
        fontSize: 24
    },
    userBox:{
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
    cavatar:{
        width: 30,
        height: 30,
        borderRadius: 15
    },
    ctime: {
        marginLeft: 10,
        fontSize: 13,
        color: '#666666'
    },
    webview: {
        marginTop: 18,
        // height: 200,
    },
    viewBox:{
        marginTop: 30,
        display: 'flex',
        // alignItems:'center',
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    operateBox:{
        marginHorizontal: -20,
        borderTopWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderTopColor: '#E6E6E6',
        borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderBottomColor: '#E6E6E6',
        height: 66,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
