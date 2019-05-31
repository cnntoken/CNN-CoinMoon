import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    sub_comment: {
        // paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F5F5F5',
    },
    sub_box: {
        marginTop: 15,
        flexDirection: 'row'
    },
    left_box:{
        flex:1,
        flexDirection: 'column'
    },
    sub_user_name: {
        fontSize: 13,
        color: '#333',
    },
    sub_created_at: {
        fontSize: 10,
        color: '#AAA'
    },
    right_box: {
        marginLeft: 5,
        flex: 5
    },
    sub_content: {
        fontSize: 14,
        color: '#333',
    },
    discuss_item: {
        paddingTop: 20,
        paddingRight: 20,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar_box: {
        flex: 1
    },
    avatar: {
        height: 40,
        width: 40,
        // borderRadius: 20,
        // backgroundColor: 'red'
    },
    content_box: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    user_name: {
        color: '#408EF5',
        fontSize: 14,
    },
    created_at: {
        color: 'rgba(170,170,170,1)',
        fontSize: 13,
    },
    dis_content: {
        marginTop: 7,
        color: "#333",
        fontSize: 14
    },
    action: {
        width: 300,
        flexDirection: 'row',
        // marginBottom: 10,
    },
    action_button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        marginTop: 10,
        width: 50,
        height: 30
    },
    action_button_center:{
        justifyContent: 'center'
    },
    action_text: {
        alignItems: 'center',
        fontSize: 12,
        color: '#666'
    },
    action_icon: {
        marginRight: 3,
        height: 12,
        width: 12,
    },
    view_all: {
        alignItems:'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },
    view_all_btn:{
        backgroundColor: '#fff'
    },
    view_all_text: {
        color: '#408EF5',
        fontSize: 13
    }
});

export default styles;
