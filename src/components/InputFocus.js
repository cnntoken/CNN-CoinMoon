import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import PropTypes from 'prop-types';


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
    inputFocus: {
        borderWidth: 1,
        borderColor: '#408EF5',
        backgroundColor: '#fff'
    }
});

class FocusInput extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            isFocus: false,
        }
    }
    inputRef = null;

    static propTypes = {
        value: PropTypes.any,
        onChangeText: PropTypes.func.isRequired
    }
    
    onFocus = () => {
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

export default FocusInput;
