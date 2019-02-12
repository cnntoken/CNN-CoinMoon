import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const img_width = (width - 90) / 3;

const styles = StyleSheet.create({
    // 删除弹框
    modal: {
        // flex: 1,
        width: width,
        paddingLeft: 0,
        marginLeft: -20,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        backgroundColor: '#FFFFFF',
    },

    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        height: 55,
        // flexWrap: 'nowrap',
        marginBottom: 15,
        width: width
    },

    reason: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 9,
        paddingBottom: 9,
        height: 40,
        borderRadius: 20,
        marginLeft: 15,
        backgroundColor: '#CEE1FB',
    },

    reason_selected: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 9,
        paddingBottom: 9,
        height: 40,
        borderRadius: 20,
        marginLeft: 15,
        backgroundColor: '#408EF5',
    },

    footer_form: {}


});

export default styles;
