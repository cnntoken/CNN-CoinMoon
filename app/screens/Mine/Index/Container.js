import React, {Component} from 'react';
import NotLogin from './NotLogin';
import Main from './Main';
import { connect } from 'react-redux';

function mapStateToProps({userReducer:{info}}) {
    return {userInfo:info};
}



class Container extends Component {

    render() {
        const {userInfo} = this.props;
        if(userInfo.attributes && userInfo.attributes.sub){
            return <Main {...this.props}/>
        }else{
            return <NotLogin {...this.props}/>
        }
    }
}

export default connect(
    mapStateToProps
)(Container);
