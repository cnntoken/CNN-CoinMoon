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
import styles from './styles';



class View extends Component {

    render() {
        return (
            <Header>
                <Body>
                    <Title>Mine</Title>
                </Body>
                <Right/>
            </Header>
        );
    }
}

export default View;
