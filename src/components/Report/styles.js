import {StyleSheet, Dimensions, Platform} from 'react-native';


const {width, height} = Dimensions.get('window');

const platform = Platform.OS;
const isIphoneX = platform === "ios" && (height === 812 || width === 812 || height === 896 || width === 896);


const styles = StyleSheet.create({
    // 删除弹框
    modal: {
        // flex: 1,
        width: width,
        paddingLeft: 0,
        marginLeft: -20,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        backgroundColor: '#FFFFFF',
    },

    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        height: 55,
        // flexWrap: 'nowrap',
        marginBottom: 15,
        width: width
    },

    reason: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 9,
        paddingBottom: 9,
        minHeight: 40,
        borderRadius: 20,
        marginLeft: 15,
        backgroundColor: '#CEE1FB',
    },

    reason_selected: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 9,
        paddingBottom: 9,
        minHeight: 40,
        borderRadius: 20,
        marginLeft: 15,
        backgroundColor: '#408EF5',
    },

    footer_btn: {
        // width: width,
        backgroundColor: '#fff',
        borderTopColor: '#E6E6E6',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: isIphoneX ? 60 : 50
    },

    footer_input: {
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        height: 40,
        marginLeft: 16,
        marginRight: 16,
        paddingLeft: 12,
    }


});

export default styles;
