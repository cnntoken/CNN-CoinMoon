import React, {Component} from 'react';
import {Container, Header, Content, Button, Text, Footer, FooterTab} from 'native-base';

import styles from './styles';


import PropTypes from 'prop-types';

class View extends Component {

    navigate = () => {
        this.props.onLogin('username', 'password');
    };

    render() {
        return (

            <Container>

                <Header/>

                <Content>

                    {/*<Button light style={styles.btn}><Text> Login </Text></Button>*/}

                    <Button light style={styles.btn} onPress={()=>{this.props.navigation.navigate('List')}}><Text> List </Text></Button>

                    <Button primary onPress={this.navigate}><Text> Go to Home </Text></Button>

                </Content>

                <Footer>

                    <FooterTab>
                        <Button active full>
                            <Text>资讯</Text>
                        </Button>
                    </FooterTab>

                    <FooterTab>
                        <Button active full>
                            <Text>爆料</Text>
                        </Button>
                    </FooterTab>

                    <FooterTab>
                        <Button active full>
                            <Text>me</Text>
                        </Button>
                    </FooterTab>

                </Footer>

            </Container>

        );
    }
}

View.propTypes = {
    onLogin: PropTypes.func
};

export default View;
