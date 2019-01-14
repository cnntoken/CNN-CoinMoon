import React, {Component} from 'react';
// import styles from './styles';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    Title,
    FooterTab,
    Footer
} from "native-base";
import {Image} from 'react-native';
import styles from './styles'

class View extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    render() {
        return (
            <Container>
                <Left>
                    <Button transparent onPress={this.goBack}>
                        <Image source={require('../../../images/icon_back_white.png')}/>
                    </Button>
                </Left>
                <Content>
                    <Text>news detail</Text>
                </Content>
                <Footer/>
            </Container>
        );
    }
    goBack = ()=>{
        this.props.navigation.pop()
    }
}

export default View;
