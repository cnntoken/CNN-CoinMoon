import {Dimensions, Platform, StyleSheet} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#E6E6E6'
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
        marginTop: 4
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
    },
//     预览图片
    carousel_container: {
        backgroundColor: '#000',
    },
    carousel_header: {
        backgroundColor: '#000',
        // borderColor: '#000'
    },
    carousel_content: {},
    carousel_slide: {
        //todo 根据ios和Android区分
        height: IS_IOS ? viewportHeight - 120 : viewportHeight - 120,
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
        fontSize: 12
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
    footer: {
        height: 40,
        backgroundColor: '#fff',

    },
    footer_grid: {
        display: 'flex',
        alignItems: 'center',
    },
    footer_form: {
        // width:viewportWidth - 80
        marginLeft: 16,
        // height: 33
    },
    footer_label: {
        color: '#666666',
        fontSize: 16
    },
    footer_item: {
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        height: 33,
    },
    footer_input: {
        height: 33,

    },
    footer_col_label: {
        width: 36,
        marginLeft: 16,
        marginRight: 16,
        // display: 'flex',
        // alignItems: 'center'
    }


});

export default styles;
