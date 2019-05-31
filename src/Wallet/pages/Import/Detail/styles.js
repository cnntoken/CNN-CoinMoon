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
    },
    form_item: {
        borderRadius: 8,
        marginBottom: 9,
        ...Platform.select({
            android: {
                textAlignVertical: 'top'
            }
        })
    },
    form_textarea: {
        ...Platform.select({
            ios: {
                height: 100,
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
        height:20,
        marginBottom: 15,
        marginTop: 15,
        position: 'absolute',
        right: 15,
    },
    btn_box: {
        backgroundColor: '#408EF5',
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
