import React, {Component} from 'react';
// import {Text} from 'react-native';
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
    Title
} from "native-base";
import {API} from 'aws-amplify';

class View extends Component {

    constructor(props) {
        super(props);
    }
    getlist = ()=>{

    }
    create = ()=>{
        API.post('starkd724777a','/feed')
    }
    update = ()=>{
        
    }
    remove = ()=>{
        
    }
    componentDidMount(){
        
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
                    <Title>Publish</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Button onPress={this.getlist}>
                        <Text>get feed list</Text>
                    </Button>
                    <Button onPress={this.create}>
                        <Text>create a feed</Text>
                    </Button>
                    <Button onPress={this.update}>
                        <Text>update a feed</Text>
                    </Button>
                    <Button onPress={this.remove}>
                        <Text>remove a feed</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default View;
