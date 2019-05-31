import {Dimensions, StyleSheet} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    ListItem: {},
    aggreeBox: {
        marginHorizontal: 40,
        marginTop: 30,

    },
    aggree_btn: {

        backgroundColor: '#408EF5',
        borderRadius: 16,
        height: 56
    },
    aggree_btn_disabled: {
        backgroundColor: '#B3D4FF',
        borderRadius: 16,
        height: 56
    },

    aggree_txt: {
        color: '#fff',
        fontSize: 18
    },
    bottomBox: {
        marginTop: 20
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    detailText: {
        color: '#999',
        fontSize: 14
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#408EF5',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center'
    },
    licenseItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40
    },
    licenseItemLeft: {
        flexDirection: 'row',
        flex: 1
    },
    licenseText: {
        marginLeft: 10
    },
    modal_content: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 26,
        width: '100%'
    },

    modal_content_webview: {
        // paddingVertical: 26,
        backgroundColor: '#fff',
        borderRadius: 8,
        height: deviceHeight,
        width: deviceWidth,
    },
    topBox: {
        alignItems: 'center',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1
    }
});

export default styles;
