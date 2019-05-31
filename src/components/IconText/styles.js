import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    horizontalText: {
        color: '#666',
        fontSize: 12,
        paddingLeft: 3,
        marginLeft: 0,
    },
    verticalText: {
        color: '#333',
        fontSize: 12,
        marginTop: 4
    },
    horizontalBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    verticalBox: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
