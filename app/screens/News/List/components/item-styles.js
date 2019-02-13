import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    item: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingVertical: 10,
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
        // marginTop: -15,
        // marginBottom: 0,
    },
    firstRow_item1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 22,
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
        borderRadius: 6
    }
});

export default styles;
