import React, {Component} from 'react';
import styles from './styles';
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

import {API} from 'aws-amplify';

class View extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Header>
                    <Button transparent light><Text>频道1</Text></Button>
                    <Button transparent light><Text>频道2</Text></Button>
                    <Button transparent light><Text>频道3</Text></Button>
                    <Button transparent light><Text>频道4</Text></Button>
                </Header>
                <Content>
                    <Text>news list</Text>
                </Content>
            </Container>
        );
    }
}

export default View;
