import React, {Component} from 'react';
import styles from './styles';
import {
    Container,
    Header,
    Content,
    Input,
    Button,
    Left,
    Right,
    Body,
    Title,
    Item,
    Form,
    FooterTab,
    Footer, List, ListItem, Thumbnail, Label
} from "native-base";
import {Col, Row, Grid} from "react-native-easy-grid";
import {API} from 'aws-amplify';
import {Image, Text, View} from "react-native";
import Carousel from "react-native-snap-carousel";
import {sliderWidth} from "../Publish/styles";

class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPreview: false,
            activeSlide: 0,
        }
    }

    // 放弃写爆料，返回爆料列表页面
    goListScreen = () => {
        this.props.navigation.navigate('DiscloseList');
    };

    previewImage = (index) => {
        console.log(index);
        this.setState({
            isPreview: true,
            activeSlide: index
        });
    };

    renderImagePreview({item}) {
        // console.log('****', item);
        return (
            <View style={styles.carousel_slide}>
                <Image
                    source={{uri: item.uri}}
                    style={styles.carousel_image}
                />
            </View>
        );
    };

    // 从预览页面中返回发布页面
    goBack = () => {
        this.setState({
            isPreview: false
        });
    };

    // 评论
    comment = (item) => {
        console.log('评论', item);
    };
    // 不点赞
    dislike = (item) => {
        console.log('不点赞', item);
    };

    // 点赞
    like = (item) => {
        console.log('点赞', item);
    };

    // 给评论点赞
    likeComment = (item) => {
        console.log('给评论点赞', item);
    };
    // 回复评论
    reply = (item) => {
        console.log('回复评论', item);
    };

    // 删除评论
    deleteComment = (item) => {
        console.log('删除评论', item);
    };

    // loadmore 加载更多评论
    loadmore = (item) => {
        console.log('加载更多评论', item);
    };

    componentDidMount() {

    }

    render() {
        let {list, comments} = this.props;
        let {isPreview} = this.state;
        let data = list[0] || {};

        // 预览九宫格图片
        if (isPreview && list && list.length === 1) {

            return <Container style={styles.carousel_container}>

                <Header style={styles.carousel_header}>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Image style={styles.carousel_back_icon}
                                   source={require('../../../images/icon_back_white.png')}/>
                        </Button>
                    </Left>
                </Header>

                <Content style={styles.carousel_content}>
                    <Carousel
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={list[0].images.slice(0, 9)}
                        renderItem={this.renderImagePreview}
                        sliderWidth={sliderWidth}
                        // slideStyle={{width: sliderWidth}}
                        // containerCustomStyle={{flex: 1}}
                        itemWidth={sliderWidth}
                        firstItem={this.state.activeSlide}
                        onBeforeSnapToItem={(index) => {
                            console.log('onBeforeSnapToItem', index);
                            // this.setState({activeSlide: index})
                        }}
                        onSnapToItem={(index) => {
                            console.log('onSnapToItem', index);
                            this.setState({activeSlide: index})
                        }}
                    />
                </Content>
            </Container>;
        }

        // 展示详情
        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent onPress={this.goListScreen}>
                            <Image style={styles.carousel_back_icon}
                                   source={require('../../../images/icon_back_white.png')}/>
                        </Button>
                    </Left>

                    <Body>
                    <Title style={styles.title}></Title>
                    </Body>

                    <Right>
                        <Button transparent light onPress={this.writeDisclose}>
                            <Image style={styles.writeDiscloseBtn}
                                   source={require('../../../images/icon_more_white.png')}/>
                        </Button>
                    </Right>
                </Header>

                <Content>

                    <List
                        dataArray={list}
                        renderRow={item =>
                            <ListItem style={styles.listitem} avatar>
                                {/* 左侧图标 */}
                                <Left>
                                    <Image source={item.source}/>
                                </Left>
                                {/* 用户名& 发布时间*/}
                                <Body style={styles.listitem_body}>

                                {/* item 标题 ， 用户 时间等 */}
                                <Grid style={styles.grid_con}>
                                    <Row>
                                        <Col style={styles.col_username}>
                                            <Text style={styles.col_username_text}>{item.userName}</Text>
                                        </Col>

                                        <Col style={styles.col_time}>
                                            <Text style={styles.col_time_text}>{item.time}</Text>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Text style={styles.col_title_text}>{item.title}</Text>
                                        </Col>
                                    </Row>

                                </Grid>

                                {/* 九宫格图片 */}
                                <Grid style={styles.grid_images_btns}>
                                    <Row>
                                        {
                                            item.images.slice(0, 3).map((i, idx) => {
                                                return <Col style={styles.col_img}>
                                                    <Button onPress={this.previewImage.bind(this, idx)}>
                                                        <Image style={styles.image} key={idx}
                                                               source={{uri: i.uri}}/>
                                                    </Button>
                                                </Col>
                                            })
                                        }
                                    </Row>

                                    <Row>
                                        {
                                            item.images.length > 3 ?
                                                item.images.slice(3, 6).map((i, idx) => {
                                                    return <Col style={styles.col_img}>
                                                        <Button onPress={this.previewImage.bind(this, idx + 3)}>
                                                            <Image style={styles.image} key={idx}
                                                                   source={{uri: i.uri}}/>
                                                        </Button>

                                                    </Col>
                                                }) : null
                                        }
                                    </Row>

                                    <Row>
                                        {
                                            item.images.length > 6 ?
                                                item.images.slice(6, 9).map((i, idx) => {
                                                    return <Col style={styles.col_img}>
                                                        <Button onPress={this.previewImage.bind(this, idx + 6)}>
                                                            <Image style={styles.image} key={idx}
                                                                   source={{uri: i.uri}}/>
                                                        </Button>
                                                    </Col>
                                                }) : null
                                        }
                                    </Row>

                                </Grid>
                                </Body>
                            </ListItem>}
                    />

                    {/* 查看次数 */}
                    <Grid style={styles.viewNum}>
                        <Col style={styles.viewNum_image}>
                            <Image source={require('../../../images/icon_view.png')}/>
                        </Col>
                        <Col>
                            <Text style={styles.viewNum_text}>{data.num1}</Text>
                        </Col>
                    </Grid>

                    <View style={styles.divider}/>

                    {/* 点赞、评论按钮等*/}
                    <Grid style={styles.btns}>
                        <Col>
                            <Button transparent light onPress={this.comment.bind(this, data)}>
                                <View style={styles.btns_btn}>
                                    <Image source={require('../../../images/icon_comment_big.png')}/>
                                    <Text style={styles.btns_text}>{data.num2}</Text>
                                </View>
                            </Button>
                        </Col>
                        <Col>
                            <Button transparent light onPress={this.like.bind(this, data)}>
                                <View style={styles.btns_btn}>
                                    <Image source={require('../../../images/icon_like_big.png')}/>
                                    <Text style={styles.btns_text}>{data.num3}</Text>
                                </View>

                            </Button>
                        </Col>
                        <Col>
                            <Button transparent light onPress={this.dislike.bind(this, data)}>
                                <View style={styles.btns_btn}>
                                    <Image source={require('../../../images/icon_like_big.png')}/>
                                    <Text style={styles.btns_text}>{data.num3}</Text>
                                </View>
                            </Button>
                        </Col>
                    </Grid>

                    <View style={styles.divider}/>

                    {/**************评论 start**************/}

                    <View style={styles.comments_header}>
                        <Text style={styles.comments_header_text}>所有评论({data.commentsNum})</Text>
                    </View>

                    <List
                        dataArray={comments}
                        renderRow={item =>
                            <ListItem style={styles.listitem} avatar>
                                {/* 左侧图标 */}
                                <Left>
                                    <Image source={item.avatar}/>
                                </Left>
                                <Body style={styles.comments_listitem_body}>
                                {/* 评论人，评论时间、评论内容*/}
                                <View style={styles.comments_container}>
                                    <View style={styles.comments}>
                                        <Text style={styles.comments_username}>{item.username}</Text>
                                        <Text style={styles.comments_content}>{item.content}</Text>
                                        <Text style={styles.comments_time}>{item.time}</Text>

                                        {
                                            item.at ? <View style={styles.comments_at}>
                                                <Text
                                                    style={styles.comments_at_content}>@{item.at}: {item.atContent}</Text>
                                                <Text style={styles.comments_at_time}>{item.atTime}</Text>
                                            </View> : null
                                        }
                                    </View>
                                </View>


                                {/* 回复，赞评论等 */}
                                <Grid>
                                    <Col style={{width: 90}}>
                                        <Button transparent light onPress={this.reply.bind(this, item)}>
                                            <Grid style={styles.comments_btn_comment}>
                                                <Col style={{width: 14}}>
                                                    <Image source={require('../../../images/icon_comment_small.png')}/>
                                                </Col>
                                                <Col>
                                                    <Text style={styles.comments_btn_text}>回复评论</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col>
                                    <Col style={{width: 90}}>
                                        <Button transparent light onPress={this.likeComment.bind(this, item)}>
                                            <Grid style={styles.comments_btn_comment}>
                                                <Col style={{width: 14}}>
                                                    <Image source={require('../../../images/icon_like_small.png')}/>
                                                </Col>
                                                <Col>
                                                    <Text style={styles.comments_btn_text}>赞评论</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col>
                                    <Col style={{width: 70}}>
                                        <Button transparent light onPress={this.deleteComment.bind(this, item)}>
                                            <Grid style={styles.comments_btn_comment}>
                                                <Col>
                                                    <Text style={styles.comments_btn_text}>删除评论</Text>
                                                </Col>
                                            </Grid>
                                        </Button>
                                    </Col>
                                </Grid>
                                </Body>
                            </ListItem>}/>

                    {/*<View style={styles.loadmore}>*/}
                    {/*<Button style={styles.loadmore_btn} transparent light onPress={this.loadmore.bind(this, data)}>*/}
                    {/*<Text style={styles.loadmore_btn_text}>加载更多评论</Text>*/}
                    {/*</Button>*/}
                    {/*</View>*/}

                    <View style={styles.loadmore_btn}>
                        <Button transparent light onPress={this.loadmore.bind(this, data)}>
                            <Text style={styles.loadmore_btn_text}>加载更多评论</Text>
                        </Button>
                    </View>
                    {/**************评论 end**************/}


                </Content>

                {/* 底部评论区域 */}
                <Footer style={styles.footer}>
                    <Grid style={styles.footer_grid}>
                        <Col>
                            <Form style={styles.footer_form}>
                                <Item rounded style={styles.footer_item}>
                                    <Input style={styles.footer_input} placeholder=''/>
                                </Item>
                            </Form>
                        </Col>
                        <Col style={styles.footer_col_label}>
                            <Text style={styles.footer_label}>评论</Text>
                        </Col>
                    </Grid>
                </Footer>

            </Container>
        );
    }
}

export default Page;
