import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
    },
    cancel:{
        color:'#333333',
        fontSize: 16
    },
    label:{
        fontSize: 21,
        color:'#333333',
        marginBottom: 20,
        marginTop: 35
    },
    item: {
        marginTop: 12
    },
    input: {
        height: 50,
        borderWidth: .5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 16,
        borderColor: '#ccc',
        backgroundColor: '#F5F5F5'
    },
    inputFocus:{
        borderWidth: 1,
        borderColor: '#408EF5',
        backgroundColor: '#fff'
    },
    loginBth:{
        fontSize: 18,
        marginTop: 40,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#408EF5'
    },
    loginBthDisabled:{
        backgroundColor: '#B3D4FF'
    },
    registerBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#408EF5'
    }
});

export default styles;
