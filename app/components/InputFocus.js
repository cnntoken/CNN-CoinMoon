import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Item, Input } from 'native-base';
import PropTypes from 'prop-types'


const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: .5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 16,
        borderColor: '#ccc',
        backgroundColor: '#F5F5F5'
    },
    inputFocus:{
        borderWidth: 1,
        borderColor: '#408EF5',
        backgroundColor: '#fff'
    }
});

class FocusInput extends Component {
    static propTypes = {
        value: PropTypes.any,
        onChangeText: PropTypes.func.isRequired
    }
    state = {
        isFocus: false
    }
    onFocus = ()=>{
        this.setState({
            isFocus: true
        })
    }
    onBlur = ()=>{
        this.setState({
            isFocus: false
        })
    }
    render() {
        const {isFocus} = this.state;
        const {onChangeText,style,...rest} = this.props;
        return (
            <Item regular style={[styles.input,isFocus && styles.inputFocus,style]}>
                <Input
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChangeText={onChangeText}
                    placeholderTextColor='#999'  
                    clearButtonMode='while-editing' 
                    {...rest}
                />
            </Item>
        );
    }
}

export default FocusInput;
