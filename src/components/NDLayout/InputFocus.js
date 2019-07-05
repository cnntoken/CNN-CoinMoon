import React, {Component} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';


export default class FocusInput extends Component {
    static propTypes = {
        ...TextInput.propTypes,
        value: PropTypes.any,
        onChangeText: PropTypes.func,
        handleFocus: PropTypes.func,
    }

    state = {
        isFocus: false,
    }
    inputRef = null;
    
    onFocus = (e) => {
        const {handleFocus} = this.props
        typeof handleFocus === 'function' &&  handleFocus(e)
        this.setState({
            isFocus: true
        })
    }
    onBlur = () => {
        this.setState({
            isFocus: false
        })
    }
    componentDidMount(){
        if(this.inputRef&&this.inputRef.isFocused()){
            this.setState({
                isFocus: true
            })
        }
    }
    render() {
        const {isFocus} = this.state;
        const {style, onChangeText, ...rest} = this.props;
        return (
            <TextInput
                    ref={ele=>this.inputRef = ele}
                    style={[styles.input, style, isFocus && styles.inputFocus]}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChangeText={onChangeText}
                    placeholderTextColor='#999'
                    {...rest}
                />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 16,
        borderColor: '#ccc',
        backgroundColor: '#F5F5F5'
    },
    inputFocus: {
        borderWidth: 2,
        borderColor: '#408EF5',
        backgroundColor: '#fff'
    }
});