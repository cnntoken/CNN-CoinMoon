import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  // TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

export default class Switch extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.bool,
  };

  static defaultProps = {
    value: false,
    onChange: () => null,
    disabled: false,
  };
  constructor(props){
    super(props)
    this.state = {
      transformSwitch: new Animated.Value(props.value?70-20:0),
      backgroundColor: new Animated.Value(props.value?75:-75)
    }
  }
  animateSwitch = ()=>{
    const {value} = this.props
    const {transformSwitch,backgroundColor} = this.state
    Animated.parallel([
      Animated.timing(
        transformSwitch,
        {
          toValue: value?0:70-20
        }
      ),
      Animated.timing(
        backgroundColor,
        {
          toValue: value?-75:75
        }
      )
    ]).start()
  }
  handleSwitch = ()=>{
    const {value,onChange} = this.props
    onChange(!value)
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.animateSwitch()
    }
  }
  render() {
    const {transformSwitch,backgroundColor} = this.state
    const interpolatedColorAnimation = backgroundColor.interpolate({
      inputRange: [-75, 75],
      outputRange: ['#f5f5f5', '#408EF5']
    });
    // console.log('transformSwitch: ',transformSwitch)
    // console.log('backgroundColor: ',backgroundColor)
    return (
      <TouchableOpacity style={{paddingTop: 10,paddingBottom: 10}} onPress={this.handleSwitch}>
        <Animated.View style={[styles.container,{backgroundColor: interpolatedColorAnimation}]}>
          <Animated.View
            style={[
              styles.animatedContainer,
              {left: transformSwitch,}
            ]}
          >
            
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 20,
    borderRadius: 10,
    // backgroundColor: '#408EF5',
    position: 'relative',
  },
  animatedContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFAD33',
    position: 'absolute',
    top: 0,
  },

});