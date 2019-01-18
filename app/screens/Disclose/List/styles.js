import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //////////////////// header 部分
    title: {
        color: '#fff',
        fontSize: 24
    },
    writeDiscloseBtn: {
        width: 27,
        height: 27,
    },

    // 无数据提示
    nodata: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginTop: 30
    },

    col_img: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: 8,
        marginTop: 8
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        // resizeMode: 'cover'
    },

    name: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    time: {
        color: '#666',
        fontSize: 12,
        marginLeft: -6,
        paddingLeft: 0,
        // alignSelf: 'baseline',
    },
    edit: {
        textAlign: 'right'
    },
    interact: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    number: {
        color: '#666',
        fontSize: 12,
        paddingLeft: 3,
        marginLeft: 0,
    },
    loadMore: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    noData: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },


    // 删除弹框
    modal_btn: {
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 15
    },
    modal_btn_del_text: {
        color: '#FF3B30'
    },
    modal_btn_calcel_text: {
        color: '#007AFF'
    },


});

export default styles;
