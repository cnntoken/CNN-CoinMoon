import {StyleSheet,Dimensions} from 'react-native';
const {height: viewportHeight,} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrap1:{
        // height: viewportHeight - 10,
        flex:1
    },
    wrap:{
        flex: 1
        // height: viewportHeight - 10
    }
});

export default styles;
