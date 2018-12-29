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
    Footer,
    List,
    ListItem, Icon, Switch, Thumbnail
} from "native-base";

import {API} from 'aws-amplify';


class View extends Component {

    constructor(props) {
        super(props);
    }

    toggleTab1 = () => {
        this.props.navigation.navigate('DiscloseDetail');
    };

    toggleTab2 = () => {
        this.props.navigation.navigate('DisclosePublish');
    };


    componentDidMount() {

    }

    render() {

        let {list} = this.props;

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
                    {/*<Button onPress={this.toggleTab1.bind(this)}><Text>Detail</Text></Button>*/}
                    <Button onPress={this.toggleTab2.bind(this)}><Text>Publish</Text></Button>


                    <List
                        dataArray={list}
                        renderRow={item =>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail small source={item.source}/>
                                </Left>
                                <Body>
                                <Text>
                                    <Text>{item.userName}</Text>{item.time}
                                </Text>
                                <Text>
                                    {item.title}
                                </Text>
                                <Content>
                                    {
                                        item.images.map((i, idx) => {
                                            return <Thumbnail key={idx} large source={{uri: i}}/>
                                        })
                                    }
                                </Content>
                                </Body>

                                {/*<Right>*/}
                                {/*<Text note>*/}
                                {/*{item.time.toString()}*/}
                                {/*</Text>*/}
                                {/*</Right>*/}
                            </ListItem>}
                    />

                </Content>

                <Footer/>

            </Container>
        );
    }
}

export default View;
