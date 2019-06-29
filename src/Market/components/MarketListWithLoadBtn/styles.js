import {StyleSheet,Dimensions} from 'react-native';
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()
const {width:viewportWidth} = Dimensions.get('window');


const styles = StyleSheet.create({
    loading: {
        marginTop: 20*PX
    },
    no_mine: {
        marginTop: 250*PX,
        flexDirection: 'column',
        alignItems: 'center'
    },
    no_mine_text: {
        color: '#979797',
        fontSize: 20*PX,
    },
    filter_con: {
        flexDirection: 'row',
        borderBottomWidth: 0.5*PX,
        height: 40*PX,
        paddingLeft: 15*PX,
        paddingRight: 10*PX,
        alignItems: 'center',
        alignContent: 'center',
        borderBottomColor: '#E6E6E6',
        backgroundColor: '#fff'
    },

    filter_item_1: {
        // flex: 1,
        height: 40*PX,
        lineHeight: 40*PX,
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    pair_icon:{
        height: 16*PX,
        width: 16*PX,
        marginRight: 13*PX
    },
    filter_item_left_btn:{
        // flex: 1,
        height: 40*PX,
        lineHeight: 40*PX,
        width: 100*PX,
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',  
    },
    filter_item_right_btn:{
        // flex: 1,
        height: 40*PX,
        lineHeight: 40*PX,
        // width: 100*PX,
        // alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: -5*PX
        // justifyContent: 'flex-end',  
    },
    filter_item_2: {
        // width: 4*viewportWidth/7,
        flex: 4,
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingRight: 10*PX,
        justifyContent: 'flex-end',
    },

    filter_item_3: {
        // flex: 2,
        // marginLeft: 10*PX,
        marginLeft: 10*PX,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    action_placeholder: {
        height:22*PX,
        width:22*PX
    },
    text: {
        height: 40*PX,
        lineHeight: 40*PX,
        marginRight: 6*PX,
        color: '#666666',
        fontSize: 13*PX,
        textAlign: 'left'
    },
    footerView: {
        flexDirection: 'row',
        width: viewportWidth,
        height: 50*PX,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 10*PX,
        height: 60*PX,
    },
    footerText: {
        fontSize: 14*PX,
        color: '#555555'
    },
    loadmore_btn:{
        height: '100%',
        width:'100%',
        backgroundColor: '#fff',    
    },
    loadmore_text:{
        color: '#408EF5',
    }
});

export default styles;
