import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F5F5F5'
    },
    wrap: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    item: {
        paddingLeft: 24,
        paddingRight: 24,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // shadowColor: 'rgba(245,245,245,1)',
        // shadowOffset: {width: 0, height: -0.5},
        // shadowOpacity: 1,
        // shadowRadius: 0,
        borderBottomColor: 'rgba(245,245,245,1)',
        borderBottomWidth: 1
    },
    item_feedback: {
        paddingLeft: 24,
        paddingRight: 24,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // flex: 1,
        // shadowColor: 'rgba(245,245,245,1)',
        // shadowOffset: {width: 0, height: -0.5},
        // shadowOpacity: 1,
        // shadowRadius: 0,
        borderBottomColor: 'rgba(245,245,245,1)',
        borderBottomWidth: 1
    },
    l_left: {
        color: '#666666'
    },
    l_right: {
        color: '#333333'
    },
});

export default styles;
