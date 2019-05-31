import React,{PureComponent} from 'react'
import View from './View';
import {connect} from 'react-redux';


const mapState2Props = (state)=>{
    console.log('mapState2Props: ',state)
    return {...state}
}
@connect(mapState2Props)
class Container extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        
        return <View {...this.props} />
    }
}

export default Container;