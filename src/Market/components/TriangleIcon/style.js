import {StyleSheet} from 'react-native';
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    box: {
        display: 'flex',
        flexDirection: 'column',
        height: 24*PX,
        justifyContent: 'space-around',
        width: 15*PX,
    },
    down:{
        borderColor: 'transparent',
        borderBottomWidth: 5*PX,
        borderStyle: 'solid',
        borderWidth: 5*PX,
        borderBottomColor: "rgba(228,228,228,1)",
        height: 0,
        width: 0,
        // borderTop
    },
    down_selected:{
        borderBottomColor: '#408EF5',
        borderBottomWidth: 5*PX,
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 5*PX,
        height: 0,
        width: 0,
    },
    up:{
        borderStyle: 'solid',
        borderWidth: 5*PX,
        borderColor: 'transparent',
        borderTopWidth: 5*PX,
        borderTopColor: "rgba(228,228,228,1)",
        height: 0,
        width: 0,
        // borderTop
    },
    up_selected:{
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 5*PX,
        borderTopWidth: 5*PX,
        height: 0,
        width: 0,
        borderTopColor: "#408EF5"
    }   
});

export default styles;
