import React, {PureComponent} from 'react';
import styles from './styles';
import {
    Header
} from "native-base";
import {ScrollView,View,Animated,TouchableOpacity} from 'react-native';
// const WINDOW_WIDTH = Dimensions.get('window').width;


class TabBar extends PureComponent{
    constructor(props){
        super(props)
        const scale = props.isActive ? 24/16 : 1;
        this.state = {
            scale: new Animated.Value(scale)
        }
    }
    onPress = ()=>{
        const {page} = this.props;
        this.props.onPress(page);
    }
    scaleText = ()=>{
        const scale = this.props.isActive ? 24/16 : 1;
        Animated.timing(
            this.state.scale,
            {
              toValue: scale,
              duration: 200,
              useNativeDriver: true
            }
        ).start();
    }
    // componentDidMount = ()=>{
    //     console.log("componentDidMount tabbar", this.props)
    // }
    componentDidUpdate = (prevProps)=>{
        if(prevProps.isActive !== this.props.isActive){
            this.scaleText()
        }
    }
    render(){
       const styleArr = [styles.text,{transform: [
        { scale: this.state.scale },
        { perspective: 1000 }
      ]}]
       if(this.props.isActive){
            styleArr.push(styles.active)
       }
        return <TouchableOpacity onPress={this.onPress}>
        <View style={styles.item}>
          <Animated.Text style={styleArr}>
            {this.props.name}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    }
}

class ListTabBar extends PureComponent {
    renderTab = (name, page, isActive)=>{
        return <TabBar key={`${name}_${page}`} name={name} page={page} isActive={isActive} onPress={this.props.goToPage}/>
    }
    render() {
        console.log(this.props)
        return (
            <Header style={{paddingLeft: 0, paddingRight:0, alignItems:'center'}} iosBarStyle='light-content'>
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

export default ListTabBar;
