import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { 
    Keyboard, 
    Animated,
    // KeyboardAvoidingView, 
    Platform, 
    ScrollView 
} from 'react-native';

export default class KeyBoard extends PureComponent {
    static propTypes = {
        calcScroll2: PropTypes.func,
    };
    _isIOS = Platform.OS === 'ios'
    // render() {
    //     const {children,behavior,...rest} = this.props
    //     Object.assign(rest,{keyboardVerticalOffset:30,style:{flex:1}})
    //     if(this._isIOS){
    //         Object.assign(rest,{keyboardVerticalOffset:0,behavior: behavior||'padding'})
    //     }
    //     return <ScrollView 
    //         style={{flex: 1}}
    //     >
    //         <KeyboardAvoidingView {...rest}>
    //             {children}
    //         </KeyboardAvoidingView>
    //     </ScrollView>;
    // }

    _keyboardHeight = new Animated.Value(0)
    
    componentDidMount(){
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this._keyboardWillShow)
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',this._keyboardDidShow)
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this._keyboardWillHide)
    }
    componentWillUnmount(){
        this.keyboardWillShowListener.remove()
        this.keyboardDidShowListener.remove()
        this.keyboardWillHideListener.remove()

    }
    _keyboardWillShow = (evt)=>{
        console.log('evt: ',evt)
        Animated.timing(this._keyboardHeight, {
            duration: evt.duration,
            toValue: evt.endCoordinates.height,
        }).start()
    }
    _keyboardDidShow = ()=>{
        const { calcScroll2 } =this.props
        if(calcScroll2){
            const scrollHeight = calcScroll2()
            console.log('scrollHeight: ',scrollHeight)
            if(scrollHeight === 'bottom'){
                this.scrollEle.scrollToEnd({
                    animated: true
                })
            }else if(scrollHeight === 'top'){
                this.scrollEle.scrollTo({
                    x:0,
                    y: 0,
                    animated: true,
                })
            }else{
                this.scrollEle.scrollTo({
                    x:0,
                    y: scrollHeight - 0 + (this._isIOS?20:0),
                    animated: true,
                })
            }
            
            
        }
    }
    _keyboardWillHide = (evt)=>{
        Animated.timing(this._keyboardHeight, {
            duration: evt.duration,
            toValue: 0,
        }).start()
    }

    render(){
        return (
            <ScrollView ref={node=>this.scrollEle=node} style={{flex: 1}}>
                {this.props.children}
                <Animated.View 
                    style={{
                        flex:0,
                        width:'100%',
                        height:0,
                        paddingBottom: this._keyboardHeight,
                        // backgroundColor: '#ccc'
                    }} 
                />
            </ScrollView>
        )
    }
}
