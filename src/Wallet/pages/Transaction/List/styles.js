
import {StyleSheet,Dimensions,PixelRatio} from 'react-native';

const {height: viewportHeight,} = Dimensions.get('window');

const styles = StyleSheet.create({
    all: {
        color: '#333',
        fontSize: 14,
        marginLeft: 18,
        marginTop: 15,
        marginBottom: 10,
    },
    bg_w: {
        backgroundColor: '#fff',
    },
    br_16: {
        borderRadius: 16,
    },
    btn: {
        borderRadius: 8,
        color: '#fff',
        flexDirection: 'row',
        height: 56,
        justifyContent: 'center',
        width: 176,
        // marginTop: 10,
    },
    btn_g: {
        backgroundColor: '#29CCA7',
        marginRight: 8,
    },
    btn_y: {
        backgroundColor: '#FFAD33',
    },
    color_w: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    line: {
        backgroundColor: '#f5f5f5',
        height: 10,
    },
    list_item:{
        alignItems:'center',
        flexDirection:'row',
        height: 60,
        justifyContent:'space-between',
        
    },
    list_item_last:{
        backgroundColor: '#E6E6E6',
        height: 1 / PixelRatio.getPixelSizeForLayoutSize(1)
    },
    list_item_left: {
        alignItems:'center',
        flexDirection:'row',
    },
    list_item_left_t1: {
        color: '#333',
        fontSize: 14,
        width: 130,
        marginBottom: 2,
        marginLeft: 10,
    },
    list_item_left_t2: {
        color: '#999',
        fontSize: 10,
        marginLeft: 10,
    },
    list_item_right: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    list_item_right_g: {
        color: '#00B377',
        fontSize: 14,
    },
    list_item_right_r: {
        color: '#E02020',
        fontSize: 14,
    },
    list_item_pending: {
        backgroundColor: '#408EF5',
        borderRadius: 8,
        marginTop: 2,
        // width: 54,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_item_pending_t: {
        color: '#fff',
        fontSize: 10,
    },
    scroll_height: {
        height: viewportHeight - 120 - 140,
        paddingLeft: 18,
        paddingRight: 18,
    },
    no_data: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_w: {
        color: '#fff',
    },
    modal: {
        justifyContent:'flex-end',
        margin:0,
        padding: 0,
    },
    modal_btn: {
        backgroundColor: '#408EF5',
        borderRadius: 16,
    },
    modal_child: {
        backgroundColor:'#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection:'column',
        margin:0,
        overflow: 'hidden',
    },
    modal_footer: {
        marginBottom: 24,
        marginTop: 35,
        paddingLeft: 18,
        paddingRight: 18,
        height: 56,
        overflow: 'hidden',
        // flex: 1,
    },
    modal_header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 27,
        marginTop: 17,
        paddingLeft: 18,
        paddingRight: 18,
    },
    modal_info: {
        color: '#333',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    modal_label: {
        color: '#999',
        fontSize: 14,
        marginBottom: 5,
    },
    modal_list: {
        flexDirection: 'column',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF3FF',
        marginLeft: 18,
        marginRight: 18,
        marginTop: 35,
        borderRadius: 16,
    },
});

export default styles;
