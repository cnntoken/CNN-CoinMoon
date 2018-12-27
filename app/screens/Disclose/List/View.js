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
        this.state = {
            tab1: false,
            tab2: true,
            tab3: false,
        };
    }

    toggleTab1 = () => {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
        });
        this.props.navigation.navigate('DiscloseList');
    };

    toggleTab2 = () => {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
        });
        this.props.navigation.navigate('DiscloseDetail');
    };

    toggleTab3 = () => {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
        });
        this.props.navigation.navigate('DisclosePublish');
    };

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title style={styles.title}>Disclose</Title>
                    </Body>
                    <Right>
                        <Button transparent light>
                            <Text>Write</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Button onPress={this.toggleTab1}><Text>Disclose 1</Text></Button>
                    <Button onPress={this.toggleTab2.bind(this)}><Text>Disclose 2</Text></Button>
                    <Button onPress={this.toggleTab3}><Text>Disclose 3</Text></Button>
                </Content>
            </Container>
        );
    }
}

export default View;
