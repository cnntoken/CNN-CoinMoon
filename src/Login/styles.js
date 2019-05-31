import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
    },
    cancel: {
        color: '#333333',
        fontSize: 16
    },
    label: {
        fontSize: 21,
        color: '#333333',
        marginBottom: 31,
        marginTop: 20
    },
    item: {
        marginTop: 12
    },
    item_phone: {
        paddingLeft: 60
    },
    loginBth: {
       
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        marginTop: 40,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#408EF5'
    },
    loginBthDisabled: {
        backgroundColor: '#B3D4FF'
    },
    loginText: {
        color: '#fff',
        fontSize: 18
    },
    registerBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#408EF5'
    },


    licenseBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    text1: {
        fontSize: 14,
    },

    agree: {
        marginRight: 2,
        width: 18,
        height: 18
    },
    highlight: {
        color: '#408EF5'
    },

    loginByOthers: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },

    loginByOthersBtns: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },

    line: {
        // borderBottomWidth: 1,
        // borderTopWidth: 0,
        borderWidth: 0.5,
        borderColor: '#E8E8E8',
        height: 0,
        width: 119
    },

    line_text: {
        color: '#999999',
        fontSize: 12,
        lineHeight: 14,
        marginLeft: 15,
        marginRight: 15
    },
    fb: {
        width: 51,
        height: 51,
        marginRight: 50
    },
    googlePlus: {
        width: 51,
        height: 51,
    },

    form: {
        position: 'relative',
        // borderWidth: 1
    },

    getCode: {
        color: '#666666',
        fontSize: 18,
        lineHeight: 25,
        paddingRight: 5
    },

    getCode_con: {
        position: 'absolute',
        top: 90,
        right: 15
    },

    picker_con: {
        position: 'absolute',
        top: 18,
        left: 20,
        // width: 80,
        // borderWidth: 1,
        height: 40,
        width: 60,
    },

    // picker_btn: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     height: 40,
    //     color: '#0091FF',
    //     // zIndex: 99,
    //     // backgroundColor: 'transparent',
    //     borderWidth: 1,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingLeft: 20,
    //     paddingRight: 0,
    //     marginLeft: 0,
    //     marginRight: 0,
    //     opacity: 0.1
    //
    // },

    picker_btn: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 40,
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
    },

    picker_text: {
        color: '#0091FF',
    }


});

export default styles;
