import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    // header:{
    //     backgroundColor: '#fff'
    // },
    content: {
        backgroundColor: '#fff',
        paddingLeft: 24,
        paddingRight: 24
    },
    label: {
        paddingLeft: 15,
        fontSize: 15,
        color: '#333333'
    },
    input: {
        marginTop: 10,
        width: '100%'
    },
    uploadbox: {
        marginTop: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgbox: {
        width: 80,
        height: 80
    },
    camera: {
        position: 'absolute',
        width: 24,
        height: 24,
        right: -12,
        bottom: 0
    },
    infobox: {
        marginTop: 29,
        width: '100%'
    },
    btn: {
        borderRadius: 16,
        width: '100%',
        height: 56,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 32,
        backgroundColor: '#408EF5'
    }
});

export default styles;
