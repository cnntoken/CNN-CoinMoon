import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        // flexDirection:'column',
        // justifyContent: 'space-between'
        paddingLeft: 24,
        paddingRight: 24
    },
    main:{
        flex: 1
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
    btn:{
        fontSize: 18,
        marginTop: 18,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#408EF5'
    },
    btnDisabled:{
        backgroundColor: '#B3D4FF'
    },
    licenseBox:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    textBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
        color: '#333',
        marginBottom: 25
    },
    text1:{
        fontSize: 14,
    },
    text2:{
        fontSize: 16,
    },
    highlight:{
        color: '#408EF5'
    },
    agree:{
        marginRight:2,
        width:18,
        height: 18
    }
});

export default styles;
