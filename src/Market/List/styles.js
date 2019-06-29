import {StyleSheet,Dimensions,StatusBar,Platform} from 'react-native';

const isAndroid = Platform.OS === "android";
const {height: viewportHeight} = Dimensions.get('window');

// 
const styles = StyleSheet.create({
    wrap: isAndroid?{height: viewportHeight - 47 - StatusBar.currentHeight,flex:0}:{flex:1}
});

export default styles;
