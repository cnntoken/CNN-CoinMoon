import React,{PureComponent} from 'react'
import FastImage from 'react-native-fast-image'

export default class ImageContent extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            currentIndex: 0,
            cover: props.cover,
            images: props.images
        }
    }
    onError = ()=>{
        let {currentIndex,images,cover} = this.state;
        console.log('on error', cover)
        if(!images){
            return;
        }
        let newCover = images[currentIndex++];
        if(newCover === cover){
            newCover = images[currentIndex++];
        }
        if(newCover){
            this.setState({
                cover: newCover,
                currentIndex
            })
        }
    }
    onLoad = ()=>{
        this.setState({
            loaded: true
        })
    }
    render(){
        const {loaded} = this.state;
        let finalStyle;
        if(loaded){
            finalStyle = this.props.style;
        }else{
            finalStyle = [this.props.style,{backgroundColor:'#fafafa'}]
        }
        return <FastImage source={{uri: this.state.cover}} style={finalStyle} onError={this.onError} onLoad={this.onLoad}/>
    }
}