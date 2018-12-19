import React, {Component} from 'react';
import {Container, Header, Content, Button, Text, Footer, FooterTab} from 'native-base';
import { Authenticator, SignUp, SignIn, ConfirmSignUp } from 'aws-amplify-react-native';
import styles from './styles';


import PropTypes from 'prop-types';

class View extends Component {

    navigate = () => {
        this.props.onLogin('username', 'password');
    };
    handleAuthStateChange = (state)=>{
        console.log(state)
        if(state === 'signedIn'){
            this.props.navigation.pop()
        }
    }
    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Authenticator hideDefault={true} onStateChange={this.handleAuthStateChange}>
                        <SignIn/>
                        <SignUp/>
                        <ConfirmSignUp/>
                    </Authenticator>
                </Content>
            </Container>

        );
    }
}

View.propTypes = {
    onLogin: PropTypes.func
};

export default View;
