import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const img_width = (width - 90) / 3;

const styles = StyleSheet.create({


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

    avatar: {
        width: 30,
        height: 30,
    },

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
        marginLeft: 0,
        lineHeight: 17
    },

    title: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 20,
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

});

export default styles;
