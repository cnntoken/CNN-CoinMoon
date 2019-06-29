import {StyleSheet, Dimensions, Platform} from 'react-native';


const {width, height} = Dimensions.get('window');

const platform = Platform.OS;
const isIphoneX = platform === "ios" && (height === 812 || width === 812 || height === 896 || width === 896);


const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 200,
        // borderRadius: 6,
        backgroundColor: '#fafafa',
        // height: 200,
        marginTop: 11,
        marginBottom: 11
    },

    fitImage: {
        // borderRadius: 20,
        backgroundColor: '#fafafa',
        marginTop: 11,
        marginBottom: 11,
        // minHeight: 200
    },

    fitImageWithSize: {
        height: 100,
        width: 30,
    },

    text: {
        color: '#333333',
        fontSize: 14,
        marginTop: 11,
        lineHeight: 17,
    },
    modal: {
        width: width,
        position: 'absolute',
        // left: -20,
        top: 0,
        height: "100%",
        margin: 0,
        // paddingLeft: 0,
        // marginLeft: -20,
        // marginRight: -20,
    }

});

export default styles;
