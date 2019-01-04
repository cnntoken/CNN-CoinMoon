import React, {Component} from 'react';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    Title
} from "native-base";
import NotLogin from './NotLogin'
import Main from './Main'
import styles from './styles';


class View extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Mine</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>test</Text>
                </Content>
            </Container>
        );
    }
}

export default View;
