import React, {Component} from 'react';
// import {Text} from 'react-native';
// import styles from './styles';

import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Title,
    Icon
} from "native-base";

import {checkLogin} from '../../services/app'
class View extends Component {

    constructor(props) {
        super(props);
    }
    goMine = ()=>{
        if(checkLogin()){
            this.props.navigation.navigate('Mine')
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Text>返回</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Header</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content padder>
                    <Text>Home Content </Text>
                    <Button onPress={this.goMine}>
                        <Text>go to mine!</Text>
                    </Button>
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

export default View;
