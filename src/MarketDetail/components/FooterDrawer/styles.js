import {
    StyleSheet,
    Dimensions
} from 'react-native'

const {width: viewportWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    footer_drawer: {
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    btn_box:{
        flex:1,
        height: 118,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor:'rgba(0, 0, 0, 0.3)'
    },
    delete_btn: {
        flex:1,
        width: viewportWidth,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E6E6E6'
    },
    delete_text: {
        color: '#FF6821',
        fontSize: 15,
    },
    cancle_btn: {
        flex:1,
        // height: 59,
        width: viewportWidth,
        backgroundColor: '#fff',
    }
})
export default styles