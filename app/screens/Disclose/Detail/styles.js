import {Dimensions, Platform, StyleSheet} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight, width} = Dimensions.get('window');

const img_width = (width - 90) / 3;

const styles = StyleSheet.create({

    name: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    userName: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold'
    },

    time: {
        color: '#666',
        fontSize: 12,
        marginLeft: 6,
        lineHeight: 17
    },

    title: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 20,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        height: 0.5
    },
    listitem_body: {
        borderBottomWidth: 0
    },
    grid_con: {
        marginBottom: 14
    },
    grid_images_btns: {
        marginTop: 14
    },
    col_username: {
        // color: '#333333',
        // fontSize: 14,
        width: 40
    },
    col_username_text: {
        color: '#333333',
        fontSize: 14
    },
    col_title_text: {
        color: '#333333',
        fontSize: 14,
        marginTop: 4,
        lineHeight: 14
    },
    col_time: {
        color: '#666666',
        fontSize: 12,
    },
    col_time_text: {
        color: '#666666',
        fontSize: 12,
    },

    col_img: {
        width: img_width,
        height: img_width,
        marginRight: 8,
        marginTop: 8
    },

    image: {
        width: img_width,
        height: img_width,
        borderRadius: 8,
        resizeMode: 'cover'
    },
//     预览图片
    carousel_container: {
        backgroundColor: '#000',
    },
    carousel_header: {
        backgroundColor: '#000',
        borderColor: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#000'
        // borderColor: '#000'
    },
    carousel_content: {},
    carousel_slide: {
        //todo 根据ios和Android区分
        // height: IS_IOS ? viewportHeight - 120 : viewportHeight - 120,
        height: viewportHeight,
        width: viewportWidth,
        // paddingHorizontal: 20
        // flex: 1,
    },
    carousel_image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
        borderRadius: IS_IOS ? 8 : 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    //////////////////////////////// 查看次数
    viewNum: {
        marginLeft: 16,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 12,
        color: '#666',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    viewNum_image: {
        width: 15
    },
    viewNum_text: {
        maxWidth: 100
        // lineHeight: 17,
        // fontSize: 12,
        // color: '#666',
        // marginBottom: 4
    },
    //////////////////////////////  点赞、评论按钮等
    btns: {
        height: 66,
        marginTop: 10,
        alignItems: 'center',
    },
    btns_btn: {
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btns_btn_col: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btns_text: {
        lineHeight: 17,
        color: '#333',
        fontSize: 12,
        textAlign: 'center'
    },
    //////////////////// 评论
    comments_header: {
        marginTop: 20,
        marginLeft: 16,
        marginBottom: 10,
        color: '#666666',
        fontSize: 14
    },
    comments_header_text: {
        color: '#666666',
        fontSize: 14,
        lineHeight: 20
    },

    comments_listitem_body: {
        borderBottomWidth: 0,
        marginRight: 15
    },
    comments_container: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 5
    },
    comments: {
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 8
    },

    comments_username: {
        color: '#666',
        fontSize: 14,
        lineHeight: 22
    },
    comments_content: {
        color: '#333',
        fontSize: 14,
        lineHeight: 22
    },
    comments_time: {
        color: '#999',
        fontSize: 12
    },
    comments_at: {
        borderLeftWidth: 4,
        borderLeftColor: '#D8D8D8',
        paddingLeft: 5
    },
    comments_at_content: {
        color: '#999',
        fontSize: 14,
        lineHeight: 22
    },
    comments_at_time: {
        color: '#999',
        fontSize: 12
    },
    comments_btn_comment: {
        marginLeft: 3,
        height: 37,
        lineHeight: 37,
        // marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // comments_btn_like: {
    //     display: 'flex',
    //     alignItems: 'center'
    // },
    comments_btn_text: {
        // paddingLeft: 8,
        // marginTop: -4,
        color: '#666666',
        fontSize: 12
    },
    // loadmore: {
    //     height: 70,
    //     width: viewportWidth,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    loadmore: {
        width: viewportWidth,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
        height: 70
    },
    loadmore_col: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
    },
    loadmore_btn: {},
    loadmore_btn_text: {
        color: '#408EF5',
        fontSize: 15,
        // width: 90
    },

    /////////////////////////////// footer input


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
    }


});

export default styles;
