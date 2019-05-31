import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    box: {
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        height: 24,
        justifyContent: 'space-around',
        width: 15,
    },
    down:{
        borderColor: 'transparent',
        borderBottomWidth: 5,
        borderStyle: 'solid',
        borderWidth: 5,
        borderBottomColor: "rgba(228,228,228,1)",
        height: 0,
        width: 0,
        // borderTop
    },
    down_selected:{
        borderBottomColor: 'red',
        borderBottomWidth: 5,
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 5,
        height: 0,
        width: 0,
    },
    up:{
        borderStyle: 'solid',
        borderWidth: 5,
        borderColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: "rgba(228,228,228,1)",
        height: 0,
        width: 0,
        // borderTop
    },
    up_selected:{
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 5,
        borderTopWidth: 5,
        height: 0,
        width: 0,
        borderTopColor: "red"
    }   
  

});

export default styles;
