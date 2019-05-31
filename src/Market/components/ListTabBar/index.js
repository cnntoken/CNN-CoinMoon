
import React, {PureComponent} from 'react';
import styles from './styles';
import {
    ScrollView,
    View,
    Animated,
    TouchableOpacity,
    Image
} from 'react-native';
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
        return (
            <View style={{height: 56,flexDirection:'row'}}>
                    <ScrollView
                        style={styles.wrap}
                        contentContainerStyle={{alignItems:'center'}}
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
                    <TouchableOpacity activeOpacity={1} style={styles.search_btn} onPress={this.props.goSeach}>
                        <Image source={require('@images/search_white.png')}/>
                    </TouchableOpacity>
            </View>
        );
    }
}

export default ListTabBar;
