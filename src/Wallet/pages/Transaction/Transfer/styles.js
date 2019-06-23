import {
    StyleSheet,
    // Dimensions,
    PixelRatio,
} from 'react-native';

// const {height: viewportHeight,} = Dimensions.get('window');

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        height: 56,
        width: 176,
        backgroundColor: '#408EF5',
    },
    color_w: {
        color: '#fff',
        fontSize: 18,
    },
    form_item: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        paddingLeft: 18,
        paddingRight: 18,
    },
    form_item_input: {
        color: '#333',
        fontSize: 16,
        flex: 1,
    },
    label: {
        color: '#999',
        fontSize: 14,
        marginRight: 10,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modal_btn: {
        backgroundColor: '#408EF5',
        borderRadius: 16,
    },
    modal_child: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'column',
    },
    modal_footer: {
        marginBottom: 24,
        marginTop: 21,
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
    },
    modal_label: {
        color: '#999',
        fontSize: 14,
        marginBottom: 5,
    },
    modal_list: {
        flexDirection: 'column',
        height: 78,
        justifyContent: 'center',
        paddingLeft: 18,
        paddingRight: 18,
    },
    modal_pwd_box: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: 18,
        paddingRight: 18,
    },
    modal_pwd: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        borderColor: '#ccc',
        borderRadius: 16,
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
        // flex: 1,
        width: '100%',
    },
    radio_box: {
        marginTop: 20,
        paddingLeft: 18,
        paddingRight: 18,
    },
    radio_item: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    radio_item_active: {
        backgroundColor: '#408EF5',
    },
    radio_name_active: {
        color: '#fff',
    },
    radio_name_main: {
        color: '#408EF5',
        fontSize: 14,
    },
    radio_name_sub: {
        color: '#408EF5',
        fontSize: 10,
    },
    line: {
        backgroundColor: '#F5F5F5',
        height: 10,
    },
});

export default styles;
