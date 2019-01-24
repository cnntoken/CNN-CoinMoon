import {StyleSheet, Dimensions, Platform} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};


export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    mb: {
        marginBottom: 15
    },
    // 表单信息
    form: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        paddingRight: 15,
    },

    divider: {
        height: 10,
        backgroundColor: '#F5F5F5'
    },
    textarea: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24
    },
    imagesLabel: {
        fontSize: 14,
        lineHeight: 20,
        color: '#999999',
        marginLeft: 16,
    },


    //  九宫格图片
    items: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // flex: 1
        marginTop: 15,

    },
    item: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        marginTop: 15,
        width: 75,
        height: 75,
        position: 'relative',
    },
    itemImg: {
        width: 75,
        height: 75,
        borderRadius: 8,
        position: 'absolute',
        zIndex: 1,
    },
    delBtn: {
        position: 'absolute',
        top: -30,
        right: 10,
        zIndex: 9,
    },
    delIcon: {
        width: 24,
        height: 24,
        // borderRadius: 30,
        position: 'absolute',
        zIndex: 19,
    },
    btnText: {
        color: '#333333',
        fontSize:16,
        lineHeight:23,
    },
    btn_pubish_text: {
        color: '#408EF5'
    },
    // 发布页面样式 header
    user_icon: {
        width: 24,
        height: 24,
        borderRadius: 12
    },
    publish_header: {
        backgroundColor: '#fff'
    },

    //  add /////////
    carousel_container: {
        backgroundColor: '#000',
    },
    carousel_header: {
        backgroundColor: '#000',
        borderBottomColor: '#000',
        borderBottomWidth: 3,
    },
    carousel_content: {
        backgroundColor:'#000'
    },
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
    carousel_back_icon: {
        width: 18,
        height: 18
    },
    carousel_del_icon: {
        width: 20,
        height: 20
    },
    ///////////// add end


    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        // height: 300
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },


});
