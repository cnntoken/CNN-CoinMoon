import {
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#408EF5',
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 42,
        paddingLeft: 15,
        paddingRight: 15,
    },
    left: {
        backgroundColor: '#fff',
        borderRadius: 17,
        height: 32,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 13,
        paddingRight: 13,
        flex: 1,
        marginRight: 17,
    },
    input: {
        padding: 0,
        marginLeft: 14,
    },
    cancel: {
        color: '#fff',
        lineHeight: 23,
        fontSize: 16,
    },
    no_result:{
        marginTop: 20,
        alignItems: 'center'
    }
})

export default styles