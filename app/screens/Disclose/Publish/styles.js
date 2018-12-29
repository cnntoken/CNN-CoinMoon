import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
    items: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
        // flex: 1
    },
    item: {
        marginLeft: 30,
        marginTop: 30,
        width: 90,
        height: 90,
        position: 'relative',
    },
    itemImg: {
        width: 90,
        height: 90,
        borderRadius: 8,
        position: 'absolute',
        zIndex: 1,

    },
    delBtn: {
        position: 'absolute',
        top: -10,
        right: 0,
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
        color: '#fff'
    }

});

export default styles;
