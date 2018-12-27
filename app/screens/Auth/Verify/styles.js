import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        flex:1
    },
    label:{
        fontSize: 21,
        color:'#333333',
        marginBottom: 20,
        marginTop: 35
    },
    btn:{
        fontSize: 18,
        marginTop: 38,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#408EF5'
    },
    codebtn: {
        marginTop: 20,
    },
    doneBtn:{
       width: 180,
       marginTop: 30,
       alignItems:'center',
       justifyContent:'center'
    },
    btnDisabled:{
        backgroundColor: '#B3D4FF'
    },
    doneBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -130
    },
    doneTextBox:{
        
        flexDirection: 'row',
        alignItems: 'center'
    },
    doneText:{
        color:'#333',
        fontSize: 21,
    },
    highlight:{
        color: '#408EF5'
    }
});

export default styles;
