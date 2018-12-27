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
                <Header/>
                <Content>
                    <Text>Disclose Publish</Text>
                </Content>
                <Footer/>
            </Container>
        );
    }
}

export default View;
