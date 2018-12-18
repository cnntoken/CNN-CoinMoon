import React, {Component} from 'react';
// import {Text} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    List,
    ListItem,
    Text,
    Thumbnail,
    Left,
    Right,
    Body
} from "native-base";

import styles from "./styles";


class View extends Component {

    constructor(props) {
        super(props);
    }

    getlist = () => {
        this.props.getList(1, 3);
    };

    componentWillMount(): void {
        this.getlist();
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            {/*<Icon name="arrow-back"/>*/}
                            <Text>返回</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Title>List Avatar</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    <List
                        dataArray={this.props.datas}
                        renderRow={data =>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail small source={data.img}/>
                                </Left>
                                <Body>
                                <Text>
                                    {data.text}
                                </Text>
                                <Text numberOfLines={1} note>
                                    {data.note}
                                </Text>
                                </Body>
                                <Right>
                                    <Text note>
                                        {data.time}
                                    </Text>
                                </Right>
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }
}

export default View;
