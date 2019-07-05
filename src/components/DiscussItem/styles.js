import {StyleSheet} from 'react-native';
import { calculateStyleVariable } from '@utils/index'
const PX = calculateStyleVariable()

const styles = StyleSheet.create({
    sub_comment: {
        paddingTop: 10,
        paddingBottom: 10*PX,
        paddingLeft: 10*PX,
        paddingRight: 10*PX,
        backgroundColor: '#F5F5F5',
    },
    sub_box: {
        // marginTop: 10*PX,
    },
    sub_user_name: {
        fontSize: 13*PX,
        color: '#333',
    },
    sub_content: {
        marginLeft: 5*PX,
        fontSize: 14*PX,
        color: '#333',
    },
    discuss_item: {
        paddingTop: 20*PX,
        paddingRight: 20*PX,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1*PX,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar_box: {
        flex: 1
    },
    avatar: {
        height: 40*PX,
        width: 40*PX,
        borderRadius: 20*PX,
        // backgroundColor: 'red'
    },
    content_box: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    user_name: {
        color: '#408EF5',
        fontSize: 14*PX,
    },
    created_at: {
        color: 'rgba(170,170,170,1)',
        fontSize: 13*PX,
    },
    dis_content: {
        marginTop: 7*PX,
        color: "#333",
        fontSize: 14*PX,
        // backgroundColor: 'red'
    },
    action: {
        width: 300*PX,
        flexDirection: 'row',
    },
    action_button: {
        width: 100*PX,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        marginTop: 10*PX,
        height: 30*PX
    },
    action_button_center:{
        justifyContent: 'center'
    },
    action_button_last:{
        marginLeft: 10*PX
    },
    action_text: {
        alignItems: 'center',
        fontSize: 12*PX,
        color: '#666'
    },
    action_icon: {
        marginRight: 3*PX,
        height: 12*PX,
        width: 12*PX,
    },
    view_all: {
        alignItems:'flex-start',
        marginTop: 10*PX,
        marginBottom: 10*PX,
    },
    view_all_btn:{
        backgroundColor: '#fff'
    },
    view_all_text: {
        color: '#408EF5',
        fontSize: 13*PX
    },
});

export default styles;
