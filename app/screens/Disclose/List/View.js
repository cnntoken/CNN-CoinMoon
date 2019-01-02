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
import {View, TouchableHighlight, Image} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";

import {API} from 'aws-amplify';


class Screen extends Component {

    constructor(props) {
        super(props);
    }

    // 写爆料
    writeDisclose = () => {
        console.log('写爆料');
        this.props.navigation.navigate('DisclosePublish');
    };

    pressItem = () => {
        this.props.navigation.navigate('DiscloseDetail');
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
                        <Button transparent light onPress={this.writeDisclose}>
                            <Image style={styles.writeDiscloseBtn}
                                   source={require('../../../images/btn_post.png')}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List
                        dataArray={list}
                        renderRow={item =>
                            <ListItem avatar>
                                {/* 左侧图标 */}
                                <Left>
                                    <Thumbnail small source={item.source}/>
                                </Left>
                                {/* 用户名& 发布时间*/}
                                <Body>
                                <TouchableHighlight onPress={this.pressItem}>

                                    <Grid>
                                        <Row>

                                            <Col>
                                                <Text>{item.userName}</Text>
                                            </Col>
                                            <Col>
                                                <Text>{item.time}</Text>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col>
                                                <Text>{item.title}</Text>
                                            </Col>

                                        </Row>

                                        <Row>
                                            {
                                                item.images.map((i, idx) => {
                                                    return <Col style={styles.col_img}>
                                                        <Image style={styles.image} key={idx} source={{uri: i.uri}}/>
                                                    </Col>
                                                })
                                            }
                                        </Row>

                                    </Grid>
                                </TouchableHighlight>


                                {/* 点赞评论*/}
                                <Grid>
                                    <Col>
                                        <Button transparent light onPress={this.view}>
                                            <Image source={require('../../../images/icon_view.png')}/>
                                            <Text>{item.num1}</Text>
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button transparent light onPress={this.view}>
                                            <Image source={require('../../../images/icon_comment_small.png')}/>
                                            <Text>{item.num2}</Text>
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button transparent light onPress={this.view}>
                                            <Image source={require('../../../images/icon_like_small.png')}/>
                                            <Text>{item.num3}</Text>
                                        </Button>

                                    </Col>

                                    {/*<Button transparent light onPress={this.view}>*/}
                                    {/*<Image source={require('../../../images/icon_view.png')}/>*/}
                                    {/*</Button>*/}
                                </Grid>

                                </Body>
                            </ListItem>}
                    />

                </Content>

            </Container>
        );
    }
}

export default Screen;
