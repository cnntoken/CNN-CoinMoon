import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    item: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingVertical: 10,
        position: 'relative'
    },
    thumbnail: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    firstRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1
    },
    firstRow_item1: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    actionBtn: {
        width: 42,
        // borderWidth: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // paddingRight: 10
    },
    name: {
        marginRight: 10,
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold'
    },
    title: {
        marginTop: 4,
        color: '#333',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
        // paddingLeft: 20
    },

    itemRow: {
        marginTop: 10
    },
    interact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 6,
        backgroundColor: '#fafafa'
    },

    top: {
        width: 15,
        height: 13,
        position: 'absolute',
        top: 5,
        left: 5,
    },

    top_text: {
        position: 'absolute',
        top: 7,
        // marginTop: 5,
        // marginRight: 5,
        backgroundColor: '#FF4B4B',
        color: '#fff',
        fontSize: 9,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 14,
        textAlign: 'center',
        lineHeight: 14,
    },

    row_title: {
        position: 'relative',
        // borderWidth: 1,
    }

});

export default styles;
