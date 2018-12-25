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
    getItem = ()=>{
        const _id = '12676dc0-077f-11e9-974c-997f54c60621'
        console.log(`/feed/object/${_id}`)
        API.get('stark',`/feed/object/${_id}`).then(response => {
            // Add your code here
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }
    getlist = ()=>{
        API.get('stark','/feed/news').then(response => {
            // Add your code here
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }
    create = async ()=>{
        API.post('stark','/feed',{
            body:{
                category: 'news',
                title: 'ofo小黄车排队',
                content: '哎, 谁没拍过队伍吗',
                type: 'text'
            }
        }).then(response => {
            // Add your code here
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
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
                    <Button onPress={this.getItem}>
                        <Text>get feed Item</Text>
                    </Button>
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
