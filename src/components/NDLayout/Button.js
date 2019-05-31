import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    // View,
    // ViewPropTypes,
} from 'react-native';
// const {height: viewHeight,width: viewWidth} = Dimensions.get('window')

const systemButtonOpacity = 0.4;

export default class Button extends PureComponent {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    accessibilityLabel: PropTypes.string,
    allowFontScaling: Text.propTypes.allowFontScaling,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
    transparent: PropTypes.bool,
  };

  render() {
    const touchableProps = {
      activeOpacity: this._computeActiveOpacity(),
    };
    const style = [
      styles.buttonBox,
      this.props.style,
    ];
    if(this.props.disabled){
      style.push({...styles.disabled,...this.props.styleDisabled})
    }
    if(this.props.transparent){
      style.push(styles.transparent)
    }

    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress;
      touchableProps.onPressIn = this.props.onPressIn;
      touchableProps.onPressOut = this.props.onPressOut;
      touchableProps.onLongPress = this.props.onLongPress;
      touchableProps.delayPressIn = this.props.delayPressIn;
      touchableProps.delayPressOut = this.props.delayPressOut;
      touchableProps.delayLongPress = this.props.delayLongPress;
    }
    // console.log('===Button rerender===')
    // console.log('disabled: ',this.props.disabled)
    // console.log('touchableProps: ',touchableProps)
    // console.log('style: ',style)
    return (
      <TouchableOpacity
        {...touchableProps}
        testID={this.props.testID}
        style={style}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityRole="button">
        {this.props.children}
      </TouchableOpacity>
    );
  }

  _computeActiveOpacity() {
    if (this.props.disabled) {
      return 0.6;
    }
    // eslint-disable-next-line eqeqeq
    return this.props.activeOpacity != null ?
      this.props.activeOpacity :
      systemButtonOpacity;
  }
}

const styles = StyleSheet.create({
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 16,
    flex: 1,
  },
  transparent: {
      backgroundColor: 'rgba(255,255,255,0)'
  },
  disabled: {
      opacity: 0.6,
  },
});