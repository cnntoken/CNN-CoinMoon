import React, {Component} from 'react';
import styles from './styles';
import {
    Container,
    Header,
    Text,
    Button
} from "native-base";
import {ScrollView,View,Animated,TouchableOpacity, Dimensions} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;


class ViewControl extends Component {
    componentDidMount() {

    }
    renderTab = (name, page, isTabActive, onPressHandler)=>{
        const styleArr = [styles.text];
        if(isTabActive){
            styleArr.push(styles.active)
        }
    
        return <TouchableOpacity
          key={`${name}_${page}`}
          onPress={() => onPressHandler(page)}
        >
          <View style={styles.item}>
            <Text style={styleArr}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>;
    }
    render() {
        console.log(this.props)
        return (
            <Header style={{paddingLeft: 0, paddingRight:0}}>
                    <ScrollView
                        style={styles.wrap}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        directionalLockEnabled={true}
                        bounces={false}
                        scrollsToTop={false}
                    >
                       {this.props.tabs.map((name, page) => {
                            const isTabActive = this.props.activeTab === page;
                            return this.renderTab(name, page, isTabActive, this.props.goToPage);
                        })}
                    </ScrollView>
            </Header>
        );
    }
}

export default ViewControl;
