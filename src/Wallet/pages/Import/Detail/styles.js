import {
    StyleSheet,
    Platform,
    // PixelRatio,
} from 'react-native';

const styles = StyleSheet.create({
    bg_w: {
        backgroundColor: '#fff',
    },
    br_16: {
        borderRadius: 16,
    },
    form: {
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 20,
        // flex: 1,
    },
    form_item: {
        borderRadius: 8,
        marginBottom: 9,
    },
    form_textarea: {
        height: 100,
        ...Platform.select({
            // ios: {
            //     height: 100,
            // },
            android: {
                textAlignVertical: 'top'
            }
        })
    },
    label: {
        color: '#333',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 20,
    },
    line: {
        backgroundColor: '#f5f5f5',
        height: 10,
    },
    relative: {
        position: 'relative'
    },
    suffix: {
        color: '#408EF5',
        // height:20,
        // marginBottom: 15,
        // marginTop: 15,
        position: 'absolute',
        right: 15,
        top: -40,
    },
    btn_box: {
        backgroundColor: '#408EF5',
        marginTop: 30,
        height: 50,
    },
    btn_txt: {
        color: '#fff',
    },
    tab_underline: {
        backgroundColor: '#408EF5',
        height: 3,
    }
});

export default styles;
